# Technical Publications: ATA chapter practice

Source: the user's `ATA A3.01_ A3.08_ AB.02.pptx`, supplied 2026-10-30. All 31 slides were extracted for inspection. Chapter entries come only from the tables on slides 8–13. The introduction on slides 6–7 supports the notes' ATA expansion and chapter-pairing explanation.

Scope: the 63 listed chapters in the requested inclusive range 05–79. The table's unlisted numbers 13–17, 19, 43, 58–60 and 68–69 are excluded. Chapters 00–04 and 80+ are outside the request. No chapter names are invented for gaps. Names follow the course deck, including 45 Diagnostic and Maintenance System, 66 Rotor Blade / Tail Pylon and 75 Bleed Air; alternate names in other editions are not graded as this course's answer key.

The 63 chapter numbers, normalized names and slide numbers were compared programmatically against the original PowerPoint XML table cells. All match. Temporary source text and the comparison result remain under `tmp/ata-techpub/` and are not published.

Implementation:

- Course: `publications`, existing Technical Publications/Documents card, now enabled.
- Module: `/study/publications/module-2`, aligned with the existing Module 2 course entry/test schedule.
- Test: `/study/publications/module-2/ata-codes`.
- Bank: 126 multiple-choice questions, one code-to-name and one name-to-code question per chapter. Four distinct choices use neighbouring listed chapters from the same group.
- Attempt: one complete test, as explicitly requested by the user. Every attempt contains all 126 questions, covering every one of the 63 listed chapters in both directions. The shared engine randomizes question order and choices and saves the full attempt, choices, grading and progress. There is no sampling or split into parts.
- Score: independent highest score out of 126. Reset preserves it.
- Notes: exact Module 2 registration, condensed chapter tables grouped as in the deck, all ATA acronym letters and explicit scope/wording notes. All 126 question references are searchable. Notes remain below answers during multiple-choice practice.
- Navigation: Courses / Reset Test / Tests recognizes the custom `ata-codes` route. The dashboard registry supports module Continue studying and course activity.

Checks cover exact chapter scope, both directions, unique options, key source examples, complete 63-chapter/two-direction coverage in every shuffled attempt, independent persistence, reset retaining best score, search for every chapter and question, and custom route recognition. Full test suite, lint and production build are required. Shared note dialog/layout code is unchanged; no new chart or nested image tool is introduced.

The full test uses a separate `:full:v1` persistence key. The earlier unshipped 30-question draft key is not overwritten. The user explicitly requested a single complete test in place of short sampled sessions.
