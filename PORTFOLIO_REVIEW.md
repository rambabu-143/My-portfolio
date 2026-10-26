# Recruiter-focused portfolio review

Updated against the supplied Rams_Resume.pdf on 26 October 2026. Existing visual style and laptop interaction retained.

## Completed

- Replaced the downloadable resume with the supplied PDF (byte-for-byte copy).
- Rewrote the hero around production voice AI, developer tooling, and evaluated enterprise retrieval.
- Added Go, RAGAS, and DeepEval; updated Arohak contributions and the Cyepro role title.
- Featured the resume-backed GraphRAG project instead of the unrelated Firestore support bot.
- Removed unsupported setup-time and voice latency claims from the active homepage and MCP explainer.
- Added a regular Experience section on desktop, direct navigation links, a persistent resume link, keyboard skip link, and reduced-motion adjustments.

## Recommended next, in priority order

1. Add public evidence for each featured project: a sanitized code sample, architecture diagram, short recorded walkthrough, or permitted repository. Label reconstructions and illustrative demos clearly. Avoid exposing client material.
2. Add measured evaluation results when available. State the dataset size, metric, baseline, and evaluation conditions for RAGAS/DeepEval. Current copy intentionally does not invent scores or performance improvements.
3. Shorten the 320vh desktop hero after reviewing it in a browser. The laptop is distinctive, but recruiters should reach experience and projects quickly. A shorter interaction or explicit skip-to-experience link would help.
4. Add a real social preview image and a consistent professional portrait. Preview the shared link on LinkedIn to confirm the image and title display correctly.
5. Add a brief recommendation from a former manager or teammate, with their permission, emphasizing ownership and delivery.
6. Keep role availability current and make the portfolio, resume, and LinkedIn wording consistent. Confirm whether you want the public name ordered as “Rambabu Arabandi” (site) or “Arabandi Rambabu” (resume).

## Validation and limits

Production build and lint completed successfully. Existing warnings remain in src/components/iso/react/live.tsx (effect dependencies) and an ambiguous Tailwind easing utility in the navigation. The resume asset matches the supplied file exactly.

A browser preview could not be started because this environment rejects local server listeners with EPERM. Desktop/mobile visual checks and interaction checks remain necessary before publishing. Changes are local and have not been pushed or deployed.

Accessibility review used the Vercel Web Interface Guidelines: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

## Cinematic showcase refresh

The laptop keeps exactly four tabs: Code, Voice AI, GraphRAG, and MCP CLI. Scrolling raises, rotates, and brings the laptop forward while advancing through the tabs; scrolling backward reverses those choices. The bottom control bar has been removed. The four tabs inside the laptop remain clickable; keyboard left/right changes screens and Space pauses motion. Code typing and voice waveforms are retained; GraphRAG traces a highlighted route through a document graph. MCP types a terminal command and generates a file tree. Both retain soft atmospheric fog.

Project cards and case-study dialogs now use new canvas scenes: a voice orb, a document traversal scene, and a CLI terminal with generated project files. Factory/library animations are no longer imported by the homepage. The new scenes contain illustrative information and no client data.

Animation respects reduced-motion settings, pauses while offscreen or the document is hidden, and includes user-facing pause controls. Project previews pause while a case study is open.

Production build and lint passed with the existing warnings. Browser checks confirmed the homepage loads, manual laptop selection works, scrolling advances to GraphRAG and MCP, case-study dialogs open and close, and animation pause works. A 390px viewport check found no horizontal overflow. Development uses .next-dev to avoid conflicts with production builds in .next.
