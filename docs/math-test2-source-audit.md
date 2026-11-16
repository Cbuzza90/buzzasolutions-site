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
