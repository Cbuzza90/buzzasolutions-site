# Study feedback

The home-page feedback button opens `/study/feedback`. Students choose a feedback type, optionally name a course and enter their message. The page submits directly to FormSubmit's AJAX endpoint for `chriswilliambuzza@gmail.com`. It does not open a mail application. Existing business contact forms are unchanged.

FormSubmit setup requires the recipient to click the one-time Activate Form email. A setup request was made on October 21, 2026; the provider responded that it sent the activation email. Delivery remains pending until the recipient activates it. The setup request was labelled as a website setup check, not a real student complaint.

Requests include only the entered type/course/message and subject/template settings. No quiz answers, grades, account data or browser draft are attached automatically. Drafts persist in session storage for the current browser tab. Confirmed provider acceptance clears the draft; errors, offline/timeout conditions and activation responses retain it. The UI says submitted only after an HTTP-success response with a boolean true or string "true" success field and no activation notice. This confirms provider acceptance, not inbox delivery. No live student submission has been sent to verify inbox receipt.

Reference: https://formsubmit.co/documentation and https://formsubmit.co/ajax-documentation. No API key or SMTP credential is stored in the browser. A mocked transport suite covers payload/recipient, success, HTTP-200 failures, activation, network failures and input limits without sending real messages.
