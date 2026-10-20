# Litwa Ahrefs source remediation — 20 October 2026

The source fixes make the real portfolio readable without JavaScript and remove an unsupported
software rich-result declaration. They do not establish production deployment or Ahrefs acceptance.
The coordinating Mac thread owns portfolio integration, deployment authorization and authenticated recrawl.

## Scope and revisions

- Repository: `doifynow/bartoszlitwa.github.io`; public origin: `https://litwa.dev/`.
- Frozen Ahrefs project: `10563823`; crawl: `20-10-2026T194244P0200` (17:42:44 UTC).
- Dashboard: 8 issue types, 11 occurrences: 1 error type, 4 warning types, 3 notice types.
- Complete exports: 8 URL data records and 8 link data records. Header rows are excluded from these
  counts; CSV records include a multiline robots value. Dashboard overview separately reports 88%
  health, 4 internal pages and 1 page with errors; those metrics are not export-row counts.
- Email `1a15a68a92fc39ba` repeats all 8 types and the same 11 occurrences. Its report parameter
  `20-10-2026T174244` corresponds to the same UTC time. Summary counts and duplicate email rows do
  not create additional findings.
- Inspected/fetched base: `57844e3d8f99956bc17f3fea49e8f9f1b4b7a63d`.
- Verified implementation revision: `6afd9ace4284b5b4863fb388a6021099d926dd05`.
  Subsequent task commits document evidence only; resolve the final PR head through GitHub.
- Branch: `codex/ahrefs-remediation-20261020`; isolated, initially clean assigned worktree.
  No applicable ancestor/scoped AGENTS file was present in this checkout path; the supplied owner
  instructions apply. README, deployment/runtime configuration and required skill procedures were read.
- No open PRs existed at inspection or before delivery. Stale remote branches
  `codex/refine-portfolio-frontend` and `codex/production-readiness-catalog` overlap App, navigation,
  ecosystem and test paths, but their recent intended contracts are already represented on main.
  They were not checked out, modified, reset or merged. The primary checkout was preserved.
- The existing graph was dated `d09b1870861737246ac5ee41edb9941087bb8a0e`; its App/language-provider
  relationships were treated as historical hints and checked against current files.

## Issue ledger

All rows below use the frozen crawl timestamp above. Source dispositions are separate from live
acceptance. **Fixed** means fixed and locally verified at the implementation revision, awaiting an
owner-authorized rollout and recrawl. Counts remain the original crawler counts.

| Issue / severity / count                                              | Explicit URL coverage and evidence                                                                                                                                                                | Disposition / source action                                                                                                                                                                                                       | Verification / remaining owner action                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page has no outgoing links / error / 1                                | `https://litwa.dev/`, URL record 1. Crawl: zero internal/external href outlinks. Live response still has an empty root; rendered JavaScript supplies links.                                       | **fixed**: build-time rendering uses the existing React tree and emits actual public content, links and all lazy-component styles. No separate SEO copy or crawler-specific response.                                             | Raw-response assertion plus JavaScript-disabled browser tests check links, fragments and local assets. Desktop/mobile capture: 37 hrefs. Coordinator: deploy through the approved workflow and recrawl.                                                                                                                |
| H1 tag missing or empty / warning / 1                                 | Same homepage, URL record 1. Crawl H1 empty; live raw shell empty; live JavaScript H1 exists.                                                                                                     | **fixed**: real `SimpleBanner` H1 is in initial HTML, with no hidden streaming placeholder.                                                                                                                                       | One visible H1 containing Bartosz Litwa without JavaScript, at all three test viewports. Coordinator: live HTML/recrawl verification.                                                                                                                                                                                  |
| Low word count / warning / 1                                          | Same homepage, URL record 1. Crawl observed 15 words from the shell.                                                                                                                              | **fixed**: initial HTML contains the existing hero, product family, experience, certifications and contact content; no padding or invented content.                                                                               | Capture measured 717 existing main-content words without JavaScript at 1440px and 390px; section assertions pass. Coordinator: recrawl; no guarantee about arbitrary crawler thresholds.                                                                                                                               |
| Structured data has Google rich results validation error / notice / 1 | Homepage. Drilldown identifies DeployifyNow in ItemList position 4: missing `offers` and `aggregateRating` or `review` for Software App eligibility. Live/source reproduce `SoftwareApplication`. | **fixed**: use `Thing` for this factual product-family entry, consistent with the other development-stage products. Preserve name, description and destination. Do not claim a sale offer or fabricate ratings/reviews.           | JSON-LD regression checks all eight entries against visible product cards and rejects offer/review/rating claims. This fixes the supported eligibility mismatch, not proof of a fresh Google/Ahrefs validation. Coordinator: recrawl.                                                                                  |
| Organization schema missing or incomplete / notice / 1                | Homepage. The supplied drilldown says DoifyNow Organization has no schema validation issues. Source and live graph include its name, description, URL and founder; Person represents Bartosz.     | **intentional**: retain these factual identities. This is a personal portfolio discussing a company, not a claim that the individual is an organization. No missing legal identity, address or logo is invented.                  | JSON-LD test preserves the named organization, URL and founder. Google Organization guidance has no universally required properties. Exact Ahrefs heuristic/property detail was not captured; the notice may persist. Coordinator: inspect the post-rollout heuristic if needed; do not infer a missing business fact. |
| Redirected page has no incoming internal links / warning / 1          | Canonical homepage is the single indexable redirected-to page: link records 2, 3 and 5 redirect to it; record 6 is its canonical. No other HTML source page exists in the export.                 | **intentional**: one-page/hash-navigation portfolio has no second HTML page to supply an incoming link. Preserve direct canonical destinations; do not add links to HTTP/www aliases or create pages only to satisfy this metric. | Complete URL/link export and live redirect topology checked. Initial HTML now exposes meaningful section links. Coordinator: accept the single-page topology or assess a future content-driven site expansion separately.                                                                                              |
| 3XX redirect / warning / 3                                            | `http://litwa.dev/`, `https://www.litwa.dev/`, `http://www.litwa.dev/`: URL records 4–6 and link records 5, 2, 3 respectively.                                                                    | **intentional**: each returns 301 directly to `https://litwa.dev/`; no chain or loop.                                                                                                                                             | Current unauthenticated GETs with redirect-following disabled verify exact Location and canonical 200 target. No provider change needed. Coordinator: preserve canonical host policy.                                                                                                                                  |
| HTTP to HTTPS redirect / notice / 2                                   | `http://litwa.dev/` and `http://www.litwa.dev/`, URL records 4 and 6; subset of the preceding 3XX group.                                                                                          | **intentional**: expected security/canonicalization redirects, counted in both report categories without double-counting URL records.                                                                                             | Both are one-hop 301 to canonical HTTPS. Coordinator: preserve.                                                                                                                                                                                                                                                        |

Result: **4 fixed types / 4 occurrences**, **4 intentional types / 7 occurrences**. No supplied URL
record or link edge is omitted. No listed issue is marked already fixed or blocked. Fresh deployment,
Google validation, the unspecified Ahrefs Organization heuristic and recrawl acceptance remain
unverified; the source dispositions do not erase those evidence limits.

## Complete export-row reconciliation

The exact sanitized input files are retained under [evidence](evidence/). JSON export formatting is
excluded from Prettier to preserve the supplied hashes; source checks and assertions stay enabled.

| URL data record | URL                                           | Current observation / disposition                                                                                                                                               |
| --------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1               | `https://litwa.dev/`                          | 200 HTML; valid canonical, accurate title/description; empty raw root reproduced and fixed in source as above.                                                                  |
| 2               | `https://litwa.dev/assets/index-CH4YxfMw.js`  | 200 JavaScript, not HTML. Asset resource, intentionally not an indexable document. Build fingerprints can change.                                                               |
| 3               | `https://litwa.dev/assets/index-Cb7Wq3tL.css` | 200 CSS, not HTML. Asset resource, intentionally not an indexable document.                                                                                                     |
| 4               | `http://litwa.dev/`                           | Intentional direct HTTPS redirect.                                                                                                                                              |
| 5               | `https://www.litwa.dev/`                      | Intentional direct canonical-host redirect.                                                                                                                                     |
| 6               | `http://www.litwa.dev/`                       | Intentional direct canonical HTTPS redirect.                                                                                                                                    |
| 7               | `https://litwa.dev/sitemap.xml`               | 200 `text/xml`; XML parses and lists only canonical public homepage. Removed stale hard-coded August lastmod from source instead of asserting an unsupported modification date. |
| 8               | `https://litwa.dev/robots.txt`                | 200 `text/plain`; valid `User-agent: *`, `Allow: /` and canonical Sitemap directive. Preserved.                                                                                 |

Link data record 1 is the sitemap-to-homepage discovery edge; records 2, 3, 5 are the redirects;
record 4 is the JavaScript asset; record 6 is the self canonical; record 7 is
`https://analytics.doifynow.com/script.js` with `Blocked by robots.txt`; record 8 is the CSS asset.
All eight edges are preserved. Analytics is a script resource, not an outgoing href/content page;
its third-party crawl restriction does not justify a robots/provider/privacy change. The compact
focused evidence has no bad-status public URL rows, Cloudflare email-obfuscation targets or OAuth
metadata targets. Current rendered homepage inspection found zero `/cdn-cgi/` links. No OAuth or
authentication service exists here; no private/noindex route was index-enabled.

Current read-only HTTP evidence is in [current-http.json](evidence/current-http.json), captured
2026-10-20 at the timestamp in that file. Unknown `/ahrefs-missing-20261020`, its slash form, `/en/`
and `/pl/` return actual 404 HTML without the application shell. The locale choice remains client-side
on `/`; inventing localized URLs/hreflang would misrepresent the route architecture. Public CV is
200 `application/pdf`. Robots/sitemap bodies were inspected and the saved sitemap parsed as XML.
A later default-Python-user-agent refetch received 403; the earlier explicit audit-agent GET evidence
is retained rather than treating that request-policy difference as a source regression.

## Reproducible verification

At implementation revision `6afd9ace4284b5b4863fb388a6021099d926dd05`:

- `fleet-workload -- npm ci --include=dev`: passed, clean lockfile install. This worker defaults
  NODE_ENV to production, so explicit development dependencies are necessary for local verification.
- `fleet-workload -- env CI=1 npm run check`: passed: Prettier, ESLint, TypeScript, 16 unit tests,
  coverage thresholds, maintained Vite client/static production build, isolated pinned-Nginx health,
  headers/cache and missing-route checks, 58 Playwright tests, dependency audit with zero vulnerabilities.
  Two existing desktop/tablet menu tests are intentionally skipped at their inapplicable viewports;
  they are not counted as passing. Browser execution used two workers under host pressure.
- Coverage: statements 80.24%, branches 59.77%, functions 80.21%, lines 84.85%.
- New browser regressions check the raw response, JavaScript-disabled rendering at desktop/tablet/mobile,
  H1/sections/CV/product links, fragment destinations, local resource bodies and factual JSON-LD.
  Existing tests cover Polish/English, preferences, responsive navigation, reduced motion and chunk errors.
- The first streaming attempt failed the new no-JavaScript test; the final renderer waits for lazy
  imports and serializes with `renderToStaticMarkup`. Its build asserts no reveal script/loading status.
  The corrected full gate passed. No assertion, hook or CI gate was removed or weakened.
- Two recent base regressions prevented the mandatory gate: coverage-v8 5.0.4 required Vitest 5.0.4
  while the repository uses 4.1.11; gh-pages 6.3.0 introduced a high-severity braces dependency chain.
  Restored the previously established 4.1.11 coverage and 6.1.1 gh-pages pins, preserving normal install
  and audit enforcement. No deployment command was run.
- Production-container build/production rollout are separate surfaces: the Nginx runtime contract
  passed, but a newly built production image was not run locally. GitHub's container workflow runs on
  main. CI and merge status must be read back for the final PR head, not inferred from local results.

Detailed local logs remain in the task state directory
`/home/t3code/.local/state/codex/ahrefs-remediation-20261020/bartoszlitwa.github.io/`;
`check-final.log` is the successful gate. Host telemetry reported root disk, swap, memory and I/O
pressure. Work ran with fleet-workload, without deleting unrelated data or imposing arbitrary gates.

## Visual and workflow evidence

Only `/` has changed: its non-JavaScript state now exposes all existing sections. No screen was
deleted and the interactive design is preserved. No new logo/asset/copy was generated. Full-page
screenshots cover hero, ecosystem/cards, experience, certifications and contact at desktop 1440×900
and mobile 390×900. The 18.36-second desktop recording shows entry, Explore the company, experience,
certifications and contact fragment destinations. Product-card details are covered by screenshots;
mobile workflow and interactive locale/theme behavior are supported by browser tests, not a claimed
mobile recording. No private account/session data was used.

- [Desktop after (all sections, implementation revision)](https://truenas-vm.tail341687.ts.net:8446/artifacts/fleet-agent-t3code/10320714eb384e1bb9fb0353c2f871b7/litwa-ahrefs-remediation-after-no-javascript-desktop.png)
- [Mobile after (all sections, implementation revision)](https://truenas-vm.tail341687.ts.net:8446/artifacts/fleet-agent-t3code/7e4abb50114041c684db7260d184a0c9/litwa-ahrefs-remediation-after-no-javascript-mobile.png)
- [Desktop before (production, JavaScript disabled)](https://truenas-vm.tail341687.ts.net:8446/artifacts/fleet-agent-t3code/ff655da53ee04f0baded40ffa4e0500c/litwa-before-remediation-desktop-without-javascript.png)
- [Mobile before (production, JavaScript disabled)](https://truenas-vm.tail341687.ts.net:8446/artifacts/fleet-agent-t3code/9ecf8058a8a647cbb69a6b73c87531b2/litwa-ahrefs-remediation-before-no-javascript-mobile.png)
- [18-second desktop discovery workflow (0–4s hero; 4–8s company; 8–12s experience; 12–18s certifications/contact)](https://truenas-vm.tail341687.ts.net:8446/artifacts/fleet-agent-t3code/dcf3fac573cf4ebca38af8f66ddbcac9/litwa-ahrefs-remediation-no-javascript-discovery-workflow.webm)

Artifacts are private NAS/S3 review links expiring 27 October 2026. Every screenshot's actual pixels
and beginning/transition/end frames of the video were inspected. Full downloads were independently
retrieved and SHA-256/byte-count checked; video byte ranges returned 206 and matching content.
[evidence/media-receipts.json](evidence/media-receipts.json) records the exact retrieval receipts.
Published captures were removed from staging by the uploader; no Desktop or local-only media is a
final deliverable.

## Delivery and remaining acceptance

The PR targets main and must be associated with this originating T3 thread. Its short description
links this ledger and the same visual evidence. Normal merge requires fresh current-head CI/review/
conflict gates or the explicit owner's 30-minute pending-CI policy; never describe pending/skipped
checks as green. The exact head's start/deadline is persisted in task state when the PR is created.

The Mac coordinator's smallest remaining action after source merge is to authorize the normal
production rollout, confirm populated raw HTML and preserved routes/assets on the deployed revision,
and run the authenticated Ahrefs crawl. Preserve intentional redirects and factual personal/company
schema even if heuristic notices remain. No provider/DNS/auth/Ahrefs setting was changed here.
