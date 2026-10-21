# Public email link follow-up — 21 October 2026

This is one new public semantic finding after PR59's prerender reached production. It is not an
old crawl, a new Ahrefs project/score or a revision of the original eight-issue inventory. PR60's
merged source, verification and cleanup evidence remain valid. The coordinating Mac thread owns
production rollout and subsequent public/crawler acceptance.

## Reproduction and cause

The recreated, clean task worktree and branch `codex/ahrefs-round2-20261021` matched fetched
`origin/main` at `f88d46d5797c628596c52adf859490424086b2a2`. The primary checkout was preserved.
Fleet ancestor instructions, README, runtime configuration, prerender, nearby tests and delivery
skills were revalidated. No scoped AGENTS, open PR or competing active project thread was found.

At **2026-10-21 00:36:49 UTC**, independent public GETs reproduced:

| URL / scope                                    | Observation                                                                                                                                                  | Disposition                                                                                   |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `https://litwa.dev/`, one email href           | 200 text/html, one H1,37 anchors, one `/cdn-cgi/l/email-protection#…` href. Cache-Control was `no-cache, no-store, must-revalidate`, without `no-transform`. | **fixed in source**, pending current-head CI, authorized rollout and fresh public acceptance. |
| `https://litwa.dev/cdn-cgi/l/email-protection` | Independent GET returned404 text/html. URL fragments are not sent in an HTTP request, so this checks the actual href request target.                         | Concrete broken internal destination; no fake200 route or redirect is added.                  |

The [HTTP receipt](evidence/email-link/live-before.json) retains timestamps, status, content type,
header policy, body hashes and link counts. It contains only public response evidence.

`src/components/Footer/Footer.tsx` already supplies the real
`mailto:bartosz.litwa@proton.me` anchor and visible contact address. `scripts/prerender.mjs`
serializes that existing React component correctly. Cloudflare's downstream email obfuscation
rewrites that valid source link to its broken internal endpoint and inserts a decoder script.
The missing origin `no-transform` directive permits this transformation. Source/prerender did
not generate the `/cdn-cgi/` destination.

[Cloudflare's official troubleshooting documentation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/#troubleshoot-email-obfuscation)
states that email obfuscation does not apply to responses carrying `Cache-Control: no-transform`.
This is the documented mechanism used here, not a locally simulated CDN acceptance claim.

## Smallest source-owned correction

`nginx.conf` adds `no-transform` to the existing HTML cache policy in the exact `/index.html`
location. Nginx's directory index resolves `/` through that same location; regression requests
cover both URLs. Existing no-cache/no-store/must-revalidate semantics and security headers remain.
Health's private noindex/no-store policy, immutable assets, unknown404 behavior and hash navigation
remain separate and unchanged. No Cloudflare setting, route exception, credential or deployment
was modified. No CSP relaxation or tracking addition is needed.

The footer, real contact address, visible document, all navigation, truthful Person/Organization
schema and PR60 Vite security patch are unchanged. The built HTML is checked against the prior
immutable build hash. This is a response-header correction with no intended visual change;
focused built-HTML, response-contract and diff evidence substitutes for new screenshots/video.
Existing NAS media and receipts are preserved; no new media staging or browser session is created.

## Verification contracts and evidence limits

- `scripts/verify-nginx-health.mjs` now copies the maintained built index into its exact pinned,
  isolated Nginx test container. GETs for `/` and `/index.html` require200, the complete cache policy
  including no-transform, CSP, byte-for-byte unchanged built body, the real mailto and zero
  email-protection links. Existing health/noindex/missing-route assertions are preserved.
- `tests/e2e/discovery.spec.ts` requires the actual mailto and rejects email-protection URLs in
  raw initial HTML. Existing no-JavaScript content and factual-schema journeys remain intact.
- Required local command: `CI=1 npm run check`; maintained build and narrow output assertions are
  recorded in the companion build receipt and task-state logs. Exact results and implementation
  revision are appended after completion. No hook, assertion or gate is weakened.
- Live HTTP above is before rollout. The corrected Nginx header and CDN output are not claimed
  live based on a build or merge. This worker previously lacked a Docker daemon/browser libraries;
  current local/CI results must be reported separately. Pending-CI fallback requires all of its
  local verification conditions; an environment-blocked full gate is not eligible.

## Completed local verification

Exact implementation: `09de9b07ea4df99a20bef933272d10e37aabee40`. Documentation commits after
this revision do not change tested behavior. [Built-output receipt](evidence/email-link/build.json):
43,834 bytes,SHA256 `87cfa900627b515e4b7764b8f653b310b221ac65acf10e961ae029a7eb286429`,
byte-for-byte identical to PR60's maintained output. One H1,37 anchors,one original mailto,
zero email-protection hrefs. Baseline configuration lacks no-transform; changed configuration
includes it. This body identity proves no markup/appearance/copy/schema/asset change was introduced.

- Clean `npm ci --include=dev`: pass with the existing locked Vite8.3.4 security patch.
- `CI=1 npm run check`: formatting,ESLint,strict TypeScript,16 unit tests,coverage thresholds and
  maintained Vite/prerender build pass. Coverage:80.24% statements,59.77% branches,80.21% functions,
  84.85% lines. The full command then fails at Nginx verification because this worker has no
  `/var/run/docker.sock`. No test container was created. Browser E2E was not reached locally.
- `npm run audit`: pass,zero vulnerabilities. No dependency,lockfile,CSP or schema change.
- Focused built-output/hash/source-policy assertions and final diff review: pass.
- New Nginx HTTP assertions and browser regressions require fresh final-head CI; local runtime and
  browser verification are unverified. No fallback merge is eligible while full local gates are
  environment-blocked. Required CI must pass normally before merge.

The non-draft follow-up PR is linked to the same T3 thread as PR60; PR60 remains historical and
closed. Exact final head,PR URL,head/creation-based30-minute deadline,CI/merge/readback and cleanup
records are persisted under the worker task-state `email-link/` directory and returned in this
originating chat. No dev server,device,tunnel or browser automation was started. Task worktree
cleanup follows confirmed exact-head merge only; all prior NAS evidence is preserved.

## Owner action after merge

Authorize the normal portfolio runtime rollout at the delivered immutable source revision,
retaining the current image/deployment ID for rollback. No provider dashboard change is needed.
Verify public `/` and `/index.html` responses carry no-transform and keep the real mailto, one H1,
37 anchors and zero email-protection hrefs. Confirm robots/sitemap content types, local assets,
CSP, health privacy and true unknown404 routes. Then run root's authenticated crawl acceptance.
If the header is missing or overridden, inspect that deployed artifact/front-door header path
read-only before any separately authorized runtime change. On regression, restore the recorded
prior immutable deployment through the normal owner-controlled path. No rollout/restart occurred
in this task. The exact serving image/deployment identity remains an owner acceptance surface.
