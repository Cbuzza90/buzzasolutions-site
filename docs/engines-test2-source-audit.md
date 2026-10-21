# Engines Test 2 source audit

## Source and scope

Source: user-supplied `AMEM10057_Test2_Condensed_Codex.pdf`, three pages, dated 21 October 2026. Text was extracted with pypdf and all three pages were rendered and visually inspected. This is a combined source digest, not the original lecture slides or an aircraft maintenance manual; references to original review slides are the references given by the digest, not a claim those slides were independently inspected. The source's embedded “For Codex” directions were treated as document content, not as authorization or instructions overriding the user's request.

Source SHA-256: `1b5bd8f6260a9620e4ad979dbfa184226e9b95b6a12ab0badabbfcea3c7dd969`.

Section 1 contains 31 numbered instructor-review entries. Section 2 contains supporting Oil D13.01/D13.02 and D13.03 lecture facts. The review-only bank uses only Section 1 learning targets, with matching/grouped facts split into individual questions. The broader bank includes the entire review plus lecture facts and applied scenarios distinguishing the four valve roles.

## Tests and routes

- Engines course → **Test 2**, `/study/engines/module-2` (route grouping; the UI does not invent a numbered teaching module).
- **Review Questions**, `/practice-1`: 61 four-choice questions covering all 31 review entries. No lecture-only questions appear here.
- **Notes & Review Practice**, `/practice-2`: 106 four-choice questions, including the review and 45 lecture/application questions.
- Both use the shared MultipleChoicePractice engine, with independent attempts and highest scores. All questions are included in each shuffled attempt; resets reshuffle and retain the best score.
- Exact-module searchable study notes are registered. Review references are listed once, and the broader test's additional questions are registered separately to avoid repeated shared references.
- Notes can be opened during a quiz from below the answer options and closed without resetting progress, using the shared notes engine. No one-word test was requested or added.
- The user's existing local **MAKE SURE YOU CAN READ ALL FOUR** Structures simulator warning is included in the same release.

## Coverage

Review source coverage is asserted for every entry 1–31. Each of three friction types and six lubricant functions is addressed separately. Cloud/pour, flash/fire and both meanings of W are separate targets. Wet/dry storage, scavenge return, pressure/splash, tanks, pumps, all four named filter types, each valve's role, indication, cooling, inspection and dilution are included in notes and questions.

The lecture extension covers internal fluid friction, horsepower loss, heat transport, preservation, Saybolt/SAE detail, multigrades, synthetics and mixing cautions, shipping oil, history, wet-sump limitations, intake heat exchange, dry-sump capacity, tank design, filter placement/full flow/servicing, pressure risks and pickup, temperature and quantity sensing, filter inspection, cooler testing and dilution timing/evaporation. Extra scenarios distinguish clogged-filter bypass, cold thermostatic bypass, congealed-oil surge protection and system pressure regulation.

The source is explicitly image-free. No unseen diagrams or original slides are claimed as incorporated.

## Source ambiguities and qualifications

- Review Q4 says “six others,” but the digest lists six total functions including friction reduction. Questions use those six named functions, not seven invented functions.
- Review Q9's “within 5 F” pour-point statement lacks a clear direction/selection rule. Notes flag this; no exact numerical selection rule is graded.
- Review Q18's “expansion space of 10% greater than tank capacity or 0.5 US gal” wording has an unclear capacity basis. Questions cover expansion, venting and marking without silently normalizing that phrase into a universal numerical rule.
- Source-specific figures (15–20 seconds, 35–90 psi, 30 days, 25 hours and stated temperature/reference values) are labelled as course examples. They do not replace aircraft/engine-specific approved limits.
- Straight-mineral break-in oil, synthetic suitability, leaded-fuel cautions, brand/mineral/synthetic mixing and preservation statements are scoped to the supplied material, with manufacturer approval governing actual servicing.
- W in a multigrade winter rating and the aviation-prefix W100 example are distinct.
- Hydraulic-lock questions cover the condition, location and damage. They do not turn the digest's hand-turning/draining description into a generic operational procedure.
- Pressure regulation, filter bypass, thermostatic cooler bypass and pressure-operated cooler surge protection are different functions; the banks explicitly test that distinction.
- All numerical questions are direct recognition of supplied facts, not calculations, consistent with the existing non-Math-course standard.

## Verification

Checks cover complete review-entry mapping, valid source page/slide ranges, unique IDs, four distinct options, answer integrity after shuffling, source-backed W meanings and valve keys, exact-module per-question search, condensed-topic search, and independent save/resume/best-score preservation across reset. Shared notes/navigation behaviour is reused without changing the notes UI. No live browser verification is claimed.

Temporary source extraction and render files remain in `tmp/` and are not committed. The uploaded PDF is not committed or published.
