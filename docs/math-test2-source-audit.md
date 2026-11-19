# Math Test 2 source audit

## Scope

The newer user-supplied Test Breakdown image governs the allocation: 30 questions, comprising 8 rate/ratio (2 ratio/proportion, 4 percent, 2 averages), 2 probability, 4 PCR, 5 geometry, 7 physics and 4 engine-volume/ihp questions. The table on page 3 of the older review PDF instead totals 25 and is not used for allocation.

All source page references use PDF page numbers. Original uploads and temporary extraction/rendering files are not part of the application. Three derived WebP reference assets are used by the existing enlarging/zooming diagram component.

| Source | Use |
| --- | --- |
| practice test 2.pdf, 3 pages | Review values and prompts; weighted grade tables visually checked on p1 |
| Formula sheet for Test 2.pdf, 1 page | Original raster formula reference; geometry/physics/PCR and PLANK units |
| Block 2 - Physics Summary.pdf, 1 page | Metric/imperial units and conversions; qualified energy identities |
| Piston Displacement_ Horsepower.pdf, 7 pages | Bore/stroke, swept volume, cylinder count, horsepower and each PLANK letter |
| Geometry.pdf, 33 pages | Arc length, angle conversions, area/perimeter, Pythagoras, distance and volume |
| Percentage_ Avergages_ odds_ PCR.pdf, 18 pages | Ratios, percentages, averages, probability and compression-volume conventions |
| Physics .pdf, 25 pages | Force, pressure, work, energy, power and lossless energy conservation |

## Corrections and ambiguity handling

- Percentage lecture p8: 40/70 is 57.14%, not the printed 51.14%.
- Percentage lecture p10: retaining exact intermediate values requires 89.25% on the final, or 44.625/50 before rounding. Whole-mark requirements round upward.
- Percentage lecture p11–12: the caption “one to four” reverses the displayed 4:1 ratio.
- Percentage lecture p14: functioning:defective at 5% defective is 95:5, not the printed 5:95. Its “odds” examples often calculate probability. Notes distinguish favourable:unfavourable odds from favourable/total probability.
- Percentage lecture p18 and review Q19: a percentage of BDC can mean total volume or swept stroke. The lecture equation divides measured volume by the fraction. The graded adaptation explicitly says percentage of TOTAL BDC volume, not percentage of stroke. Notes explain the alternative clearance-aware equation.
- Review Q18: total 90 cc and displacement 10 cc imply clearance 80 cc and PCR 1.125:1. This atypical ratio is retained as arithmetic from the supplied values, without relabelling quantities.
- Formula sheet: “Piston displacement ratio” labels the compression-ratio formula. Notes distinguish compression ratio from swept displacement volume.
- Piston lecture p6: the “2-cycle” wording conflicts with N = rpm/2. The formula sheet and p7 worked examples use rpm/2. Both PLANK questions explicitly specify four-stroke engines and that factor. L is feet, bore inches and area square inches.
- Some piston examples use pi=3.14. Practice prompts specify calculator pi and final rounding, producing consistent keys from full precision.
- Review Q20: two “sides” of 5 and 12 are clarified to be perpendicular legs. The right angle alone does not identify which supplied side is hypotenuse.
- Review Q21: the degree/superscript-zero notation is avoided; the arc question uses the explicit 120-degree, radius-3-cm lecture example.
- Review Q23: the handwritten isosceles sketch is not used for a graded area question.
- Geometry p33: the supplied theta=15 degrees conflicts with the 5–4–3 triangle implied by radius 5 and base 8. The composite-area example is excluded from grading.
- Physics summary: W=mgh=0.5mv²=Fd lists energy forms whose equality depends on the situation. Notes and questions state the applicable conditions and compare initial and final total mechanical energy.
- Review Q32–33 is one engine-volume problem split by numbering. Its 8 cylinders, 10-inch bore and 8-inch stroke are retained. Q34–35 give large dimensions/results, which are preserved rather than silently rescaled.
- The tax question treats 13% as supplied exercise data; it is not current tax advice.

## Implementation and verification

- Uses `MultipleChoicePractice`, `ModuleStudyOverview`, `CourseStudyNotes`, `StudyNotesGuide`, `AnswerExplanation`, shared attempt/high-score persistence and existing practice-route navigation.
- Every question is registered under `/study/math/module-2` in the bank-backed question reference system.
- Extended practice at `practice-2` combines the original 30 with 30 additional source-based items. Each topic allocation is doubled; it has separate attempt/highest-score storage. Additional methods include reverse PLANK rpm, reverse clearance from PCR, more probability and coordinate problems, and imperial work. Calculator-pi answers for the piston lecture p7 examples are 133.28 hp and 3,742 rpm; the printed 133.21 hp and 3,744 rpm use pi=3.14 and are explicitly explained.
- The 30-question topic distribution, four distinct options, source attribution and calculations are checked by `mathTest2.test.js`.
- Formula and diagram search, nested image enlargement/closing, feedback notes, saved progress, reset/highest-score retention and phone layout are verified using the existing checks and local preview.

## Five of each type (18 November 2026)

- Added a separate `practice-3` test with 55 calculation methods and five questions per method (275 total). This is a study drill, not the 30-question exam allocation. It covers the original and extended reviews, their individual solving methods, the triangular-prism review, and all ten extra online-review examples pasted by the user.
- The exact supplied breakdown is `1000004886.png` from the Percentage/Physics attachment set. It shows rate/ratio 8, probability 2, PCR 4, geometry 5, physics 7 and engine volume/ihp 4, for 30 total. A lossless derived `public/math/test-2-breakdown.webp` is displayed on the module and in the enlarging study guide. Attachments remain untracked.
- Splits distance and midpoint, ordinary and multi-turn arcs, potential and kinetic energy, power and time, and forward/inverse PCR and PLANK calculations into separate blocks. Includes both direct percentages and expected whole-number counts, and vehicle stopping energy with km/h-to-m/s conversion.
- The new test opts into `practiceGroup` metadata in the shared persistence layer. Blocks retain their source order; questions shuffle within each block, and choices shuffle independently. Restoring an attempt retains its exact order and submitted feedback. Ordinary tests keep full shuffling. The new route has separate progress/highest scores and uses existing Courses / Reset Test / Tests navigation.
- Each question has four distinct choices and a source-attributed worked explanation in shared `AnswerExplanation`. All 275 questions are registered as exact Math Module 2 searchable references; condensed notes explain the new examples, multi-turn distance and source assumptions.
- The pasted `Correctsvg` results omit most entered answers. No answer key is inferred from the score labels. The new equilateral question has no unit/rounding rule, so adaptations explicitly state cm and two decimal places. Potential-energy Q7 omits g; adaptations explicitly use the course sheet's 9.81 m/s². All ten examples are checked: equilateral area 10.83 cm²; red share 32%; standard:defective 7.3:1; expected birds 250; distance 4.5; midpoint (0.5, −1); potential 8,905.8 J; kinetic 9,409.9 J; 22° arc 2.6 nm; 501° total arc 60.3 nm.
- Verification: arithmetic anchors for all methods, exhaustive coin-outcome enumeration, geometric and physical inverse checks, five-question grouping, shuffled grading, resume/completion, independent score retention, route/dashboard registration and per-question notes coverage. Browser QA at 390 × 844 verifies the source image, nested enlargement and closing, new-question search, correct/incorrect feedback, secondary learning notes, reload and the transition from five ratio questions to the mixture block.
