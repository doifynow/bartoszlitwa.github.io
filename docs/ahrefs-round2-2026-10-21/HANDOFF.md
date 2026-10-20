# Litwa Ahrefs round 2 — 21 October 2026 assignment

The current live homepage already exposes PR59's prerendered content and factual product schema.
This round adds the verified official GitHub profile and existing public logo to the DoifyNow Organization node.
It also updates Vite8.3.2 to8.3.4, with its PostCSS/nanoid patch dependencies, because newly
published advisories made the mandatory audit fail. No deployment/provider/Ahrefs mutation occurred.
The coordinating Mac thread owns portfolio integration and authenticated crawl acceptance.

## Identity and verified inputs

- Repository: `doifynow/bartoszlitwa.github.io`; scope: `https://litwa.dev/`; Ahrefs10563823.
- Fetched base: `df5f4327d81b76944b43f6eea3fd9067d3344474`; clean assigned task worktree
  `/home/t3code/.t3/worktrees/bartoszlitwa.github.io/codex-ahrefs-round2-20261021`, branch
  `codex/ahrefs-round2-20261021`. No unique commits/upstream existed at inspection.
- Exact implementation revision: `d2a482acf08fdf78c5dfdd3427c65de598c1891c`. Later task commits
  document evidence only. Resolve the final delivery head/CI through this branch's PR.
- Prior [PR59](https://github.com/doifynow/bartoszlitwa.github.io/pull/59) is merged at base above;
  head `ecd384d865bfed8946a0cea39d6ce35fd6adc918`, implementation
  `6afd9ace4284b5b4863fb388a6021099d926dd05`. Existing source/route contracts are preserved.
- Read Fleet ancestor AGENTS, README, deployment guide, complete packet/previous handoff and
  repository-inspection, safe-git-sync, test-verification, worktree-delivery, babysit-pr and
  infrastructure-triage skills. No scoped AGENTS exists in the task checkout.
- No open PRs or competing unsettled project threads were found initially or before source edits.
  Stale frontend/catalog branches overlap App/navigation/ecosystem; `codex/fix-light-theme-logo`
  changes Footer/NavBar CSS. None was touched; the separate primary checkout was preserved.
- Packet (47,602 bytes) verified SHA256:
  `2775b2508c981d6f7e7a09d85be6c66646a8bc4e0dcfaea4fa2205f456d3afa0`.
- Historical internal CSV (8 data rows,33 columns,1,797 bytes):
  `dbe7a692c1238b169516b80883a233d05149fae64f7776b04e29a5fd4fcd2252`.
- Historical links CSV (8 data rows,15 columns,1,108 bytes):
  `03d1d7f792f08e404e0fa9ee9d692f5c9fcc5df7937bebd46b8d53d03a8906f1`.
  Parsed CSV records preserve the multiline robots field. Exact inputs remain in worker task state
  `/home/t3code/.local/state/codex/ahrefs-round2-20261021/bartoszlitwa.github.io/evidence/`;
  original CSVs are also retained in the prior repository handoff evidence.

## Complete issue ledger

Every row below uses completed crawl `20-10-2026T234347P0200` (2026-10-20 21:43:47 UTC):
8 issue types,11 reported occurrences;1 error,4 warning types,3 notice types. Health88 is a dated
observation, not a new result. Historical crawl `20-10-2026T194244P0200` was17:42:44 UTC.
Email `1a15a68a92fc39ba` repeats the baseline eight types/11 occurrences and creates no new issue.
The supplied live sample was22:01:03 UTC; our subsequent GET batch completed22:09:13 UTC.

All source dispositions refer to the exact implementation revision above. Fixed means changed
and locally verified; already fixed means existing behavior verified. Neither claims recrawl
acceptance. Intentional means a supported canonical/identity choice. Fresh exact drilldown is
supplied only for the outgoing-link issue; other URL mappings use explicit historical rows,
previous handoff and current HTTP. Missing fresh validator/node/property details stay unverified.

| Issue / severity / count / section                                                             | URL coverage and current evidence                                                                                                                                                                                                                           | Disposition / action                                                                                                                                                                                                                                                                                                                                                                           | Verification and remaining owner                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Organization schema missing or incomplete / notice /1 / AI Discoverability MACHINE READABILITY | Homepage DoifyNow Organization already has name,url,description,founder. The public GitHub Organization identifies itself as DoifyNow and its blog links to `https://doifynow.com/`. See [public organization evidence](evidence/github-organization.json). | **fixed** supported sameAs/logo omissions: add `https://github.com/doifynow` and the existing public `https://litwa.dev/product-icons/doifynow.png` to DoifyNow Organization. The logo is displayed by Ecosystem from src/data/products.json, visually inspected,512×512 and200 image/png with exact source bytes. Personal sameAs stays on Person. No invented logo, entity, offer or rating. | Built graph assertion passes; browser regression requires sameAs on Organization. Live still lacks these new properties. Mac coordinator: authorized rollout and fresh exact node/property drilldown; overall heuristic may persist. |
| Page has no outgoing links / error /1 / Links INDEXABLE                                        | Fresh exact row: `https://litwa.dev/`, dated zero outlinks. Current raw HTML has37 href anchors and all fragment destinations.                                                                                                                              | **already fixed** by PR59. Preserve existing prerender rather than rewriting it.                                                                                                                                                                                                                                                                                                               | Local build37 anchors; pre-change public HTML exactly matches base build after bounded Cloudflare normalization. Coordinator: recrawl.                                                                                               |
| H1 tag missing or empty / warning /1 / Content INDEXABLE                                       | Homepage, historical URL1 and supplied sample. Current raw HTML and build each have one real H1.                                                                                                                                                            | **already fixed** by PR59. No new copy/headings.                                                                                                                                                                                                                                                                                                                                               | Raw parser and prerender assertions pass. Coordinator: fresh H1 drilldown.                                                                                                                                                           |
| Low word count / warning /1 / Content INDEXABLE                                                | Homepage, historical URL1 observed15 words. Build has717 existing main words; live718 because Cloudflare replaces the one-token email with two-token `[email protected]`.                                                                                   | **already fixed** by PR59. Actual hero/products/career/certifications/contact are in initial HTML; no padding.                                                                                                                                                                                                                                                                                 | Full existing content verified. Coordinator: recrawl; arbitrary word-count threshold acceptance unverified.                                                                                                                          |
| Structured data has Google rich results validation error / notice /1 / Other                   | Homepage. Prior exact evidence identified DeployifyNow SoftwareApplication lacking offers/review/rating. Current source/live graph has eight Thing entries, no unsupported claims. Fresh validator message not supplied.                                    | **already fixed** by PR59 for the supported prior defect; preserve truthful identity/product facts.                                                                                                                                                                                                                                                                                            | Source/live JSON-LD match at base; final output assertion rejects SoftwareApplication. Fresh Google/Ahrefs validator acceptance remains **unverified**, owned by coordinator.                                                        |
| Redirected page has no incoming internal links / warning /1 / Links INDEXABLE                  | Canonical homepage is sole indexable HTML page. Historical URL1; link2/3/5 redirect to it; link6 self canonical. Root/hash site has no second HTML page.                                                                                                    | **intentional** one-page topology. Do not add alias links or filler pages.                                                                                                                                                                                                                                                                                                                     | Current fragment targets valid; historical mapping explicit. Fresh exact row context unverified; coordinator accepts topology.                                                                                                       |
| 3XX redirect / warning /3 / Redirects                                                          | `http://litwa.dev/`, `https://www.litwa.dev/`, `http://www.litwa.dev/`: historical URL4/5/6, link5/2/3. Each currently301 directly to canonical HTTPS200.                                                                                                   | **intentional** host/security normalization. No chain or loop in sampled routes.                                                                                                                                                                                                                                                                                                               | Unfollowed GET Location/status checks. Coordinator preserves policy.                                                                                                                                                                 |
| HTTP to HTTPS redirect / notice /2 / Redirects                                                 | `http://litwa.dev/`, `http://www.litwa.dev/`; URL4/6. Subset of preceding group, not new URL records.                                                                                                                                                       | **intentional** direct HTTPS redirects.                                                                                                                                                                                                                                                                                                                                                        | Both301 direct to canonical200. No provider change justified.                                                                                                                                                                        |

Totals: **1 fixed type/1 occurrence,4 already-fixed types/4 occurrences,3 intentional types/6
occurrences**. No issue type or export row is omitted. No captured issue is labeled blocked;
missing fresh drilldown details, authenticated recrawl and production rollout of this new sameAs
remain unverified. Do not infer a new score or that all Organization heuristic properties are met.

## Every historical CSV row and edge

| URL row | Exact URL                                     | Current observation / disposition                                                                                                                                     |
| ------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1       | `https://litwa.dev/`                          | 200 text/html,canonical self,EN,one H1,37 anchors,factual JSON-LD. Existing content already fixed.                                                                    |
| 2       | `https://litwa.dev/assets/index-CH4YxfMw.js`  | 200 application/javascript; historical cached fingerprint, not HTML. Current base entry `/assets/index-CrAWbCxe.js` also200 and exact build bytes. Intentional asset. |
| 3       | `https://litwa.dev/assets/index-Cb7Wq3tL.css` | 200 text/css; exact build bytes. Intentional asset.                                                                                                                   |
| 4       | `http://litwa.dev/`                           | Direct301 to canonical HTTPS. Intentional.                                                                                                                            |
| 5       | `https://www.litwa.dev/`                      | Direct301 to canonical HTTPS. Intentional.                                                                                                                            |
| 6       | `http://www.litwa.dev/`                       | Direct301 to canonical HTTPS. Intentional.                                                                                                                            |
| 7       | `https://litwa.dev/sitemap.xml`               | 200 text/xml; XML parses,only loc canonical public200 root; body equals source. Already correct.                                                                      |
| 8       | `https://litwa.dev/robots.txt`                | 200 text/plain; User-agent *,Allow /,canonical Sitemap. Already correct.                                                                                              |

Link rows1–8 respectively: sitemap→root;www HTTPS redirect;www HTTP redirect;historical JavaScript;
apex HTTP redirect;self canonical;`https://analytics.doifynow.com/script.js` historically blocked by
third-party robots;CSS. All edges preserved. Analytics is a script resource, not an outgoing content
href; bot restriction is intentional, with no provider/privacy change justified. No OAuth/private
route exists here or was index-enabled.

Unknown `/ahrefs-round2-missing-20261021`, its slash form, `/en/` and `/pl/` each return true404 HTML
(146-byte Nginx error body), not a200 app shell. Language remains root client state; no invented
hreflang/routes. CV is200 application/pdf and exact build bytes. Cloudflare now transforms source
mailto into an email-protection anchor and decoder; this is an observed provider transformation,
not a source change. All fragments resolve. Current HTTP details: [GET records](evidence/current-http.json).

## Build/export versus live identity

`npm run build` already runs typecheck,Vite and `scripts/prerender.mjs`; the renderer waits for lazy
React content and includes section CSS. Docker runs that command and copies `/app/build` to Nginx.
Pages uses predeploy→build then `gh-pages -d build`. `.dockerignore` preserves renderer/source.
CI validates rather than deploying. No checked-in artifact-wiring defect was found.

At exact base `df5f4327d81b76944b43f6eea3fd9067d3344474`, built index was43,711 bytes,SHA256
`fa7939212d67069a1128db4302e50ee6fe61ff55e18e09611286d928e9a0d291`. Public index was43,962
bytes,SHA256 `7c23bc4c6aa20044f1e0e8ca64981335d432f14fdc2467cbe832e20fc24a53e9`.
Reverse only the public Cloudflare email anchor/span and remove its decoder and the documents are
byte-for-byte identical. [Normalization receipt](evidence/edge-normalization.json) and
[21 local resource comparisons](evidence/asset-comparison.json) show exact content matches and proper
200 resource types. This establishes current main-output identity, not origin image/deployment SHA.

Live root reports Cloudflare,DYNAMIC,no-cache/no-store/must-revalidate,Last-Modified
`Tue,20 Oct 2026 22:04:46 GMT`, newer than the supplied22:01 empty-shell sample. Header time is an
observation, not a deployment audit trail. Read-only Pages API reports legacy gh-pages root with
cname www.litwa.dev; that branch is stale `b52db16a6f7f68f6ff874987da7a0e0fc5a62bf1` (February25)
and contains a different older app. Current public output matches main build rather than that branch.
Exact serving host/image digest/source-SHA label remain unverified: documented read-only
`ssh -o BatchMode=yes dokploy-debug help` failed `Could not resolve hostname dokploy-debug:
Temporary failure in name resolution`. No access/SSH/provider setting was changed.

Final implementation build index:43,834 bytes,SHA256
`87cfa900627b515e4b7764b8f653b310b221ac65acf10e961ae029a7eb286429`;
[build receipt](evidence/final-build.json) verifies Organization sameAs/logo,unchanged Person profiles,
one H1,37 anchors and no SoftwareApplication. New sameAs/logo are not claimed live.

## Checks, visual coverage and release limits

The full local gate below ran on source implementation `d75e12ffa58af19a97591d1c8e20a823d6795c51`.
The subsequent logo-only metadata/test addition at `d2a482acf08fdf78c5dfdd3427c65de598c1891c`
passed a fresh maintained build/typecheck, focused graph/resource assertions and formatting.
Unchanged lint/unit/coverage/audit evidence is reused; no broader suite rerun was needed:

- Clean `npm ci --include=dev`: pass; Node22.23.3/npm10.9.9.
- `CI=1 npm run check`: Prettier,ESLint,strict TypeScript,16 unit tests,coverage and maintained
  production/prerender build pass. Coverage: statements80.24%,branches59.77%,functions80.21%,lines84.85%.
  Gate then fails at Nginx verification because `/var/run/docker.sock` is absent. This is an
  environment blocker; no assertion/hook/check was removed or weakened. E2E phase was not reached.
- Browser blocker independently confirmed: T3 preview open reports missing `libatk-1.0.so.0`.
  Expected Playwright Chromium1243 is absent; available1248 also fails loading that library.
  No host package/access changes were made. Fresh rendered-browser acceptance is unverified.
- Required `npm run audit`: pass,zero vulnerabilities after Vite8.3.4. Initial locked8.3.2 failed
  GHSA-587h-7wmj-h5pm(high),GHSA-698v-4r3x-3vcv and GHSA-r825-w8mm-5pxw. npm10's lock update
  crashed in Arborist; npm11 generated the valid lock,then normal npm10 ci passed. Only Vite,
  PostCSS and nanoid patch versions changed; unrelated metadata key reordering was removed.
- Focused final built-graph assertions pass. Existing browser regression now requires official
  sameAs on Organization. Fresh final-head CI must exercise it and Nginx before normal merge;
  local full gate is not described as green. Pending-CI fallback cannot use these blocked local gates.
- Existing base CI/container runs passed at df5f432:
  [CI](https://github.com/doifynow/bartoszlitwa.github.io/actions/runs/39496748164),
  [container](https://github.com/doifynow/bartoszlitwa.github.io/actions/runs/39496748204).
  They are historical/base proof,not final-head checks or production rollout proof.
- No visible screen,copy,layout or workflow changes: new metadata/dependency changes use graph,
  build and diff evidence. No new screenshots/video generated or claimed. Prior PR59 captures
  remain historical: [desktop](https://truenas-vm.tail341687.ts.net:8446/artifacts/fleet-agent-t3code/10320714eb384e1bb9fb0353c2f871b7/litwa-ahrefs-remediation-after-no-javascript-desktop.png),
  [mobile](https://truenas-vm.tail341687.ts.net:8446/artifacts/fleet-agent-t3code/7e4abb50114041c684db7260d184a0c9/litwa-ahrefs-remediation-after-no-javascript-mobile.png),
  [18-second workflow](https://truenas-vm.tail341687.ts.net:8446/artifacts/fleet-agent-t3code/dcf3fac573cf4ebca38af8f66ddbcac9/litwa-ahrefs-remediation-no-javascript-discovery-workflow.webm).
  They were validated/published/retrieved in PR59,expire October27 and were not recaptured here.

Detailed command logs are retained under worker task state `runtime/`. Current source/tests/build,
local Docker/browser blockers,production HTTP,provider identity and recrawl are separate surfaces.

## Delivery and owner action

Task-only non-draft [PR60](https://github.com/doifynow/bartoszlitwa.github.io/pull/60) targets main and is linked to originating thread
`t3-thread://v1/mcp:01309732-81b9-4cbc-94b7-3cd66b6691a0`. GitHub CLI auth,ADMIN repo access and
ls-remote succeeded. PR URL,exact final head,creation/head-based30-minute deadline,watch registration,
fresh gates,merge SHA and cleanup readbacks are persisted in task state and the originating chat.
No early queued-check merge or pending/skipped-as-green claim is authorized. With local browser/
Docker gates blocked,wait for passing final-head required CI rather than using timed fallback.

Mac coordinator's smallest remaining action after source merge: authorize normal rollout for the
new Organization sameAs/logo,verify its graph plus preserved content/routes on the target,then run the
authenticated Ahrefs recheck and capture residual exact schema/Organization drilldowns. Existing
prerender needs no rewrite. If exact origin identity is required,use authorized read-only hosting
access to match hashes to deployment metadata. Preserve intentional redirect/single-page notices.
For a later rollout,retain the current deployment ID/image as rollback;health gate is public root
with one H1,37 anchors,factual graph,working local resources,robots/sitemap and true unknown404.
On failure,owner restores that prior immutable deployment through its normal reviewed path.

No deployment,provider/DNS/access/credential/Ahrefs change,cross-product source edit,external message,
new agent,paid service or model/account switch occurred. No task dev server/container/device/tunnel
was started. Remove only the clean task worktree/merged branch after exact-head merge;preserve this
tracked handoff,evidence and all unrelated primary/branch resources.
