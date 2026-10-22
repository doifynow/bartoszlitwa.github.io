import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { log } from 'node:console';
import { randomUUID } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const root = fileURLToPath(new URL('../', import.meta.url));
const dockerfile = readFileSync(new URL('../Dockerfile', import.meta.url), 'utf8');
const image = dockerfile.match(/^FROM (nginx:\S+) AS final$/m)?.[1];
assert.ok(image, 'Use the same pinned Nginx image as the production Dockerfile.');
const container = `portfolio-health-contract-${randomUUID()}`;
function docker(args) {
  return spawnSync('docker', args, { encoding: 'utf8', timeout: 60_000 });
}
function requireSuccess(result) {
  assert.equal(result.status, 0, result.stderr || result.error?.message);
  return result;
}
requireSuccess(
  docker([
    'create',
    '--name',
    container,
    '--network',
    'none',
    '--memory',
    '64m',
    '--cpus',
    '0.25',
    image
  ])
);
try {
  for (const [source, destination] of [
    ['nginx.conf', '/etc/nginx/conf.d/default.conf'],
    ['nginx-security-headers.conf', '/etc/nginx/portfolio-security-headers.conf'],
    ['build/index.html', '/usr/share/nginx/html/index.html']
  ]) {
    requireSuccess(docker(['cp', `${root}${source}`, `${container}:${destination}`]));
  }
  requireSuccess(docker(['start', container]));
  // docker cp preserves a runner's restrictive file mode; Nginx reads as its worker user.
  requireSuccess(docker(['exec', container, 'chmod', '0644', '/usr/share/nginx/html/index.html']));
  requireSuccess(docker(['exec', container, 'nginx', '-t']));
  // Docker start precedes Nginx's entrypoint setup; wait for its listener.
  const deadline = Date.now() + 20_000;
  let health;
  do {
    health = docker([
      'exec',
      container,
      'wget',
      '-T',
      '1',
      '-S',
      '-O',
      '-',
      'http://127.0.0.1/health'
    ]);
    if (health.status === 0) break;
    await delay(250);
  } while (Date.now() < deadline);
  requireSuccess(health);
  assert.equal(health.stdout, 'healthy\n');
  assert.match(health.stderr, /HTTP\/1\.1 200 OK/);
  assert.match(health.stderr, /Cache-Control: no-store/i);
  assert.match(health.stderr, /X-Robots-Tag: noindex, nofollow/i);
  assert.match(health.stderr, /Content-Security-Policy:/i);
  const builtHtml = readFileSync(new URL('../build/index.html', import.meta.url), 'utf8');
  for (const path of ['/', '/index.html']) {
    const page = requireSuccess(
      docker(['exec', container, 'wget', '-S', '-O', '-', `http://127.0.0.1${path}`])
    );
    assert.match(page.stderr, /HTTP\/1\.1 200 OK/);
    assert.match(page.stderr, /Cache-Control: no-cache, no-store, must-revalidate, no-transform/i);
    assert.match(page.stderr, /Content-Security-Policy:/i);
    assert.equal(
      page.stdout,
      builtHtml,
      'Serve the maintained prerender without changing its body.'
    );
    assert.match(page.stdout, /href="mailto:bartosz\.litwa@proton\.me"/);
    assert.doesNotMatch(page.stdout, /\/cdn-cgi\/l\/email-protection/);
  }
  const missing = docker([
    'exec',
    container,
    'wget',
    '-S',
    '-O',
    '-',
    'http://127.0.0.1/health-contract-missing'
  ]);
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /HTTP\/1\.1 404 Not Found/);
  log('Nginx health, security headers, cache policy and missing-route behavior passed.');
} finally {
  requireSuccess(docker(['rm', '-f', container]));
}
