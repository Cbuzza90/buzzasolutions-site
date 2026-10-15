# Electricity test source audit

Format update: these audits describe the original multiple-choice banks. The original multiple-choice tests remain active, with additional source-backed one-word recall tests alongside them; see [Typed review practice](typed-review-practice.md).

Checked 2026-10-14. Scope: the active 64-question multiple-choice bank and the 20-question randomized Resistor Band Calculations test. Sources: AMEM 10001 Test 1 Study Aid.docx in Downloads, the supplied 50-question Canvas result text, and Resistor Colour chart.ppt. The study aid is a list of prompts without a completed answer key; topic alignment alone does not prove each answer. The quiz text includes marked correct answers. Source files were not edited.

## Findings

- All 64 multiple-choice questions were inspected and mapped below. Subjects follow the supplied aid/quiz, with source questions split, combined or clarified. No incorrect marked answer or multiple-correct-option problem was identified in this audit.
- Each of the six generation sources and four resistance factors is separately tested. Both Kirchhoff laws and both ion changes have dedicated questions.
- The original chart is displayed directly. Reading the legacy PowerPoint Pictures stream found one image whose dimensions and RGBA pixels exactly match the shipped 394-by-483 PNG.
- Every chart digit, available multiplier, tolerance and temperature coefficient matches the supplied image. Blank chart positions are excluded.
- An independent lookup table and nominal-minus/plus-percent oracle checked all 8,232 currently reachable generated sequences (1,512 four-band, 1,344 five-band, 5,376 six-band). Every nominal value, tolerance bound and sixth-band coefficient agreed; correct values passed grading and a deliberately changed nominal value failed.
- 100 random attempts retained 20 unique band sequences each with the intended seven four-band, seven five-band and six six-band split.
- The seven resistor tests, two shared multiple-choice tests and four note/search tests all passed (13 total). These include shuffle key preservation, original chart examples, invalid input, saved progress, retained highest score and legacy unit conversion.
- Source-table and independent arithmetic checks supplement the existing tests; existing tests alone are not proof of course-source accuracy.

## Source wording deliberately clarified

The original quiz has a few overly broad questions. Current questions distinguish mechanical pointer zero from ohms-scale zero; test changing flux rather than mere presence of a magnet; specify comparable conductor geometry for nichrome; specify a conventional analog series ohmmeter; explain shunt current diversion; and allow an oscilloscope to display more than AC. Series resistance is tested as a sum rather than repeating the vague question that attributes the calculation to one law. The original claim that DMMs always offer higher accuracy/resolution is replaced with a question that separates those two specifications. These are intentional changes, not literal source transcriptions.

## Coverage gaps and generator limits

- Quiz Q22 asks specifically about electrical damping. The site asks only its purpose (Q48).
- Quiz Q47 asks about potentiometer volume control. The site tests divider/rheostat terminals (Q45) but has no dedicated volume-control application question.
- Mechanical zero is tested, but there is no dedicated question on shorted probes and analog ohms-zero adjustment.
- Quiz Q24's DMM advantage is not explicitly tested; resolution is covered, and blanket superiority would need a qualified comparison.
- The resistor generator chooses 24 two-digit values. For five/six bands it multiplies those by ten, so the third significant digit is always zero. Other source-chart digit combinations are valid but not sampled.
- Purple's 10,000,000 multiplier appears in the source table but is never generated. Four-band generation stops at 1,000,000; five/six at 100,000. Black/grey/white sixth-band coefficients are absent in the supplied chart and correctly excluded, even if other charts include additional values.
- No absent-tolerance-band or three-band numerical resistors are generated. The multiple-choice test covers the study aid's missing-fourth-band concept separately (20%).
- Five/six bands, tolerance-bound answer fields and temperature-coefficient reading come from the supplied chart and the user's custom resistor-test request, not from the original 50 quiz questions. Min/max bounds are derived from nominal resistance and tolerance rather than printed as individual answers in the chart.

## Correction made

The condensed Ohm-law note said that these notes and this test require no arithmetic, which was misleading when opened from Resistor Band Calculations. It now explicitly states that Practice Test #1 tests relationships without arithmetic, while Resistor Band Calculations requires numerical answers. No question, answer key, grading rule or stored-score format changed.

## Multiple-choice source mapping

| Site ID | Marked correct answer | Source anchor | Adaptation / limit |
| --- | --- | --- | --- |
| 1 | Protons and neutrons in the nucleus; electrons outside it | Quiz Q50 | Particle locations clarified |
| 2 | Electron | Quiz Q12 | Charge-transfer explanation added |
| 3 | A positive ion, also called a cation | Study aid: atom loses an electron | Positive ion/cation; prompt has no supplied key |
| 4 | A negative ion, also called an anion | Study aid: atom gains an electron | Negative ion/anion; prompt has no supplied key |
| 5 | Ionization | Quiz Q6 | Ionization |
| 6 | Electrons in the outermost occupied shell | Quiz Q23 | Outer-shell concept; does not test counting valence electrons |
| 7 | An applied electric field can produce a net movement of these electrons | Study aid: free electrons | Field/drift explanation added |
| 8 | Copper | Quiz Q41/Q43 | Conductor/insulator contrast |
| 9 | Nichrome | Quiz Q15; study aid: resistance factors | Geometry and temperature held equal to remove ambiguity |
| 10 | An accumulated imbalance of charge rather than a sustained flow | Quiz Q13 | Static/current distinction clarified |
| 11 | Charge transfer as rain, snow or particles interact with its surface | Quiz Q1 | Precipitation/particle charge transfer instead of broad air-friction wording |
| 12 | Release accumulated static charge to reduce radio interference | Quiz Q5/Q17/Q20 | Repeated source questions combined; lightning caveat added |
| 13 | Friction, pressure, heat, light, chemical action and magnetism | Study aid: list six sources; quiz Q7 | All six expanded; does not retain shuffled-letter all-of-the-above option |
| 14 | Electrons transfer between their surfaces | Study aid: describe friction source | Electron-transfer mechanism |
| 15 | Pressure | Study aid: describe pressure source; quiz Q42 | Piezoelectric deformation |
| 16 | Heat | Study aid: describe heat source | Thermocouple temperature-difference mechanism added |
| 17 | Photovoltaic cell | Study aid: describe light source | Photovoltaic example added |
| 18 | Chemical reactions maintain a potential difference between its terminals | Study aid: describe chemical source; quiz Q7 | Battery example added |
| 19 | The magnetic flux linking the conductor changes | Study aid: describe magnetic source; quiz Q7 | Changing linked flux condition clarified |
| 20 | The rate at which charge flows | Study aid: rate of electron flow; quiz Q27 | Charge flow per time |
| 21 | Ampere | Quiz Q36 | Ampere |
| 22 | Electrical potential difference that can drive current | Study aid: voltage/EMF; quiz Q49 | Potential difference/source EMF distinction |
| 23 | Opposition to current flow — ohm | Quiz Q25/Q38 | Resistance and ohms |
| 24 | Material, length, cross-sectional area and temperature | Study aid: four resistance factors; quiz Q46 | All four included; insulation colour excluded |
| 25 | It increases | Quiz Q33; study aid: resistance factors | Length with other conditions unchanged |
| 26 | It decreases | Study aid: resistance factors; quiz Q46 | Conducting area clarified |
| 27 | It increases | Study aid: resistance factors | Copper specified so temperature trend is unambiguous |
| 28 | Power: the rate of energy transfer or conversion | Study aid: what is a watt | Power rather than energy; joule-per-second explanation added |
| 29 | James Watt | Study aid: who invented horsepower | Wording changed to developed/popularized |
| 30 | A rate of doing mechanical work | Study aid: what is horsepower | Rate of mechanical work |
| 31 | Current | Study aid: constant in series; quiz Q4 | Same current |
| 32 | Voltage | Study aid: constant in parallel; quiz Q34 | Same two nodes specified |
| 33 | Voltage drop | Study aid: loss in electrical pressure | Voltage drop |
| 34 | It is the sum of the individual resistances | Quiz Q48 | Tests series-resistance sum directly; source wording about law attribution is not copied |
| 35 | It decreases | Study aid: parallel resistance; quiz Q18 | Positive branch/ideal source assumptions added |
| 36 | It is less than the smallest branch resistance | Quiz Q29 | Generalizes equal resistors to all finite positive parallel resistors |
| 37 | The algebraic sum of voltages around a closed loop is zero | Study aid: Kirchhoff laws; quiz Q8 | Algebraic sign convention added |
| 38 | Total current entering a node equals total current leaving it | Study aid: Kirchhoff laws | Current law separately expanded |
| 39 | V = I × R | Quiz Q28/Q40 | Ohm law formula |
| 40 | Current increases | Quiz Q28/Q40 | Application at unchanged resistance/temperature |
| 41 | P = V × I | Quiz Q30 | P=VI; avoids equivalent correct formulas as distractors |
| 42 | First digit, second digit, multiplier, tolerance | Study aid: fourth band; quiz Q31; supplied resistor chart | All four band roles |
| 43 | ±20% | Study aid: missing fourth band | 20% standard externally confirmed; no absent-band row in uploaded chart |
| 44 | ±5% | Supplied resistor chart; quiz Q31 | Gold tolerance directly checked |
| 45 | The divider uses three terminals; the rheostat uses a wiper and one end terminal | Quiz Q21 | Three-terminal divider/two-terminal rheostat; Q47 volume application not explicitly tested |
| 46 | Magnetic interaction between the current-carrying coil and the permanent magnet | Study aid: galvanometer operation | Magnetic torque mechanism |
| 47 | Less current is needed for full-scale deflection | Quiz Q16 | Sensitivity trend; equivalent full-scale-current concept |
| 48 | Reduce pointer oscillation so it settles promptly | Quiz Q22 | Purpose of damping; electrical damping method not explicitly tested |
| 49 | Mechanical pointer zero adjustment | Quiz Q2 | Mechanical zero distinguished from ohms zero; no dedicated ohms-zero question |
| 50 | In series with the load | Study aid: ammeter orientation; quiz Q26 | Series connection |
| 51 | De-energize it, select the correct fused current input and a suitable range, then connect in series with correct polarity | Study aid: ammeter precautions | Current input/range, power removal and polarity expanded |
| 52 | A low-resistance parallel path carries most of the current around the movement | Study aid: ammeter additional circuitry; quiz Q32 | Parallel low-resistance diversion replaces vague protect wording |
| 53 | In parallel across the load | Study aid: voltmeter orientation; quiz Q10/Q49 | Parallel voltage measurement |
| 54 | A high resistance in series with the movement limits its current | Study aid: voltmeter additional circuitry; quiz Q11 | High-resistance series multiplier |
| 55 | Remove external power and safely discharge stored energy | Quiz Q9 | Remove external power/discharge before measuring resistance |
| 56 | To drive a test current through the resistance being measured | Quiz Q44 | Conventional analog series ohmmeter specified |
| 57 | Megohmmeter or insulation resistance tester | Study aid: high resistance instrument; quiz Q37 | Megohmmeter/insulation tester |
| 58 | It applies a specified elevated DC test voltage to assess insulation leakage | Study aid: how high resistance instrument works | Elevated test voltage and isolation clarification added |
| 59 | Its low-battery indicator appears | Study aid: low meter battery | Low-battery indicator |
| 60 | The smallest change it can display on a selected range | Study aid: meter resolution; quiz Q24 | Resolution separated from accuracy; blanket DMM superiority not copied |
| 61 | Diode-test mode | Quiz Q14 | Dedicated diode mode and isolated diode clarified |
| 62 | Determine an unknown resistance by comparison with known resistances | Quiz Q39/Q45 | Duplicate bridge questions combined |
| 63 | Oscilloscope | Study aid: multiple AC sine waves; quiz Q3/Q35 | Includes AC/DC/transients rather than implying AC-only scope |
| 64 | The time taken for one complete cycle | Quiz Q19 | Cycle-time interpretation added |

## Supporting primary references

- [Vishay colour code and standard resistance series](https://www.vishay.com/doc/?20143=): independently confirms absent-band 20% tolerance. The custom generator remains restricted to the user's chart, not this broader manufacturer table.
- [Fluke resolution and accuracy explanation](https://www.fluke.com/en-us/learn/blog/digital-multimeters/accuracy-precision): supports keeping resolution distinct from accuracy.

## Bank fingerprints

- `electricity-module1-test1.json`: `99b40b445d7dbe00c4b6c0926b817eced4797bd2d1e7920286e5cc660cf31e6c`
- `resistorBands.js`: `5a33afba105555d88c2a117acbaaa728b39ef23cad08664ae9866ecc2cb85347`

## Scope update: resistor practice

The user removed temperature coefficients from the practice scope. Current attempts contain ten four-band and ten five-band questions; the viewer excludes the six-band example and coefficient column from the original chart. Earlier six-band audit counts above describe the previous implementation. Legacy saves migrate to five bands with progress and best scores retained.

## Vocabulary follow-up audit - 2026-10-15

Rechecked all 64 active multiple-choice prompts/answers and the 64 Electricity one-word prompts against the original DOCX paragraphs and original supplied 50-question result text. The DOCX is a list of prompts, not a completed answer key. No original files, bank questions, grading, progress keys or scores were changed in this follow-up.

Potentiometer appears in the supplied quiz Q21 and Q47, site multiple-choice Q45 and recall Q45. It does not appear by name in the DOCX study aid. Rheostat is also named in quiz Q21 and site Q45, not in the DOCX. Existing short notes were expanded into definitions, operating distinctions and the source quiz's volume-control example. Related vocabulary is explained within its existing topic rather than duplicating headings.

| Vocabulary | Course source | Site choice / one-word coverage | Notes action |
| --- | --- | --- | --- |
| Potentiometer, rheostat | Quiz Q21; potentiometer application Q47 | Choice Q45 compares both; recall Q45 asks potentiometer | Define both, wiper and voltage divider; add volume control |
| Piezoelectric material | Quiz Q42; aid's pressure source | Q15 / recall Q15 | Explain deformation-to-voltage relationship |
| Thermocouple, photovoltaic cell | Examples explaining aid's heat/light sources; not explicitly named in aid | Q16-17 / recall Q16-17 | Define the devices and source relationship |
| EMF, electromagnetic induction | Aid voltage/EMF and magnetism prompts | Q19,22 / recall Q19,22 | Define EMF, changing flux and induction |
| Nichrome, resistivity | Quiz Q15; aid resistance factors | Q9 / recall Q9 | Define alloy and material property |
| Galvanometer | Aid needle-deflection prompt | Q46 / recall Q46 | Define movement and magnetic torque |
| Sensitivity, full-scale deflection | Quiz Q16 | Q47 / recall Q47 | Separate definitions |
| Damping, electrical damping | Quiz Q22 | Q48 / recall Q48 test purpose | Define damping; identify source method |
| Shunt, multiplier resistor | Aid meter additional circuitry; quiz Q11,Q32 | Q52,54 / recall Q52,54 | Define parallel bypass versus series resistor; distinguish colour-band multiplier |
| Ammeter, voltmeter, ohmmeter | Aid meter prompts; quiz Q9-11,Q26-27,Q38,Q44,Q49 | Q50-56 / recall Q50-56 | Add explicit instrument definitions with existing connection precautions |
| Megohmmeter | Aid high-resistance instrument; quiz Q37 | Q57-58 / recall Q57-58 | Define insulation resistance test and its elevated test voltage |
| DMM, resolution, accuracy | Aid resolution and low-battery prompts; quiz Q14,Q24 | Q59-61 / recall Q59-61; accuracy is a distinction in Q60 | Define separately and retain qualified accuracy comparison |
| Wheatstone bridge | Quiz Q39,Q45 | Q62 / recall Q62 | Define resistance comparison and balanced detector |
| Oscilloscope, waveform, cycle, period, frequency | Aid signal-analysis prompt; quiz Q3,Q19,Q35 | Q63-64 / recall Q63-64 | Define each term separately; retain time-versus-amplitude distinction |

Remaining question-coverage limits: volume control is now in condensed notes, but has no separate application question; rheostat has no dedicated one-word answer prompt; electrical damping's method is not directly asked (only its purpose); analog ohms-zero calibration has no separate question. These are practice-depth gaps, not claims that the terms are absent. No unrelated advanced topics such as thermistors, transducers, capacitance or inductance were added as new syllabus requirements.

Supporting references: the FAA General Handbook's variable-resistor discussion and Fluke's accuracy/resolution explanation supplement the user's course prompts. They clarify definitions rather than expand the course scope. The DOCX and supplied quiz remain the source for what is in this module.
