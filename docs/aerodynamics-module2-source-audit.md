# Aerodynamics Module 2 source audit

## Sources and local scope

The user directly uploaded the complete ten-page Fall 2025 Module 2 review and presentations 14–25 on 2026-10-26, and supplied the 54 practice-quiz prompts in this task. The review PDF matches the previously supplied 60-entry review text. Those twelve decks were extracted and reviewed, including image-only diagrams in the new structural material. The original 2026-10-21 implementation had access to only presentations 14–23; this update adds the two missing decks and expands the structural topics from the direct files.

The user subsequently supplied the four genuinely missing presentations 26–29 (144 additional pages). The current scope is 16 presentations, numbered 14–29, plus the ten-page review: 17 PDFs and 537 pages.

The additions are in `src/data/aerodynamicsStructureContent.js` and `src/data/aerodynamicsFinalContent.js`, with source deck and PDF-page references on each question. The full supplied PDFs and inspection previews remain local attachments/ignored temporary files; only the selected diagram pages are included as published assets.

The review/quiz test maps every one of the 60 review entries and all 53 non-calculation quiz positions. Matching, categorization, multi-answer and multi-blank items are split into individual four-choice questions. Quiz Q40 is explicitly excluded as a numerical Mach calculation under the established non-Math rule. The quiz image files themselves were not supplied here; text and the original PDF references support the questions without claiming to reproduce unseen screenshots.

## Implemented local scope

- Module: `/study/aerodynamics/module-2`.
- Review & Practice Quiz: `/practice-1`, 136 questions from the review and quiz, with grouped items expanded.
- Notes Practice: `/practice-2`, 318 multiple-choice questions, all included in each shuffled attempt.
- One-Word Recall: `/one-word-1`, 287 single-word/hyphenated-term prompts with explicit accepted variants.
- Twenty original course reference pages rendered at 1920×1080, visually inspected in a contact sheet. The wave reference was rendered for inspection but is not registered or required as a published asset.
- Thirty-four multiple-choice topic groups (33 recall groups) across all sixteen supplied presentations plus the directly supplied review. Review-only additions include coordinates, tail/gear layouts, fuel tanks, firewall, winglets and balancing/aileron design names. Every question has a PDF name/page reference; PDF page numbers are used because some printed slide numbers differ.
- Condensed notes include every grouped matching term individually. All active questions are registered in exact-module searchable references. Identical questions shared by review and custom banks appear once in notes search.
- Both attempts save through the shared engines; choice and typed records/best scores are independent. Resets preserve best scores. One-word attempts hide notes until results; choice notes remain below the answer options.
- The obsolete Week 8 availability warning is removed now that presentations 24–25 have been supplied. No later or unseen course material is claimed as covered.
- Expanded choice and typed banks have separate `complete-v3` progress keys. Both the original 165/124-question version and the 207/155-question `complete-v2` version remain available for migration and historical scores. Compatible old answers, shuffled order/options and a paused typed draft migrate before adding newly shuffled questions. Completed old banks resume at the new material. Old bests remain visible as previous-version records, with their original totals; current resets preserve both versions’ bests. The 136-question review bank and its progress key are unchanged. Its dependency now points to the stable base bank to avoid a circular import as the expanded module banks link back to review learning targets.
- Numerical calculation exercises are excluded under the established non-Math rule; relationships such as load factor and Mach number are conceptual.

## Coverage

| PDF | Pages | Topics used |
| --- | ---: | --- |
| 14. B4.03 Axes of Flight | 71 | Three axes and movements; each primary/compound control; tabs; flaps/slots/slats; spoilers; trim; adverse yaw; flutter |
| 15. B4.03 Aircraft Stability | 39 | Static/dynamic and all three signs; each axis's stability; CG; dihedral/anhedral; sweep; Dutch roll |
| 16. B4.03 Wing stall | 25 | Critical AOA; contamination; warning/shaker/pusher; washout; canard; forward sweep; T-tail |
| 17. B4.03 Fuselage and Wing Loading | 21 | Each of five stresses; spar bending; pressurization; load factor versus wing loading; bank/load relationship |
| 18. B4.04 High Speed Aerodynamics | 26 | Mach and four regimes; compressibility; temperature; sound; knots; shock property changes; sonic boom; vapor cone |
| 19. B4.04 High Speed Flight | 25 | Critical Mach; local sonic flow; aft loading shift; Mach tuck/trim/feel |
| 20. B4.04 High Speed Aircraft Design | 26 | Normal/oblique/expansion waves; shock separation; thickness/camber/sweep; delta; fineness; supersonic sections |
| 21. B4.04 High Speed Flight Control | 19 | Coffin corner; all-moving tail; yaw damping; reversal; outboard lockout; roll spoilers |
| 22. C11.01 Aircraft Structure-Fuselage | 40 | All five main assemblies; truss; monocoque; semimonocoque; longerons; stringers; formers; bulkheads |
| 23. C11.01 Aircraft Structure-Wings | 45 | Spars; ribs; stringers; cantilever/external support; load path; wing placement; chord/span/aspect ratio; biplane/triplane/stagger; materials |
| 24. C11.01 Aircraft Structure-Empennage | 18 | Tail cone; fixed/movable surfaces; tail layouts; dorsal/ventral fins; stabilizer construction and loads; cored composites |
| 25. C11.01 Aircraft Structure-Ground Support Structure,Doors | 28 | Gear types and configurations; loads; weight/strength; attachment; trunnions; wells; each of six door/access categories |

| 26. C11.01 Aircraft Structure-Primary Flight Controls | 49 | Spar/torque tube; ribs; lightening holes; rivets; composites; mechanical/hydraulic actuation; balance; split rudder; inboard ailerons; vortex generators; stall fence; ground braking |
| 27. C11.01 Aircraft Structure-Engine Compartment | 25 | Cowling; inlet/nose cowl; mount; pylon; firewall; each fuel tank type; example tank locations |
| 28. C11.01 Aircraft Structure-Fuselage Stations New | 14 | Datums; length/width/height/wing coordinates; LBL/RBL; positive WL direction; each abbreviation letter |
| 29. C11.02 Stress and Load distribution | 56 | Contact/noncontact forces; every listed force; equilibrium; units; moment; mass/weight; friction; stress/strain; elastic/plastic/yield/ultimate; thermal restraint; torsion; bending; concentrations; safety factor; each material property; flight forces; working/proof/ultimate loads |

## Review transfer in the two module tests

`aerodynamicsReviewVariants.js` links every one of the easy review test's learning targets to both expanded banks. The links collectively cover all 60 review entries and all 53 non-calculation quiz positions. Missing target questions are added; already covered targets use existing concept questions with fresh multiple-choice wording, or explicit one-word variants/aliases. Neither expanded test contains a verbatim review-test prompt. Recall uses related single-word concepts where the review answer is a sentence, multi-item set or numeric reference (for example, the units of the 661-knot reference), rather than requiring numerical calculations or multiword responses. The original easy review test remains available for the direct reference values.

## Source cautions

- Dynamic stability concerns the response over time, not merely elapsed time to return.
- The simplified fixed-critical-AOA statement is scoped to a given airfoil/configuration. Ice and configuration changes can change stall behaviour.
- The high-wing pendulum explanation is not treated as a complete universal mechanism or used as an answer key.
- Cabin pressure values and load limits are not universal requirements for every aircraft. Review values are scoped to the supplied course example (8,000 ft/10.9 psi cabin reference and positive 3.8 G for its light-GA example), rather than stated as universal requirements.
- Quiz Q34 says load factor begins at 35 degrees; the review says it increases significantly around there. The question is corrected to explain that in a steady coordinated level turn load factor already increases with bank. Quiz Q43 is tied to temperature rather than a universal altitude rule.
- Mass-balance weights, horn balance and inset hinges are the review's named balancing methods; aerodynamic balance does not automatically replace a specified mass balance. The review's slightly-forward CG example is scoped to its conventional-tail configuration.
- Sound speed is not generalized as increasing with substance density alone.
- Hypersonic thresholds differ at the Mach-five boundary between supplied PDFs; use “around Mach five and above,” without testing the equality boundary.
- Expansion waves are not shock waves despite one source heading. A normal shock is not described as simply turning into an oblique shock as speed rises.
- Claims of zero negative effects on sharp supersonic sections are not universalized.
- Vortex generators are described as boundary-layer aids; the source's claim of guaranteed higher critical Mach onset is not graded.
- Fuel transfer controls CG, not directly the centre of pressure. Unqualified re-entry surface temperatures are withheld.
- Semimonocoque load sharing does not guarantee that no individual member can be failure critical, or that damage is safe.

## Verification

Bank checks validate uniqueness, four distinct choices, source page ranges, single-word keys, explicit aliases, all current topic groups, the review and all sixteen presentation sources in both notes banks; the review bank maps all 60 review entries and 53 non-calculation quiz positions. Search checks locate every question/answer/explanation in the exact module. Persistence checks cover pause/resume, draft restoration and independent best scores after reset.

Visual browser checking was unavailable: no connected browser provider/local preview was present, and automatic approval rejected inspection of an unrelated browser window to avoid reading outside the task. No browser UI verification is claimed.

## Direct review additions

The supplied review adds six tail/gear layout terms, all four coordinate references, all three fuel-tank types, firewall and winglets. The review bank expands the source sets individually and the notes-based banks include these concepts alongside PDF topics. All three use independent persistence IDs and shared engines. No Week 8 material is invented.

- The door deck lists service doors, service panels and equipment access without detailed construction definitions. Questions use those named categories rather than inventing a servicing taxonomy.
- Original diagrams were inspected at source resolution and in a contact sheet. The shared notes dialog and nested image viewer preserve the quiz component and its saved state. No new layout or modal behaviour is introduced by this content update.

## Additional source discrepancies (presentations 26–29)

- Presentation 26 page 29 mixes trailing-edge flap location with a sentence about leading-edge extension. Those devices are distinguished, using page 34 for leading-edge devices; the conflicting sentence is not graded.
- Presentation 29 page 19 incorrectly describes normal stress as perpendicular to the rod axis. Normal stress acts perpendicular to the cross-sectional plane; axial normal stress is along the rod axis. The corrected distinction is explicitly recorded in notes.
- Presentation 29 page 20's unconditional constant-strain claim is not used. Strain is deformation/original length and depends on loading and material response.
- Page 39's safety-factor regulatory claim is not generalized as a universal rule. Only the conceptual ratio is tested. Pages 50–52's bank-angle onset and general load-limit claims retain the previous course-example qualifications.
- Station datums and sign directions, split-rudder high-speed section use, and material-temperature trends are scoped to the lecture/aircraft example.

Final checks: the full suite validates reworded review/quiz target coverage in both module banks, exact-module question search, four distinct choices, one-word accepted answers, source page bounds, all image assets and migration from both prior bank versions. No current browser provider is connected, so no fresh browser layout verification is claimed.
