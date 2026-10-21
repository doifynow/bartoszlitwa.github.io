# Certificate badge availability follow-up — 21 October 2026

Root's completed Ahrefs crawl `21-10-2026T041153P0200` (02:11:53 UTC) reported health 96,
up from 88, with one internal page error referring to four external badge images. These are
dated root-owned observations, not new acceptance claims by this worker. Root's Mac evidence
files are `final-crawl-captures.json` and `final-crawl-drilldowns.json`; their contents/hashes
were not independently available here. The exact four URLs supplied by root are all covered below.
PR60 and email-link PR61 remain merged historical work, with their source/evidence preserved.

## Identity and complete row coverage

Recreated task worktree `/home/t3code/.t3/worktrees/bartoszlitwa.github.io/codex-ahrefs-round2-20261021`
and branch `codex/ahrefs-round2-20261021` were clean and matched freshly fetched main
`7f0f1a0b2fe8743be130b9ac0a43d5ce7f9a9b9c`. No applicable scoped AGENTS, open PR or competing
active project thread was found. Fleet ancestor instructions, README, card/data/type source,
nearby tests and delivery/evidence skills were inspected. Primary checkout and historical work
were preserved. This thread is the sole writer; no peer or additional thread was started.

Exact implementation revision: `28c8560690a0c374a1acff2d9f4ac7579d45c802`. Subsequent documentation
commits do not change tested behavior. The final PR head/deadline/status is retained in task state.

All four rows share homepage referrer `https://litwa.dev/`, issue
`c0e87084-feaf-11e8-8c05-001e67ed4657`, filter `c7bd3d737800c382ec57c0adace75595`,
root drilldown “Showing 4 of 4”, and observed crawl HTTP403 text/html. Source is the corresponding
`badgeUrl` property in `src/data/certifications.json`.

| Certificate | Exact affected image URL                                                                                                   | Source disposition                                                            |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| AZ-900      | `https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png`                             | **fixed**: remove hotlink; render existing neutral code fallback immediately. |
| AI-900      | `https://images.credly.com/size/340x340/images/4136ced8-75d5-4afb-8677-40b6236e2672/azure-ai-fundamentals-600x600.png`     | **fixed**: same change for this explicit row.                                 |
| DP-900      | `https://images.credly.com/size/340x340/images/70eb1e3f-d4de-4377-a062-b20fb29594ea/azure-data-fundamentals-600x600.png`   | **fixed**: same change for this explicit row.                                 |
| AZ-204      | `https://images.credly.com/size/340x340/images/63316b60-f62d-4e51-aacc-c23cb850089c/azure-developer-associate-600x600.png` | **fixed**: same change for this explicit row.                                 |

Independent worker GETs at 02:20:58 UTC returned200 image/png for all four URLs; see
[HTTP receipt](evidence/credly/http-before.json). This differs from the crawler's observed403s.
It does not invalidate root's capture or establish reliable bot availability. No provider setting,
request spoofing, credential or crawler configuration was changed to hide the finding.

## Cause and smallest correction

Previously all four cards emitted external img requests in initial prerendered HTML. The existing
React error handler replaced failed images with a neutral text code only after the request failed;
it could not prevent a crawler reporting403. No existing local certificate badge/equivalent artwork
or licensing evidence was found in repository assets, so no third-party image was downloaded,
copied, invented or relabeled as a certificate.

Remove only the four unavailable badge sources, make `badgeUrl` optional and render the existing
52×52 styled code fallback when no badge exists. Preserve the established image-error behavior
for future available sources. No CSS, locale copy, issuer, certificate name, date, status, skills,
description, category, schema or contact/navigation route is changed. All four `credentialUrl`
values were already `#`, not real verification links; those values remain unchanged and no new
verification claim/link is fabricated. No real verification destination is removed.

Source/body design direction remains the existing compact two-column desktop/one-column mobile
certificate list. The same neutral fallback, typography, sizes and spacing already used after
image errors now appear immediately, including without JavaScript. Changed screen: only the four
certificate cards on `/` at `#certifications`; no screen is added or deleted.

## Verification and visual-proof gap

- Clean `npm ci --include=dev`: pass, existing lockfile/Vite8.3.4 unchanged.
- `CI=1 npm run check`: formatting, ESLint, strict TypeScript,18 unit tests across3 files,
  coverage thresholds and maintained production/prerender build pass. Coverage:80.88% statements,
  60.86% branches,80% functions,85.42% lines. Full command then fails at Nginx verification:
  `/var/run/docker.sock` absent. No test container starts; browser E2E is not reached locally.
- `npm run audit`: pass, zero vulnerabilities. Required CI remains authoritative for fresh runtime
  and browser execution; this local full gate is not called green and timed fallback is ineligible.
- New EN/PL component regressions render all actual cards, require no img elements and retain
  names, provider, code fallback and date attributes. Existing no-JavaScript browser regression
  now checks four fallback cards, zero certificate img elements and no Credly URL in initial HTML.
- [Built-output receipt](evidence/credly/build.json): SHA256
  `7db707f9494872fe68b00c2c61a35750891837e29c23b86ad3f0a39b06a9bff2`,43,699 bytes;
  four fallback cards, one H1 and no Credly URL in HTML or emitted JavaScript. A full certificate
  data comparison proves every field except the four badgeUrl values unchanged. Diff reviewed.
- **Focused visual proof is blocked/unverified**, covering the actual four cards at desktop and
  mobile. T3 preview_status was unavailable; preview_open failed with missing libatk, ATK bridge,
  Xcomposite/Xdamage/Xfixes/Xrandr, GBM, ALSA and AT-SPI libraries. This worker also lacks
  `~/.config/fleet-evidence/config.json` and the provisioned evidence Python environment;
  uploader status returned `Evidence operation failed (ValueError)`. No host package/access
  changes were made. The originating chat requests root's existing capture/publishing route.
  No screenshot/video was fabricated; no local-only image is presented as NAS evidence. Existing
  NAS media is preserved. Built markup/component tests substitute technically while visual
  acceptance remains explicitly outstanding. This small card-only fix uses the focused-capture
  exception; a broad site workflow video would add no useful coverage.

## Delivery and remaining owner action

New task-only non-draft PR targets main and is associated with originating T3 thread
`mcp:01309732-81b9-4cbc-94b7-3cd66b6691a0`; PR60/61 are not reopened. Exact final head, PR URL,
creation/head-based30-minute deadline, watch status, review/CI gates and cleanup are recorded
outside the temporary worktree under worker task-state `credly/` and returned in this chat.
Local environment blockers do not satisfy the timed fallback. Never merge known failure or
describe pending/skipped checks as passed. No deployment/provider/crawler action is authorized here.

Root: capture the actual certificate section from this immutable build at desktop/mobile and
publish/retrieve the focused screenshots through the existing NAS evidence route. Substitute
claims/tests do not establish visual acceptance. After normal source merge, root owns authorized
runtime rollout and fresh rendered/HTTP/Ahrefs acceptance. Check four readable text cards, all
existing facts/navigation/identity, zero emitted Credly image requests and preserved mailto/
no-transform/unknown404 semantics. Retain the prior immutable deployment as rollback and restore
it through the normal owner-controlled path if those health checks regress. No score clearance
or production repair is claimed from source/CI alone. Cleanup removes only the exact clean task
worktree and merged local branch after merge and no remaining source follow-up, preserving evidence.
