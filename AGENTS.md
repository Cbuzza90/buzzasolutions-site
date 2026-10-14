# Aviation practice site

## User's practice-test standard

- Every new or expanded practice test should have condensed, searchable study notes, reachable from its test list and during the quiz without losing progress.
- Use the shared `MultipleChoicePractice` engine and `StudyNotesGuide` / `CourseStudyNotes` components. Register source-based notes for the exact module in `src/data/courseStudyNotes.js`. The engine automatically exposes registered notes during the quiz and results review.
- Derive notes and correct answers from the user's course reviews, study aids, answer keys and diagrams. Ask the user which missing review material is needed when a new module lacks a reliable source; do not substitute another module's notes or invent details.
- Expand grouped concepts individually: all acronym letters, every item in a matching set, each valve role, each law, each fluid/seal pairing. Use images where accurate and relevant, with labels/legends and enlargement.
- All active tests are multiple choice with four distinct, plausible options. Do not use choices referring to shuffled answer letters, such as “both A and B”.
- No numerical calculations outside the Math course. Conceptual relationships and chart lookup are allowed.
- Preserve mobile layouts, clear correct/incorrect labels, bottom navigation and modal footer controls. Opening/closing notes and nested diagrams must preserve quiz progress.
- Report ambiguities or errors in source material; do not silently copy an ambiguous answer key.

## Checks

Run lint, relevant existing bank/coverage checks, and a production build. Verify search, notes closing, any nested reference tools, and phone layout when changing the notes experience. Stage source files explicitly; do not commit attachments or `tmp/` previews.
