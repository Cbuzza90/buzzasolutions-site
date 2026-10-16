import test from "node:test";
import assert from "node:assert/strict";
import { dashboardTests, loadDashboard, savedTestSummary } from "./studyDashboard.js";
import { newPracticeAttempt, savePracticeAttempt } from "../pages/practiceProgress.js";
import { newTypedAttempt, saveTypedAttempt } from "../pages/typedPracticeLogic.js";
const memory = () => { const map = new Map(); return { getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) }; };

test("dashboard reads do not create attempts, and drafts resume independently from choice progress", () => {
  const storage = memory();
  assert.ok(loadDashboard(storage).every(s => !s.attempt && !s.unfinished));
  const typed = dashboardTests.find(t => t.slug === "electricity-word");
  const attempt = { ...newTypedAttempt(typed.questions), draft: "unfinished" };
  saveTypedAttempt(typed.questions, typed.storageId, attempt, storage);
  const summary = savedTestSummary(typed, storage);
  assert.equal(summary.unfinished, true);
  assert.equal(summary.answered, 0);
  assert.ok(summary.updatedAt);
  assert.equal(savedTestSummary(dashboardTests[0], storage).attempt, undefined);
});
test("old saves show no invented activity date, and invalid saves cannot recommend questions", () => {
  const storage = memory(), bank = dashboardTests[0], attempt = newPracticeAttempt(bank.questions);
  savePracticeAttempt(bank.questions, bank.storageId, attempt, storage);
  const key = `study-practice:progress:${bank.storageId}`, record = JSON.parse(storage.getItem(key));
  delete record.updatedAt;
  storage.setItem(key, JSON.stringify(record));
  assert.equal(savedTestSummary(bank, storage).updatedAt, null);
  record.signature = "outdated";
  storage.setItem(key, JSON.stringify(record));
  assert.equal(savedTestSummary(bank, storage).missed.length, 0);
});

test("Easy Electricity saves and resumes independently from Medium and Hard", () => {
  const storage = memory();
  const easy = dashboardTests.find(t => t.slug === "electricity-easy");
  const medium = dashboardTests.find(t => t.slug === "electricity-choice");
  const hard = dashboardTests.find(t => t.slug === "electricity-word");
  const attempt = newPracticeAttempt(easy.questions);
  attempt.answers[attempt.order[0].id] = attempt.order[0].correctIndex;
  savePracticeAttempt(easy.questions, easy.storageId, attempt, storage);
  assert.equal(easy.path, "/study/electricity/module-1/practice-2");
  assert.equal(savedTestSummary(easy, storage).answered, 1);
  assert.equal(savedTestSummary(easy, storage).unfinished, true);
  assert.equal(savedTestSummary(medium, storage).attempt, undefined);
  assert.equal(savedTestSummary(hard, storage).attempt, undefined);
});
