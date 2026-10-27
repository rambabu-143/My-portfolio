# Portfolio Hairline studies

Three custom figures made with the installed hairline-create skill. Source: https://github.com/lucasmarkes/hairline (MIT, Lucas Marques).

- microphone: physical grille slots expand around the pointer; its rest highlight is the microphone switch. Tour: upper grille, middle, lower grille, leave.
- documents: choosing a sheet lifts nearby sheets by decreasing amounts, staggered by distance. Tour: rear sheet, middle, front, leave.
- server-kit: the case lid lifts and the nearest server cartridge rises most. Tour: registry, configuration, runtime, leave.

The portfolio uses public/hairline/runtime.js with the unchanged skill kernel. No external package, CDN or visible playback controls are required. The standalone HTML pages retain the skill's unchanged validation bench.

After editing a figure, rebuild its standalone page using the skill's build.mjs, validate it using validate.mjs, then run `node scripts/build-hairline.cjs` to update the portfolio runtime. The builder expects the Hairline skill at ~/.agents/skills/hairline-create.

## Verification

Static validators passed for all three figures; TypeScript, lint, and production build passed (existing React effect and Tailwind warnings remain).

The figures were **not looked at in a browser**: this session prohibits local server listeners (EPERM), the browser tool rejects file URLs, and the automated look tool could not install its browser dependency because shell network access is unavailable. The automated look was not completed and the tours were not judged visually.

Code review against look.md:

1. Small-size silhouette: unverified visually. Intended cues are capsule/grille/stand, offset ruled sheets/tabs, case/lid/vented cartridges.
2. Rest: microphone has a switch accent and suspension; documents are offset in height and position; server kit is partially open with stepped cartridges.
3. Falloff: microphone distance from selected grille row; document lift and delay by index distance; cartridge lift by selected-part distance.
4. Stable hit tests: microphone uses screen y, documents use precomputed rest centers, kit uses static screen bands. No moving geometry is measured.
5. Rounded solids: all bodies use rings/prism, document tabs and sockets use rounded rectangles; no vertical corners.
6. Paint order: bases first, sheets rear to front, microphone support before capsule, cartridges before lid. Occlusion still needs visual confirmation.
7. One accent: microphone switch yields to a grille row; top document yields to selected sheet; kit lid yields to selected cartridge.
8. Readout: wrapper initializes rest; figures update it and return to rest on leave. Correct pointer-to-part correspondence needs browser review.
9. Frame: camera fit includes maximum intended extent; actual rendered bounds remain unverified.
10. Theme: all geometry uses kernel stroke classes; wrapper supplies matching plate and theme tokens. Needs visual confirmation.
11. No words in SVG: geometry only; readout is outside the drawing.
12. Page clean: static validation and application build pass; runtime console remains unverified.
13–14. Not applicable: these are project metaphors, with no empty-state or supplied SVG source.
