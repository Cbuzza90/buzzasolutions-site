# Systems question source audit

Format update: these audits describe the original multiple-choice banks. The active tests now use source-backed one-word recall prompts; see [Typed review practice](typed-review-practice.md).

Checked 2026-10-14 against both active banks, the 15-page course review, the supplied five-page 50-question practice/answer-key PDF, the uploaded phone quiz screenshots, and shipped original quiz-image assets. All 123 current questions were inspected. No quiz answers or progress formats were changed.

## Findings

- Test 1 has 40 questions. Every marked answer matches the non-calculation questions in the supplied answer key: Q1-Q36 and Q38-Q41. Q37 and Q42-Q50 were deliberately omitted under the existing no-calculations rule.
- Test 2 has 83 questions. Its subjects trace to the supplied hydraulics material, but the questions are not verbatim copies: matching sets were split and scenario/application questions were written.
- A claim that every sentence is printed in the original quiz/review would be too strong. Added context includes fluid identification/approval cautions, available flow limits, gas-storage explanations, bootstrap piston operation, disc-brake clamping and rod-side effective area. These are identified below rather than passed off as literal source text.
- Some topics are only directly supported by the supplied answer-key PDF (for example single/double-acting actuator definitions and the floating disc-brake name). That PDF cites a 117-slide introduction presentation; that original presentation is not present among this workspace's supplied attachments, so those slide citations were not independently re-audited.
- The two actuator SVG sketches are teaching illustrations drawn for the site. Other diagram questions use shipped course/quiz screenshots. Internal `sourceId` values are grouping IDs, not original Canvas question numbers.
- The existing source conflicts remain documented in `systems-review-coverage.md`: gear extension wording versus Up arrows, premature rounding in the force example, and aircraft weight conflated with towing force. None is used as a contradictory scored answer.

## Review details not explicitly tested

Fluid flushing/cleaning solvents, published temperature ranges, MIL-PRF-87257 as the low-temperature alternative, thermoplastic/paint material effects, and the reservoir filler-neck overfill detail are visible in the review but do not have dedicated current questions. Numerical exercises remain deliberately excluded. The EHAS graphic lacks an explanatory answer source, so it is not used for invented detailed questions. These are coverage limits, not incorrect answers.

## Test 1 source mapping

| Site question IDs | Practice/answer-key question IDs | Check |
| --- | --- | --- |
| 1-36 | 1-36 | Correct answers match |
| 38-41 | 38-41 | Correct answers match |

## Test 2 source mapping

Each row identifies the exact active question, marked answer, evidence anchor and whether explanation/application was added.

| Question ID | Correct answer | Source anchor | Relationship / limit |
| --- | --- | --- | --- |
| 1 | Its low compressibility transmits pressure with little volume change | Review pp. 2-4; key Q2/Q4 | Applied; low compressibility is explanatory context |
| 2 | They receive the same pressure change, but their forces can differ | Review pp. 2-4; key Q2/Q4 | Applied Pascal/area relationship |
| 3 | All four have the same bottom pressure. | Review p. 3; key Q3 | Hydrostatic-paradox application |
| 4 | Greater output force, but less output travel for a given input displacement | Review pp. 4/8; key Q4/Q47; screenshot 1000004027 | Force/travel application |
| 5-1 | Viscosity | Screenshot 1000004012; key Q5-Q7 | Expanded viscosity statements |
| 5-2 | Higher viscosity | Screenshot 1000004012; key Q5-Q7 | Expanded viscosity statements |
| 5-3 | It decreases | Screenshot 1000004012; key Q5-Q7 | Expanded viscosity statements |
| 5-4 | Equal temperature does not guarantee equal viscosity | Screenshot 1000004012; key Q5-Q7 | Expanded viscosity statements |
| 5-5 | Viscosity is resistance to flow; pressure is force per unit area | Screenshot 1000004012; key Q5-Q7 | Expanded viscosity statements |
| 5-6 | Viscosity | Screenshot 1000004012; key Q5-Q7 | Expanded viscosity statements |
| 6 | Flash point, rather than fire point | Screenshot 1000004011; review p. 10; key Q9/Q10 | Flash/fire distinction |
| 7-1 | Other hydraulic specifications, including MIL-H-83282, can also be red | Review pp. 9-10; key Q13/Q17/Q18 | Expanded fluid/seal properties; identification caveat added |
| 7-2 | Vegetable: castor oil/alcohol; mineral: petroleum; phosphate ester: synthetic ester | Review pp. 9-10; key Q13/Q17/Q18 | Expanded fluid/seal properties; identification caveat added |
| 7-3 | Butyl or ethylene-propylene | Review pp. 9-10; key Q13/Q17/Q18 | Expanded fluid/seal properties; identification caveat added |
| 7-4 | Lubricating ability and chemical stability | Review pp. 9-10; key Q13/Q17/Q18 | Expanded fluid/seal properties; identification caveat added |
| 8 | Compatibility does not replace checking the aircraft's approved fluid specification | Review p. 9; key Q18; screenshot 1000004014 | Compatibility with aircraft-approval clarification |
| 9 | Phosphate ester with neoprene | Review p. 10; key Q14/Q17 | Incompatible seal pairing |
| 10 | Low flow resistance, chemical stability, lubrication, and seal compatibility | Review pp. 9-10; viscosity screenshot 1000004012 | Combined fluid qualities; applied wording |
| 11-1 | To exclude contamination, air, and moisture | Review p. 9 mixing warning | 11-2 direct warning; 11-1 contamination/air/moisture is added handling context |
| 11-2 | Seal swelling or breakdown and system blockage | Review p. 9 mixing warning | 11-2 direct warning; 11-1 contamination/air/moisture is added handling context |
| 12 | Through the neutral selectors and back to the reservoir | Review p. 12; screenshots 1000004024/1000004021 | Diagram flow interpretation |
| 13-1 | Each selector can receive supply pressure without flow passing through another selector first | Review p. 12; screenshot 1000004036; key Q21-Q23 | Parallel/stored energy; available-flow limit is added clarification |
| 13-2 | Accumulator | Review p. 12; screenshot 1000004036; key Q21-Q23 | Parallel/stored energy; available-flow limit is added clarification |
| 13-3 | Available pump flow and pressure relative to their demands | Review p. 12; screenshot 1000004036; key Q21-Q23 | Parallel/stored energy; available-flow limit is added clarification |
| 14 | It blocks the neutral supply passage while pressure remains available | Review p. 12; screenshot 1000004021; key Q19/Q21 | Neutral-flow contrast |
| 15 | Previously stored energy in the accumulator | Review p. 12; key Q23 | Accumulator application; finite supply clarification |
| 16-1 | It combines the fluid supply, pump and control components in a self-contained unit | Review p. 13; key Q24 | Power-pack contents/application |
| 16-2 | Electric pump, pressure-control valves, selector valves, reservoir | Review p. 13; key Q24 | Power-pack contents/application |
| 17 | Left: integral, built into the power pack; right: in-line, connected by tubing | Review pp. 13-14; key Q25/Q26; shipped original reservoirs screenshot | Integral/in-line diagram interpretation |
| 18 | Space for changes in fluid volume | Review p. 14 | Reservoir expansion/volume changes |
| 19-1 | It maintains positive pump-inlet supply and helps prevent foaming | Review p. 14; key Q28-Q30 | Pressurization names; bootstrap piston mechanism is added clarification |
| 19-2 | Bleed air; bootstrap | Review p. 14; key Q28-Q30 | Pressurization names; bootstrap piston mechanism is added clarification |
| 20 | Its confined liquid transmits the brake input to the expander tube | Review p. 11; key Q38; screenshot 1000004026 | Expander-tube brake application |
| 21 | Pistons apply friction surfaces against the disc | Key Q39 | Disc-brake clamping explanation is added mechanism context |
| 22 | A: single-acting with spring return; B: double-acting with two hydraulic ports | Key Q40/Q41 | Actuator types; supplied site SVG is a redrawn teaching illustration |
| 23-1 | Pressure regulator | Key Q31-Q36; review pp. 12/15; screenshots 1000004025/1000004031 | Six pressure-control roles, individually expanded |
| 23-2 | System relief valve | Key Q31-Q36; review pp. 12/15; screenshots 1000004025/1000004031 | Six pressure-control roles, individually expanded |
| 23-3 | Thermal relief valve | Key Q31-Q36; review pp. 12/15; screenshots 1000004025/1000004031 | Six pressure-control roles, individually expanded |
| 23-4 | Pressure reducer | Key Q31-Q36; review pp. 12/15; screenshots 1000004025/1000004031 | Six pressure-control roles, individually expanded |
| 23-5 | Debooster | Key Q31-Q36; review pp. 12/15; screenshots 1000004025/1000004031 | Six pressure-control roles, individually expanded |
| 23-6 | Unloading valve | Key Q31-Q36; review pp. 12/15; screenshots 1000004025/1000004031 | Six pressure-control roles, individually expanded |
| 24 | Its overpressure-protection role is different from normal pressure control | Review p. 12; key Q31/Q32 | Regulator vs relief application |
| 25-1 | Thermal relief valve | Shipped original numbered-components quiz screenshot; compare screenshot 1000004019 | All five labels independently checked against labelled circuit |
| 25-2 | Filter | Shipped original numbered-components quiz screenshot; compare screenshot 1000004019 | All five labels independently checked against labelled circuit |
| 25-3 | System relief valve | Shipped original numbered-components quiz screenshot; compare screenshot 1000004019 | All five labels independently checked against labelled circuit |
| 25-4 | Accumulator | Shipped original numbered-components quiz screenshot; compare screenshot 1000004019 | All five labels independently checked against labelled circuit |
| 25-5 | Reservoir | Shipped original numbered-components quiz screenshot; compare screenshot 1000004019 | All five labels independently checked against labelled circuit |
| 26-1 | Open centre with selectors in series | Review p. 12; screenshot 1000004024 | Open-centre diagram and neutral route |
| 26-2 | Reservoir → pump → neutral selectors → reservoir | Review p. 12; screenshot 1000004024 | Open-centre diagram and neutral route |
| 27 | Left red: mineral MIL-H-5606; right purple: phosphate ester/BMS 3-11 | Review pp. 9-10; screenshots 1000004023/1000004033/1000004034 | Fluid comparison; colour caveat added |
| 28-1 | The piston exposed to the higher pressure | Review pp. 4-8; key Q2/Q4/Q42-Q50 | Qualitative replacements for calculations; 28-4 rod-side area is added mechanism context |
| 28-2 | The larger-area piston | Review pp. 4-8; key Q2/Q4/Q42-Q50 | Qualitative replacements for calculations; 28-4 rod-side area is added mechanism context |
| 28-3 | The smaller-area input piston | Review pp. 4-8; key Q2/Q4/Q42-Q50 | Qualitative replacements for calculations; 28-4 rod-side area is added mechanism context |
| 28-4 | Its effective piston area is larger because the rod reduces area on the other side | Review pp. 4-8; key Q2/Q4/Q42-Q50 | Qualitative replacements for calculations; 28-4 rod-side area is added mechanism context |
| 28-5 | The longer stroke | Review pp. 4-8; key Q2/Q4/Q42-Q50 | Qualitative replacements for calculations; 28-4 rod-side area is added mechanism context |
| 28-6 | The longer movement | Review pp. 4-8; key Q2/Q4/Q42-Q50 | Qualitative replacements for calculations; 28-4 rod-side area is added mechanism context |
| 28-7 | Average power increases | Review pp. 4-8; key Q2/Q4/Q42-Q50 | Qualitative replacements for calculations; 28-4 rod-side area is added mechanism context |
| 28-8 | It trades travel for force rather than creating extra energy | Review pp. 4-8; key Q2/Q4/Q42-Q50 | Qualitative replacements for calculations; 28-4 rod-side area is added mechanism context |
| 29-1 | Ethylene-propylene | Review pp. 9-10/12/14; key Q12/Q14/Q17/Q23 | Expanded seals, fire resistance, accumulator/check valve and aspirator; gas-storage/check-valve mechanisms clarified |
| 29-2 | Natural rubber | Review pp. 9-10/12/14; key Q12/Q14/Q17/Q23 | Expanded seals, fire resistance, accumulator/check valve and aspirator; gas-storage/check-valve mechanisms clarified |
| 29-3 | Neoprene | Review pp. 9-10/12/14; key Q12/Q14/Q17/Q23 | Expanded seals, fire resistance, accumulator/check valve and aspirator; gas-storage/check-valve mechanisms clarified |
| 29-4 | It resists ignition and burning under specified conditions, not every possible fire exposure | Review pp. 9-10/12/14; key Q12/Q14/Q17/Q23 | Expanded seals, fire resistance, accumulator/check valve and aspirator; gas-storage/check-valve mechanisms clarified |
| 29-5 | The gas separated from the hydraulic liquid | Review pp. 9-10/12/14; key Q12/Q14/Q17/Q23 | Expanded seals, fire resistance, accumulator/check valve and aspirator; gas-storage/check-valve mechanisms clarified |
| 29-6 | It prevents reverse flow through that path | Review pp. 9-10/12/14; key Q12/Q14/Q17/Q23 | Expanded seals, fire resistance, accumulator/check valve and aspirator; gas-storage/check-valve mechanisms clarified |
| 29-7 | Aspirator | Review pp. 9-10/12/14; key Q12/Q14/Q17/Q23 | Expanded seals, fire resistance, accumulator/check valve and aspirator; gas-storage/check-valve mechanisms clarified |
| 30-1 | Boyle's law | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-2 | Charles's law | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-3 | Bernoulli's principle | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-4 | Hydrostatic paradox | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-5 | Reversible hydraulic power pack | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-6 | Pump flow passes through the neutral valves and returns to the reservoir | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-7 | Parallel pressure-fed selectors with an accumulator in the pressure circuit | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-8 | Lower viscosity | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-9 | Persistent foam formation | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-10 | Limit corrosion of system materials | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-11 | Vegetable-base MIL-H-7644 | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-12 | Castor oil and alcohol | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-13 | Allowing air to separate from the liquid | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-14 | Some contaminants remain suspended and require filtration | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-15 | It provides a reserve supply, without making leakage acceptable or unlimited | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-16 | Dipstick or sight gauge | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-17 | It emphasizes high efficiency; real systems still have friction and other losses | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |
| 30-18 | Flight controls, landing gear and brakes | Review pp. 2-3/9/12-14; screenshots 1000004038/1000004042/1000004021/1000004019/1000004012/1000004013 | 18 expanded review topics; gas-law conditions and efficiency limits clarified |

## Additional definition checks

The expanded Boyle/Charles questions state the fixed-mass and constant-temperature/constant-pressure conditions confirmed by [NASA's equation of state explanation](https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/equation-of-state/). The Bernoulli question retains ideal-flow restrictions consistent with [NASA's Bernoulli explanation](https://www.grc.nasa.gov/www/k-12/airplane/bern.html). These clarify the screenshot's closed matching dropdowns; they do not establish that the instructor used these exact descriptions.

## Validation

All 12 existing checks passed: three foundations-bank checks, five applied-bank/diagram checks, and four course-note/search checks. The source banks and answer selections are unchanged.

## Reproducibility

Bank hashes at audit time:

- `systems-hydraulics-test1.json`: `a2b5c8a9f257c45a220c990da330f15cd0a13cc5df585a0b9c90f343d95e2872`
- `systems-mixed-practice2.json`: `9560adf6e7098b2a3a4d8a4b5c328530b8edc98d2f240399a27a15fb53b4ea93`

Run the existing Systems bank checks and course study-note search coverage check after bank changes. Automated structure/search checks supplement the manual source comparison; they do not establish source accuracy by themselves.
