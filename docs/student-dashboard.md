# Local student dashboard preview

The home page shows the browser-saving notice and course activity cards. Recommended review, Quick references and the standalone Next test card were removed after local review. The group test-date banner and course countdowns remain.

Each module starts with a Study Guide recommending multiple-choice practice followed by one-word recall. Modules without a one-word test say so. The blue Study notes link is the first module action. Continue studying appears within the module when it has an unfinished attempt, and uses only that exact module's saved progress. The previous Before you start panels were removed.

One-word recall tests do not offer study notes while answering. Module notes and post-completion notes remain available for preparation and review. Multiple-choice and chart practice retain their in-test notes.

No account service or remote storage was introduced. Browser data is shared by people using the same browser profile and does not sync to other devices. New saves include `updatedAt`. Existing saves remain compatible and display “Date unavailable · older save”; their recency is unknown. Reading saved progress does not create attempts.

Preview with `npm run dev` at http://127.0.0.1:5173/. These changes are for local review before publishing.

Module pages use a compact heading, a single study-tip line, a smaller Study notes link, and a short Continue studying link with saved question count. Test cards retain format, question count, progress and highest score with reduced padding. The previous large Study Guide and resume panels are removed.

The dashboard account notice and the introductory sentence beneath the dashboard title were removed at the user's request. Browser-local progress behavior is unchanged.
