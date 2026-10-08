# Bartosz Litwa Portfolio

Public portfolio at [litwa.dev](https://litwa.dev), presenting Bartosz Litwa's AI-native company,
the DoifyNow product family, and professional experience. It is implemented as a static React single-page application and supports GitHub Pages or
a Docker/Nginx deployment behind Traefik.

## Architecture

The executable system in this repository is frontend-only:

```text
Browser
  -> GitHub Pages, or Traefik -> Nginx container
      -> static Vite build
          -> React 19 + TypeScript
              -> JSON product, project, career, and EN/PL content in src/data
              -> bundled images and fonts
              -> localStorage: language and theme preferences
              -> Umami: anonymous product analytics
              -> remote icon/badge image hosts
```

There is no first-party backend, API, authentication/authorization service, database, migration
system, or native mobile app here. Technology names in portfolio content describe other projects.

Main runtime components:

- `src/App.tsx`: composition, code splitting, and analytics section observation
- `src/components`: navigation, hero, company ecosystem, experience, certifications, and footer
- `src/data`: product-family, portfolio, career, and EN/PL translation data
- `src/hooks`: language, theme, and intersection-based animation state
- `src/utils`: asset lookup, localization, and Umami helpers
- `vite.config.ts`: build, test, coverage, and output configuration
- `nginx.conf`: SPA routing and cache policy
- `nginx-security-headers.conf`: Docker response-header baseline and CSP
- `compose`: Dokploy/Traefik service configuration

## Requirements and local setup

- Node.js 22 through 24
- npm 10 or newer
- Chromium installed for Playwright browser journeys (`npx playwright install chromium`)
- Docker with Compose v2 only for container validation/deployment

Install exactly what is recorded in the lockfile and start Vite:

```bash
npm ci
npm run dev
```

Vite prefers `http://localhost:3000` and selects the next available port if 3000 is occupied.

## Configuration and secrets

No secret or environment variable is required. Umami's website ID is public telemetry configuration
in `index.html`. Every future variable prefixed with `VITE_` would be embedded into browser
JavaScript and public; never put a private API key, token, password, or server credential in a Vite
environment variable or in Compose build arguments.

## Quality and security gates

Run the complete local gate before every release:

```bash
npm run check
```

It enforces formatting, ESLint, strict TypeScript, Vitest coverage thresholds, a production build,
Playwright journeys against the production preview, and an audit that explicitly includes
development/build dependencies. Individual commands remain available as `npm run format:check`,
`npm run lint`, `npm run typecheck`, `npm run test:coverage`, `npm run build`, `npm run test:e2e`, and
`npm run audit`.

GitHub Actions runs the same gate and additionally builds the production container. Dependabot
checks npm, Docker base images, and GitHub Actions weekly.

Custom CI and container validation use fleet self-hosted Linux runners. Node setup explicitly
disables GitHub package-manager caching; neither workflow uploads artifacts to GitHub. Dependabot
updates remain enabled and use GitHub-hosted runners because
[GitHub does not support self-hosted Dependabot for public repositories](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-on-actions-runners).
FleetSetup owns the organization runner settings and this public-repository exception.

## Deployment and operations

See [DEPLOYMENT.md](DEPLOYMENT.md) for GitHub Pages and Docker/Traefik procedures, health checks,
rollback steps, headers, logging, and operational checks. Use [RELEASE_CHECKLIST.md](RELEASE_CHECKLIST.md)
for each release.

The Docker path provides:

- immutable, digest-pinned Node and Nginx base images
- permanent HTTP-to-HTTPS redirect at Traefik
- HSTS, CSP, clickjacking, MIME-sniffing, referrer, and browser-permission headers
- immutable caching for fingerprinted assets, including WebP, and no-cache HTML
- read-only container filesystem, localhost-only host-port binding, resource limits, health checks,
  and log rotation

GitHub Pages does not allow this repository to set arbitrary HTTP response headers. If Pages remains
a production target, configure equivalent headers at its CDN/front door and verify them after DNS or
hosting changes.

## Security and privacy

- The site is public and has no accounts, roles, sessions, or private application records.
- React escapes rendered JSON content; no raw HTML injection API is used.
- External links opened in a new tab use `noopener noreferrer`.
- Third-party analytics and image hosts remain availability, privacy, and supply-chain dependencies.
- Client errors currently fall back to a root error boundary and console logging; there is no remote
  error collection or uptime alert in this repository.
- Report vulnerabilities according to [SECURITY.md](SECURITY.md).

## Known issues and recommended follow-up

The full prioritized register, evidence, fixes, and accepted constraints are in
[ANALYSIS.md](ANALYSIS.md). The main remaining work is:

1. choose and document one authoritative production deployment path;
2. add independent uptime and client-error monitoring with redaction/retention rules;
3. self-host or explicitly govern remote icons/badges and define a privacy notice for analytics;
4. consolidate the duplicate Compose files and clean unused source assets;
5. maintain behavior and accessibility coverage as the content model and page hierarchy evolve.

## Updating content

Most content changes belong in:

- `src/data/products.json`
- `src/data/experience.json`
- `src/data/certifications.json`
- `src/data/products.json`
- `src/data/translations.json`

`products.json` is the authoritative product-family source. Product URLs are optional: omit a URL
until its current public destination is verified, and use an honest development stage instead of a
broken external call to action. Keep EN and PL content structures aligned. The test suite validates
translation paths, product stages and optional links, unique content identifiers, project links, and
required collections.
