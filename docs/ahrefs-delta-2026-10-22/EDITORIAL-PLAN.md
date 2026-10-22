# Litwa earned editorial links — 30-day plan

Prepared 22 October 2026. Window: **23 October–21 November 2026**. All pitches below are
**unsent drafts**. Bartosz owns editorial decisions and any future authorized communication;
the portfolio integration owner supplies source evidence. Nothing here schedules sends,
publishes articles, creates accounts, buys placements or promises a DR target.

## Baseline, asset fit and deduplication

Root's authenticated 22 October baseline is **DR 6; backlinks "748"; referring domains "696"**.
No increase was observed. Root later supplied a selected first-50 referring-domain sample,
ordered by DR descending: **47 rows carry Ahrefs' literal SPAM label**, including
`buybacklinks.agency` and `bunero.shop`. This is not a population percentage. Those examples
are excluded from acquisition prospects; do not buy similar links or automatically disavow them.
Exact existing editorial referring domains, lost-link target URLs,
competitor DR and competitor backlink counts are **unavailable**. Do not call a prospect a
new referring domain until root compares it with the real backlink inventory. Do not infer
spam from the baseline, disavow links automatically, or count owned portfolio links as
independent editorial acquisition. [Ahrefs' definition](https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr)
supports measuring relevant independent sources alongside this relative score, rather than
equating a technical merge with authority growth.

Inspected assets at current main:

- [Portfolio](https://litwa.dev/): readable initial English HTML, real builder identity,
  product stages, professional history, certificate text and downloadable CV. Public GETs
  verify its resources; this is an attribution/context destination, not an original tutorial.
- [Existing prerender implementation](https://github.com/doifynow/bartoszlitwa.github.io/blob/7b04cd1c867c9cac099308af8c88c71d91f80538/scripts/prerender.mjs):
  renders actual lazy React sections and loads their CSS into static HTML without adding a
  server. Reuse it with the [existing discovery journey](https://github.com/doifynow/bartoszlitwa.github.io/blob/7b04cd1c867c9cac099308af8c88c71d91f80538/tests/e2e/discovery.spec.ts).
  The implementation is inspectable, but it is not a general-purpose package or benchmark.
- [Email preservation evidence](../ahrefs-round2-2026-10-21/EMAIL-LINK-FOLLOWUP.md) and
  [badge serving evidence](../ahrefs-round2-2026-10-21/CREDLY-FOLLOWUP.md): distinct, documented
  examples of valid source being insufficient for crawler delivery. Reuse the receipts;
  remove operational paths from any external article and explain the limits of the examples.

No tracked portfolio outreach/promotion pack was found by the 22 October Markdown search.
This is not proof no private draft exists. Before a send, deduplicate with the original growth
owner by **publication/domain + angle + asset URL**; keep one owner and one live pitch per
angle. Preserve Post #499 and House #545/#546 owners and assets. Do not expand their work here.
Stripe Directory CLI and writing-style retrieval tools are unavailable in this worker; current
primary editorial pages supply the prospect evidence. No retrieved personal writing style is
claimed. English drafts follow this task's direct, technical tone.

## Prioritized prospects

All URLs below were researched on 22 October. Editorial interest, acceptance, eventual link
destination/attributes and referral volume are unverified. No prospect DR/count is invented.
The audiences and angle fits are explicit inferences from the linked primary pages.

| Priority / prospect page                                                                                                                                        | Audience and asset fit                                                                                                                                                                       | Original value offered / route                                                                                                                                                                                                                    | Effort / owner / evidence                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1 — [Smashing writing guidelines](https://www.smashingmagazine.com/write-for-us/) and [editorial process](https://www.smashingmagazine.com/editorial-process/) | Professional frontend developers; practical project case studies are an accepted format. Existing prerender code is a concrete example of getting lazy content and CSS into initial HTML.    | Exclusive, technically reviewed case study with reproducible no-JS checks and explicit hydration/mounting limits. Start with an outline through the documented contact form; Bartosz must submit as the author. No product tour or required link. | 6–8 h outline/draft + 1–2 h review. Bartosz: editorial owner; portfolio owner: reproduction. Current primary guidelines request an outline and original work. Draft A below.                                                            |
| P1 — [React Status issue 493](https://react.statuscode.com/issues/493) and [Cooperpress editorial contact](https://cooperpress.com/contact/)                    | React developers; issue 493 includes independent technical explanations and tools. Fit is the actual lazy-rendering implementation and a useful explanation, not the company homepage alone. | Short resource tip after an original explanation is public/accepted for promotion. Use the documented editorial route, not advertising. Suggest code plus a concise explanation of the failure mode.                                              | 1–2 h evidence summary after the article gate. Bartosz owns any future send; portfolio owner checks URLs. Draft B below. The publisher may link only to GitHub; that earns no `litwa.dev` referring domain.                             |
| P2 — [CSS-Tricks guest writing](https://css-tricks.com/guest-writing/)                                                                                          | Frontend practitioners; a distinct CSS-delivery lesson from code-split lazy sections fits instructional, experience-based writing.                                                           | Separate outline about ensuring lazy-section styles reach non-JS HTML, or fallback venue after an explicit Smashing decline/withdrawal. Never offer the same exclusive piece simultaneously.                                                      | 4–6 h outline/demo review. Bartosz owns any future application. Search retrieved the primary page, but direct fetch returned **403** on 22 October: reverify its application route and current policy before submission. Draft C below. |
| Hold — [This Week In React archive](https://thisweekinreact.com/newsletter)                                                                                     | React ecosystem coverage makes the subject plausible. Archive is current; a documented unpaid editorial submission route was not established.                                                | Research-only reserve. Do not use its sponsorship route as a link-acquisition shortcut. No send-ready contact is invented.                                                                                                                        | At most 30 min route verification; Bartosz decides whether to pursue. Excluded from the active three-prospect queue.                                                                                                                    |

These are three active publication prospects, not three earned links or a verified count of
unique referring domains. Cooperpress publications share an editorial owner and are one queue;
do not pitch JavaScript Weekly and React Status separately for the same item. A natural,
editor-controlled author/profile link to `https://litwa.dev/` can provide useful context.
Never condition publication on followed attribution or request reciprocal links.

## Draft A — Smashing outline proposal

Subject: Case study: making lazy React sections readable before JavaScript

Hello Smashing editorial team,

I would like to propose a practical case study for frontend developers maintaining a small
React/Vite site. On my portfolio, lazy sections were present for browser users but missing
from the initial document. The existing build now renders the actual components and includes
the CSS those sections need. The implementation and no-JavaScript checks are public in
the [repository](https://github.com/doifynow/bartoszlitwa.github.io).

The article would cover four parts. First, inspect the raw response and show why a working
interactive page does not establish that its content is available before JavaScript. Second,
follow the build-time rendering of lazy components, including waiting for their content and
collecting styles from Vite's manifest. Third, test headings, fragment destinations, local
assets and contact links with JavaScript disabled. Fourth, explain the limits: the browser
still mounts the interactive application, client preferences remain separate, and a successful
build does not prove the CDN serves the same bytes.

Readers would leave with a reproducible way to inspect their own static output and decide
whether a small build-time step fits their site. I would include source excerpts and clearly
dated response evidence, without presenting crawl scores as ranking gains or turning the
piece into a product promotion. My [portfolio](https://litwa.dev/) identifies the project and
my work. Would this outline fit your editorial scope?

Bartosz

## Draft B — React Status resource tip

Subject: React resource: checking lazy sections before JavaScript

Hello React Status editors,

I have a small React/Vite example that may be useful to readers maintaining static sites:
the build waits for lazy sections, renders the real components and includes their CSS. The
public [implementation](https://github.com/doifynow/bartoszlitwa.github.io/blob/main/scripts/prerender.mjs)
and [discovery checks](https://github.com/doifynow/bartoszlitwa.github.io/blob/main/tests/e2e/discovery.spec.ts)
show how it is verified without JavaScript. It also illustrates why source output and CDN
delivery need separate checks. My [portfolio](https://litwa.dev/) is the running example.

If the explanation is useful for an issue, I can supply a short technical summary with the
reproduction steps. There is no benchmark or ranking claim attached.

Bartosz

Gate: attach the accepted/published explanatory article URL before considering this tip
ready for a future authorized send. Do not pretend that an unwritten article already exists.

## Draft C — CSS-Tricks outline

Subject: Outline: keeping lazy-section CSS in prerendered HTML

Hello CSS-Tricks editorial team,

I would like to write about a specific static-output problem: rendering a lazy React section
is only half the job if its separate CSS chunk is still loaded by JavaScript. My portfolio's
existing build collects those styles from Vite's manifest and puts them in the initial document.

The proposed outline would show the failure in raw HTML, trace the CSS references through
the build manifest, then verify the page with JavaScript disabled. It would explain which
requests belong to the rendered document and where build evidence stops short of proving
production delivery. The [source](https://github.com/doifynow/bartoszlitwa.github.io/blob/main/scripts/prerender.mjs)
and test journey are available for review. I can develop a focused explanation around this
case without presenting it as a universal rendering strategy.

Bartosz

Gate: reverify the currently blocked application page. Keep this angle distinct from Draft A;
if it overlaps, wait for a decline/withdrawal and adapt the piece rather than duplicate it.

## Calendar, decisions and measurement

| Dates / days        | Work and evidence                                                                                                                                                                                        | Owner / effort                                                        | Exit condition                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Oct 23–25 / 1–3     | Compare the three domains against root's real referring-domain/lost-link export when supplied; deduplicate private growth drafts. Record any legitimate inbound target before proposing redirects.       | Portfolio integration owner + root, 1–2 h.                            | Domain/angle/owner dedupe and dated inventory. Missing export stays unavailable; no invented lost-link reclamation. |
| Oct 26–29 / 4–7     | Review Draft A against existing source/receipts. Prepare its original outline and minimal reproducible snippets; exclude score claims and operational details.                                           | Bartosz + portfolio owner, 3–4 h.                                     | Human-reviewed outline and source links. No new generic tool or landing page.                                       |
| Oct 30–Nov 2 / 8–11 | Bartosz decides whether to authorize an editorial proposal. If authorized later, submit one outline through the documented route. Otherwise keep drafts unsent.                                          | Bartosz, 30–45 min decision; sending is outside this task.            | Record actual send only if it happens; retain requested exclusivity.                                                |
| Nov 3–8 / 12–17     | Respond to actual editorial feedback only with future authorization; prepare the useful explanation. Keep CSS-Tricks as a distinct angle or declined-piece fallback.                                     | Bartosz, 4–6 h if accepted.                                           | Accepted outline or documented no-response/decline; no automated follow-ups.                                        |
| Nov 9–14 / 18–23    | Once an explanation is public, review Draft B for one targeted React Status tip. Reverify CSS-Tricks only if needed.                                                                                     | Bartosz + portfolio owner, 1–2 h; any send requires later authority.  | Real explanatory URL and verified recipient route. No purchased/sponsored placement.                                |
| Nov 15–21 / 24–30   | Inspect any actual published source page and destination, editorial context, link attributes and referring domain. Compare the same Ahrefs scope with baseline; record referral engagement if available. | Root supplies authenticated metrics; Bartosz reviews outcomes, 1–2 h. | Dated report of actual links, useful visits, replies and DR. Zero/new/unavailable are valid outcomes.               |

Measurement rows should record observation date, source page URL, publication/registrable domain,
editorial owner, destination URL, rel attributes, already-present domain, outreach status,
referral sessions/meaningful actions where consented analytics supports them, and evidence URL.
Count new independent domains only after checking the real baseline and actual live link.
Use existing analytics read access if available; do not add tracking/provider configuration.
The primary success signal is relevant editorial interest and useful referrals. DR remains a
dated secondary observation; it may not change within this window and no result is guaranteed.
