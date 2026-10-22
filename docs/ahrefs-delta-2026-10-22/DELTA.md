# Litwa Ahrefs delta — 22 October 2026

## Scope and identity

This is a fresh review of an existing completed crawl, not a new crawl or clearance result.
The coordinating owner reread the authenticated Actual issue table on 22 October at
18:12:05 UTC: project [10563823](https://app.ahrefs.com/site-audit/10563823/issues), displayed
crawl date 21 October early morning Europe/Warsaw, Health Score 96, AI Score 100,
5 internal dashboard URLs and 1 internal URL with errors. Counts overlap. The broken-image
drilldown returned **No results** during that read; no fresh four-URL export was supplied.

Root separately supplied the authenticated Site Explorer baseline on 22 October:
**DR 6, backlinks "748", referring domains "696"**. These are literal displayed values,
not independently remeasured here. No DR increase was observed. Health/AI scores do not measure DR.
[Ahrefs defines DR](https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr)
as relative backlink-profile strength. Counts alone establish neither relevance nor harmful links;
no disavowal or link-quality conclusion follows from this baseline.

Repository `doifynow/bartoszlitwa.github.io`, `public/CNAME`, package homepage, canonical,
robots and sitemap all identify `https://litwa.dev/`. The clean assigned worktree
`codex-ahrefs-dr-rescan-20261022` / branch `codex/ahrefs-dr-rescan-20261022` matched fetched
main `7b04cd1c867c9cac099308af8c88c71d91f80538`. The primary checkout at `68f2b8f` was preserved.
No scoped AGENTS was found. Existing graphify results were consulted, then current source was
inspected directly; the graph warns about its older node-ID scheme and is not current-runtime proof.

Authenticated `git`/`gh` access was verified. Initial GraphQL requests were rate-limited;
REST repository/pulls/issues reads succeeded with push permission, no open PRs and no open
issues. A bounded rate-limit read confirmed remaining REST quota. No credentials were changed.
Recent merged work includes [#59](https://github.com/doifynow/bartoszlitwa.github.io/pull/59)
(prerender/schema), [#60](https://github.com/doifynow/bartoszlitwa.github.io/pull/60)
(Organization identity), [#61](https://github.com/doifynow/bartoszlitwa.github.io/pull/61)
(email preservation), and [#62](https://github.com/doifynow/bartoszlitwa.github.io/pull/62)
(certificate hotlink removal). Their existing handoffs were read; none is reimplemented.
No competing project writer was exposed by the current T3 project thread list. No original
portfolio growth-owner ID or promotion draft was supplied or found in tracked Markdown;
external/private drafts remain uninspected and must be deduplicated before any future send.
Post #499 and House #545/#546 remain with their original owners and are outside this work.

## Current public bytes and complete issue ledger

[Public HTTP receipt](evidence/public-http.json), completed 18:17:52 UTC, records anonymous
GETs with redirects disabled, 15-second timeouts and a 3 MB response bound. It retains selected
public headers, byte lengths and SHA-256 hashes, never sessions or cookies. Homepage: 200,
43,699 bytes, SHA-256 `7db707f9494872fe68b00c2c61a35750891837e29c23b86ad3f0a39b06a9bff2`.
This exactly matches the previously documented #62 build receipt. That proves the sampled HTML
body, not the deployed commit or every runtime resource. All 25 discovered first-party resources
(network images, styles, script, fonts, icon, manifest, preview image and CV) returned 200.
There are 23 img elements: 22 network references to 12 unique URLs and one inline image.
Four certificate fallbacks, zero Credly references, one H1 and the direct mailto are present.
HTTP success/content type alone is not visual decoding or browser acceptance.

| Issue / count                                      | URL and current public bytes                                                                                                                                                                            | Current source / PR                                                                                                                                                                | Classification                                                                                                      | Owner / remaining evidence                                                                                                                                       |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Changed pages not submitted to IndexNow / 1        | Exact new drilldown URL unavailable; sole sitemap page is `https://litwa.dev/`, current 200 HTML above.                                                                                                 | No configured IndexNow integration/key; existing content changed in #59–62.                                                                                                        | Informational submission notice, not a proven source defect.                                                        | Coordinator may decide separately whether indexing integration is useful. No key or submission created.                                                          |
| Page has links to redirect / 1                     | Homepage internal hrefs are section fragments, CV and mailto; no current internal redirect reproduced. Outgoing RentifyNow and LinkedIn redirects below are real.                                       | Prerender in #59; mailto preserved by #61; product/profile links in existing data/NavBar/Footer.                                                                                   | Historical exact edge unavailable; no new internal-link patch justified.                                            | Portfolio integration owner retains current proof; coordinator supplies an exact fresh edge if this persists.                                                    |
| Redirected page has no incoming internal links / 1 | `https://litwa.dev/` is the canonical destination of three aliases. Sitemap has one document.                                                                                                           | Existing single-page/hash-navigation architecture.                                                                                                                                 | Intentional one-page topology.                                                                                      | Preserve direct canonical links; no artificial pages or links to aliases.                                                                                        |
| 3XX redirect / 3                                   | `http://litwa.dev/`, `http://www.litwa.dev/`, `https://www.litwa.dev/` each 301 directly to `https://litwa.dev/`, which is 200.                                                                         | Existing edge/canonical policy.                                                                                                                                                    | Intentional, no chain or loop reproduced.                                                                           | Hosting owner; no provider change needed.                                                                                                                        |
| HTTP to HTTPS redirect / 2                         | Both HTTP aliases above return the direct HTTPS canonical Location.                                                                                                                                     | Existing edge policy.                                                                                                                                                              | Intentional transport upgrade; overlaps preceding row.                                                              | Preserve HTTPS.                                                                                                                                                  |
| H1 tag changed / 1                                 | Homepage has one H1 and prerendered identity content. No fresh prior/current H1 diff supplied.                                                                                                          | Real hero rendered by #59.                                                                                                                                                         | Change notification, not evidence of an invalid heading.                                                            | Existing content owner; no arbitrary rewrite.                                                                                                                    |
| Word count changed / 1                             | Homepage exposes existing real React sections in 43,699-byte initial HTML. No fresh count delta supplied.                                                                                               | #59 prerender and existing bilingual data.                                                                                                                                         | Change notification; no evidence requiring filler.                                                                  | Preserve substantive copy.                                                                                                                                       |
| Image broken / 4                                   | Fresh drilldown: No results. Current homepage has zero `images.credly.com` references; 12 unique network image URLs return 200 image bodies.                                                            | #62 removed four badgeUrl hotlinks and uses existing neutral certificate codes. Historical exact URLs remain in [prior follow-up](../ahrefs-round2-2026-10-21/CREDLY-FOLLOWUP.md). | Already fixed in source and absent from sampled current HTML; old crawl remains unverified.                         | Coordinator owns future crawl acceptance. Do not repeat #62 or claim bot-wide clearance.                                                                         |
| Page has broken image / 1                          | Homepage is historical referrer for the four badge URLs; same current asset evidence as above.                                                                                                          | #62.                                                                                                                                                                               | Overlapping historical page finding; no new broken image reproduced.                                                | Same acceptance limit as preceding row.                                                                                                                          |
| External 3XX redirect / 1                          | Current homepage has **two** redirecting unique hrefs: `https://rentifynow.com` → `/pl/` (200); LinkedIn slash URL → slashless URL (999 bot refusal). [Target receipt](evidence/redirect-targets.json). | Existing product root and real personal identity links. Current count is not the old crawl count.                                                                                  | Locale redirect is intentional. LinkedIn normalization/bot serving is external; terminal public content unverified. | Preserve locale-neutral product URL and real identity; do not switch an English portfolio permanently to a Polish landing page or infer a source 502/TLS defect. |

Robots is 200 text/plain, allows public crawling and points to the 200 XML sitemap containing
only the HTTPS canonical. A deliberately unknown path returns 404. HTML Cache-Control includes
`no-transform`; the direct mailto is retained and no broken email-protection endpoint appears.
Every other sampled outgoing unique URL returned 200; this is reachability, not those products'
functional QA. No account, native, deployment, indexing or outreach action was performed.

## Independent source corrections

1. **Manifest metadata:** current public `/manifest.json` and main use the misspelled icon key
   `types`. The [W3C manifest icon example](https://www.w3.org/TR/appmanifest/#icons-member)
   uses `type` as the MIME hint. The ICO directory contains one 256×256 image, while the manifest
   advertises 64/32/24/16-pixel images that are absent. Correct the key and advertise the actual
   256×256 size without replacing the existing favicon.
   This is a small independent metadata defect, not a cause proven for the four historical badges
   and not evidence of failed installation or a DR benefit.
2. **Discovery coverage:** extend the maintained no-JavaScript Playwright journey to request
   icon/preload/social-preview references as well as visible images/styles. Verify manifest
   icons have an image MIME declaration, return nonempty image responses, and declare dimensions
   actually present in the ICO directory. These checks run
   against the local build; absolute portfolio metadata URLs map to local asset paths.
3. **Install gate:** clean `npm ci --include=dev` at current main fails ERESOLVE: ESLint 10.13.0
   introduced by [#65](https://github.com/doifynow/bartoszlitwa.github.io/pull/65) exceeds
   `eslint-plugin-jsx-a11y@6.10.2`'s declared ESLint 3–9 peer range. Restore ESLint 9.39.5 and
   its pre-#65 dependency graph, preserving accessibility linting and strict install semantics.
   No `--force`, legacy-peer-deps, integrity bypass, disabled lint rules or hook bypass is used.
   A future coordinated lint-toolchain upgrade remains separate from this scoped repair.
4. **React runtime pair:** after the install repair, all three maintained unit suites fail
   before collecting tests because React 19.3.1 and React DOM 19.3.0 differ. The React-only
   update in [#69](https://github.com/doifynow/bartoszlitwa.github.io/pull/69) introduced this
   mismatch. Update React DOM to 19.3.1, whose published peer dependency is React ^19.3.1.
   `npm ls react react-dom --depth=0` then confirms both installed versions match. The only
   additional package-version change relative to the pre-#65 graph is React DOM 19.3.0 → 19.3.1.
   This repairs a reproduced test/runtime compatibility failure; it does not prove that the
   currently served older immutable HTML had that failure.

## Verification and acceptance

Detailed local outcomes are retained in [verification evidence](evidence/verification.json).
Dependency installation, formatting, lint, typecheck, unit/coverage, build, container, browser,
audit, CI and runtime are separate surfaces. The maintained full gate is attempted after the
install repair; environment blockers are not called passing checks. There is no visible page
change: manifest metadata and build dependencies use source diff, HTTP receipts and tests as
the nonvisual evidence substitute permitted by publish-review-artifact. No screenshot/video
is created, and no NAS upload or visual acceptance is claimed.

New PRs must be linked to originating T3 thread `mcp:c4f0dbe0-d5e9-4e10-8e2a-ea2fcc2e6e44`.
Exact PR/head, review gates, CI, persisted head deadline, merge and retirement are recorded in
task state `/home/t3code/.local/state/codex/litwa-ahrefs-delta-20261022/` and the originating
thread. Source merge does not deploy the manifest or prove a fresh Ahrefs result. If current
public bytes remain old after merge, classify that as rollout pending; do not create another
manifest patch. Any owner-only rollout gap is deduplicated and filed after merge.

The [30-day editorial plan](EDITORIAL-PLAN.md) reuses existing implementation evidence and real
public identity. No new tool, worksheet, comparison page or generic promotional landing page
is built. No exact broken inbound target was supplied or observed; a fabricated recovery route
would be unsupported. Root owns further authenticated backlink detail and future DR measurement.
