# Deployment and Operations Guide

The repository supports two static hosting paths. Treat one as authoritative for `litwa.dev` and the
other as an explicitly tested fallback; deploying both without clear ownership makes rollback and
incident diagnosis ambiguous.

## Required preflight

From a clean checkout:

```bash
npm ci
npm run check
```

Do not deploy from a lockfile or source tree that fails any gate. `npm run audit` includes
development dependencies because build-time packages are part of the supply-chain boundary. The
`npm run check` gate also runs the Playwright journeys against a production preview; install its
Chromium runtime with `npx playwright install chromium` before the first local run.

## GitHub Pages

`package.json` defines:

- `homepage`: `https://litwa.dev`
- `predeploy`: `npm run build`
- `deploy`: `gh-pages -d build`

`gh-pages` is pinned to 6.1.1 because later releases include the unpatched vulnerable `braces`
dependency. Keep the audit gate passing when reviewing an upgrade.

Deploy after the preflight:

```bash
npm run deploy
```

Then verify the `gh-pages` branch in repository Settings > Pages and test the canonical domain.
GitHub Pages does not accept arbitrary response headers from this repository. Apply and validate the
same CSP/HSTS/browser-header policy at any CDN or front door placed in front of Pages.

## Docker, Nginx, Dokploy, and Traefik

The Compose files require the external networks `shared-network` and `dokploy-network` and a Traefik
instance with `web`, `websecure`, and a `letsencrypt` certificate resolver.

Validate and build:

```bash
docker compose -f compose/docker-compose.yml config
docker compose -f compose/docker-compose.yml build --pull
```

Deploy through Dokploy or, for a controlled host, run:

```bash
docker compose -f compose/docker-compose.yml up -d
```

The host diagnostic port is bound only to `127.0.0.1:10580`; public traffic must enter through
Traefik. The HTTP router permanently redirects to HTTPS. Nginx serves the SPA and security headers,
while Compose supplies a read-only filesystem with explicit temporary mounts, resource limits, a
health check, `no-new-privileges`, and bounded JSON logs.

`compose/docker-compose.webapp.yml` is a compatibility mirror. Until it is consolidated, every
service change must be applied to both files and both must pass `docker compose config`.

## Runtime configuration

The site requires no secret or runtime environment variable. Vite configuration is resolved at build
time. Any future `VITE_*` value would be public in the emitted JavaScript and must not contain a
secret.

## Health, logs, and verification

Container state and the local health endpoint:

```bash
docker compose -f compose/docker-compose.yml ps
curl --fail --silent --show-error http://127.0.0.1:10580/ >/dev/null
docker compose -f compose/docker-compose.yml logs --tail=100 portfolio-webapp
```

Production checks:

```bash
curl --fail --silent --show-error https://litwa.dev/ >/dev/null
curl --silent --show-error --head https://litwa.dev/
curl --silent --show-error --head http://litwa.dev/
```

Confirm that HTTPS returns HSTS, CSP, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, and `Permissions-Policy`; HTTP must redirect permanently to HTTPS. Confirm that
fingerprinted `.js`, `.css`, and `.webp` assets are long-lived/immutable while `index.html` is not
cached.

Also smoke test both desktop and mobile layouts, EN/PL, light/dark theme persistence, deep links such
as `/#ecosystem`, `/#experience`, and `/#certifications`, CV download, verified external links, unlinked
development-state product cards, remote badges/icons, and Umami without console errors. The automated
journeys are a regression gate, not a replacement for this release smoke test.

The Docker health check is not independent monitoring. Configure an external HTTPS uptime check and
alert route outside this repository. If client-error monitoring is added, redact form/contact data
and define retention and access rules before enabling it.

## Rollback

GitHub Pages:

1. identify the last known-good source revision and corresponding `gh-pages` deployment;
2. redeploy that source revision through the same reviewed process;
3. verify canonical URL, headers at the front door, and assets after propagation.

Docker/Dokploy:

1. select the last known-good immutable image/deployment revision;
2. redeploy it without rebuilding floating inputs;
3. verify container health, HTTPS redirect, response headers, logs, and browser smoke checks.

Do not delete current deployment state until rollback health is confirmed.

## Base-image maintenance

The Dockerfile pins multi-architecture image digests for reproducibility. Dependabot proposes digest
updates, but each update still requires the complete quality gate, container build, Nginx
configuration test, and runtime header/health verification before deployment.
