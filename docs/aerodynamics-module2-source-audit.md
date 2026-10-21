# Aerodynamics Module 2 source audit

## Sources and retrieval limit

Read the Aerodynamics project's chat **Module 2 Test Info**, conversation `6ad8eb83-77c0-83ea-94f7-7ccfdd09c541`, on 2026-10-21 using the read-only app connector. The chat reports 14 attachments but exposes only ten readable PDF paths, presentations 14–23. Reading older turns individually and refreshing the chat did not expose the missing material. The user then supplied the complete 10-page Fall 2025 Module 2 review text (60 entries) and all 54 practice-quiz prompts directly in this task. Those direct sources are included in the implemented banks. No messages were sent to the other chat.

The review/quiz test maps every one of the 60 review entries and all 53 non-calculation quiz positions. Matching, categorization, multi-answer and multi-blank items are split into individual four-choice questions. Quiz Q40 is explicitly excluded as a numerical Mach calculation under the established non-Math rule. The quiz image files themselves were not supplied here; text and the original PDF references support the questions without claiming to reproduce unseen screenshots.

## Implemented local scope

- Module: `/study/aerodynamics/module-2`.
- Review & Practice Quiz: `/practice-1`, 136 questions from the review and quiz, with grouped items expanded.
- Notes Practice: `/practice-2`, 165 multiple-choice questions, all included in each shuffled attempt.
- One-Word Recall: `/one-word-1`, 124 single-word/hyphenated-term prompts with explicit accepted variants.
- Six original course reference pages rendered at 1920×1080, visually inspected in a contact sheet. The wave reference was rendered for inspection but is not registered or required as a published asset.
- Nineteen topic groups across all ten accessible PDFs plus the directly supplied review. Review-only additions include coordinates, tail/gear layouts, fuel tanks, firewall, winglets and balancing/aileron design names. Every question has a PDF name/page reference; PDF page numbers are used because some printed slide numbers differ.
- Condensed notes include every grouped matching term individually. All active questions are registered in exact-module searchable references. Identical questions shared by review and custom banks appear once in notes search.
- Both attempts save through the shared engines; choice and typed records/best scores are independent. Resets preserve best scores. One-word attempts hide notes until results; choice notes remain below the answer options.
- Module and notes introduction explicitly warn that **Week 8 notes aren't out yet**.
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
| 23. C11.01 Aircraft Structure-Wings | 45 | Spars; ribs; stringers; cantilever/external support; load path |

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

Bank checks validate uniqueness, four distinct choices, source page ranges, single-word keys, explicit aliases, all 19 topic groups, the review and all ten PDF sources in both notes banks; the review bank maps all 60 review entries and 53 non-calculation quiz positions. Search checks locate every question/answer/explanation in the exact module. Persistence checks cover pause/resume, draft restoration and independent best scores after reset.

Visual browser checking was unavailable: no connected browser provider/local preview was present, and automatic approval rejected inspection of an unrelated browser window to avoid reading outside the task. No browser UI verification is claimed.

## Direct review additions

The supplied review adds six tail/gear layout terms, all four coordinate references, all three fuel-tank types, firewall and winglets. The review bank expands the source sets individually and the notes-based banks include these concepts alongside PDF topics. All three use independent persistence IDs and shared engines. No Week 8 material is invented.
