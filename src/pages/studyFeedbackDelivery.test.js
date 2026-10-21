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
      assert.ok(options.body instanceof FormData);
      assert.equal(options.headers["Content-Type"], undefined);
      assert.deepEqual(Object.fromEntries(options.body), {
        _subject: "Aviation Study: Test request", _template: "table", type: "Test request",
        course: "Structures", message: "Please add measuring tool identification.",
      });
      return response(success);
    });
  }
});

test("an optional image is sent as a real multipart attachment and invalid files never submit", async () => {
  const image = new File([new Uint8Array([137, 80, 78, 71])], "screenshot.png", { type: "image/png" });
  await sendStudyFeedback({ ...draft, image }, async (url, options) => {
    const attached = options.body.get("attachment");
    assert.equal(attached.name, image.name);
    assert.equal(attached.type, image.type);
    assert.deepEqual(await attached.arrayBuffer(), await image.arrayBuffer());
    return response(true);
  });
  for (const invalid of [new File(["x"], "bad.html", { type: "text/html" }), new File([], "empty.png", { type: "image/png" }), new File([new Uint8Array(10_000_001)], "large.png", { type: "image/png" })]) {
    await assert.rejects(sendStudyFeedback({ ...draft, image: invalid }, async () => assert.fail("Must not submit invalid images")), /Choose/);
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
