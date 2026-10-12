import { test } from "node:test";
import assert from "node:assert/strict";
import { torontoDate, upcomingTests, visibleTests } from "./studySchedule.js";

test("test dates stay visible on the test day and expire the following day", () => {
  assert.equal(visibleTests(upcomingTests, "2026-10-14").length, 3);
  assert.deepEqual(visibleTests(upcomingTests, "2026-10-15").map(test => test.course), ["Systems", "Electricity"]);
  assert.deepEqual(visibleTests(upcomingTests, "2026-10-17").map(test => test.course), ["Electricity"]);
  assert.equal(visibleTests(upcomingTests, "2026-10-20").length, 0);
});

test("expiration follows Toronto midnight rather than UTC midnight", () => {
  assert.equal(torontoDate(new Date("2026-10-15T03:59:59Z")), "2026-10-14");
  assert.equal(torontoDate(new Date("2026-10-15T04:00:00Z")), "2026-10-15");
});

test("visible dates are sorted without changing the saved schedule", () => {
  const reverse = [...upcomingTests].reverse();
  assert.deepEqual(visibleTests(reverse, "2026-10-12"), upcomingTests);
  assert.equal(reverse[0].course, "Electricity");
});
