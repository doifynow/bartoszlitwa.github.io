"""Exercise the repository Nginx configuration with built static files.

Run after npm run build: python3 tests/routing/nginx_routes.py
Requires nginx on PATH; only an isolated localhost listener is started.
"""

import pathlib
import shutil
import socket
import subprocess
import tempfile
import time
import unittest
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]


class StaticRoutingTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        nginx = shutil.which("nginx")
        if not nginx:
            raise RuntimeError("Install nginx before running the routing tests")
        if not (ROOT / "build/index.html").exists():
            raise RuntimeError("Run npm run build before running the routing tests")
        cls.temporary = tempfile.TemporaryDirectory(prefix="litwa-nginx-routing-")
        temporary = pathlib.Path(cls.temporary.name)
        with socket.socket() as listener:
            listener.bind(("127.0.0.1", 0))
            port = listener.getsockname()[1]
        cls.base = f"http://127.0.0.1:{port}"
        config = (ROOT / "nginx.conf").read_text()
        config = config.replace("listen 80;", f"listen 127.0.0.1:{port};")
        config = config.replace("/usr/share/nginx/html", str(ROOT / "build"))
        config = config.replace(
            "/etc/nginx/portfolio-security-headers.conf",
            str(ROOT / "nginx-security-headers.conf"),
        )
        configuration = temporary / "nginx.conf"
        configuration.write_text(
            f"pid {temporary}/nginx.pid;\nerror_log {temporary}/error.log;\n"
            f"events {{}}\nhttp {{ access_log off; {config} }}\n"
        )
        subprocess.run([nginx, "-t", "-c", str(configuration)], check=True)
        cls.process = subprocess.Popen(
            [nginx, "-c", str(configuration), "-g", "daemon off;"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        cls.addClassCleanup(cls.shutdown)
        for _ in range(50):
            try:
                cls.fetch("/")
                break
            except urllib.error.URLError:
                time.sleep(0.1)
        else:
            raise RuntimeError("The isolated Nginx listener did not start")

    @classmethod
    def shutdown(cls):
        cls.process.terminate()
        cls.process.wait(timeout=10)
        cls.temporary.cleanup()

    @classmethod
    def fetch(cls, path):
        try:
            response = urllib.request.urlopen(cls.base + path, timeout=5)
        except urllib.error.HTTPError as error:
            response = error
        with response:
            return response.status, response.headers, response.read()

    def test_homepage_and_hash_navigation_remain_available(self):
        for path in ("/", "/#ecosystem", "/#experience", "/index.html"):
            with self.subTest(path=path):
                status, headers, body = self.fetch(path)
                self.assertEqual(status, 200)
                self.assertIn(b'https://litwa.dev/', body)
                self.assertIn("no-store", headers["Cache-Control"])

    def test_discovery_documents_and_built_assets_remain_available(self):
        asset = next((ROOT / "build/assets").glob("*.js"))
        for path in ("/robots.txt", "/sitemap.xml", "/Bartosz_Litwa_CV.pdf", f"/assets/{asset.name}"):
            with self.subTest(path=path):
                status, _, body = self.fetch(path)
                self.assertEqual(status, 200)
                self.assertTrue(body)

    def test_missing_paths_do_not_return_the_portfolio(self):
        for path in (
            "/missing-audit-page", "/missing-audit-page/", "/missing-audit-page?test=1",
            "/removed-page.html", "/api", "/login", "/assets/missing.js",
        ):
            with self.subTest(path=path):
                status, headers, body = self.fetch(path)
                self.assertEqual(status, 404)
                self.assertNotIn(b'<div id="root">', body)
                self.assertEqual(headers["X-Content-Type-Options"], "nosniff")


if __name__ == "__main__":
    unittest.main(verbosity=2)
