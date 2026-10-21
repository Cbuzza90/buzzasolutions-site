import { test } from "node:test";
import assert from "node:assert/strict";
import { feedbackEmail, feedbackEndpoint, sendStudyFeedback } from "./studyFeedbackDelivery.js";

const draft = { type: "Test request", course: " Structures ", message: " Please add measuring tool identification. " };
const response = (success, message = "Thanks!", ok = true) => ({ ok, json: async () => ({ success, message }) });

test("feedback goes directly to the corrected recipient with only the entered fields", async () => {
  for (const success of [true, "true"]) {
    await sendStudyFeedback(draft, async (url, options) => {
      assert.equal(feedbackEmail, "chriswilliambuzza@gmail.com");
      assert.equal(url, feedbackEndpoint);
      assert.ok(url.endsWith(feedbackEmail));
      assert.equal(options.method, "POST");
      assert.deepEqual(JSON.parse(options.body), {
        _subject: "Aviation Study: Test request", _template: "table", type: "Test request",
        course: "Structures", message: "Please add measuring tool identification.",
      });
      return response(success);
    });
  }
});

test("HTTP 200 failures and email activation are never reported as successful feedback", async () => {
  for (const result of [response(false), response("false"), response(true, "Thanks", false), response(undefined)]) {
    await assert.rejects(sendStudyFeedback(draft, async () => result), /could not be submitted/);
  }
  await assert.rejects(sendStudyFeedback(draft, async () => response("true", "This form needs Activation")), /awaiting confirmation/);
  await assert.rejects(sendStudyFeedback(draft, async () => { throw new TypeError("offline"); }), /offline/);
  assert.equal(draft.message, " Please add measuring tool identification. ");
});

test("blank, oversized or unknown-type feedback never makes a network request", async () => {
  for (const invalid of [{ ...draft, message: "  " }, { ...draft, message: "x".repeat(2001) }, { ...draft, course: "x".repeat(101) }, { ...draft, type: "unknown" }]) {
    await assert.rejects(sendStudyFeedback(invalid, async () => assert.fail("Must not submit invalid feedback")), /Check your feedback/);
  }
});
