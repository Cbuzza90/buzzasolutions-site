import { test } from "node:test";
import assert from "node:assert/strict";
import { bankSignature, loadHighestScore, loadPracticeAttempt, newPracticeAttempt, practiceSummary, recordHighestScore, restorePracticeAttempt, savePracticeAttempt } from "./practiceProgress.js";
import { scoreAnswers } from "./safetyTestLogic.js";

const questions = [
  { id: 1, prompt: "First", options: ["one", "two", "three", "four"], correctIndex: 1, optionImages: ["a", "b", "c", "d"] },
  { id: "2-a", prompt: "Second", options: ["red", "blue", "green", "yellow"], correctIndex: 2 },
  { id: 3, prompt: "Third", options: ["spring", "pump", "valve", "filter"], correctIndex: 0 }
];
const testId = "/study/safety/module-1/practice-1";
function memoryStorage() {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), data };
}
function savedRecord(storage) { return JSON.parse(storage.getItem(`study-practice:progress:${testId}`)); }

test("resume preserves shuffled order, selected answer, grading and paired images", () => {
  const storage = memoryStorage();
  const attempt = newPracticeAttempt(questions, () => 0);
  attempt.answers[attempt.order[0].id] = attempt.order[0].correctIndex;
  attempt.position = 1;
  attempt.answers[attempt.order[1].id] = (attempt.order[1].correctIndex + 1) % 4;
  assert.equal(savePracticeAttempt(questions, testId, attempt, storage), true);
  const resumed = loadPracticeAttempt(questions, testId, storage);
  assert.deepEqual(resumed, attempt);
  assert.equal(scoreAnswers(resumed.order, resumed.answers), 1);
  const imageQuestion = resumed.order.find(q => q.id === 1);
  imageQuestion.options.forEach((option, i) => assert.equal(imageQuestion.optionImages[i], questions[0].optionImages[questions[0].options.indexOf(option)]));
});

test("completed results survive reload, and resetting progress keeps the highest score", () => {
  const storage = memoryStorage();
  const attempt = newPracticeAttempt(questions, () => 0);
  attempt.position = 2;
  attempt.complete = true;
  attempt.answers = Object.fromEntries(attempt.order.map(q => [q.id, q.correctIndex]));
  savePracticeAttempt(questions, testId, attempt, storage);
  recordHighestScore(questions, testId, 3, storage);
  assert.equal(loadPracticeAttempt(questions, testId, storage).complete, true);
  savePracticeAttempt(questions, testId, newPracticeAttempt(questions), storage);
  const summary = practiceSummary(questions, testId, storage);
  assert.equal(summary.answered, 0);
  assert.equal(summary.complete, false);
  assert.equal(summary.best.score, 3);
});

test("lower scores cannot overwrite a higher score, including a fresher record from another tab", () => {
  const storage = memoryStorage();
  recordHighestScore(questions, testId, 1, storage);
  recordHighestScore(questions, testId, 3, storage);
  assert.equal(recordHighestScore(questions, testId, 2, storage).best.score, 3);
  assert.equal(loadHighestScore(questions, testId, storage).score, 3);
});

test("different tests have independent progress and high scores", () => {
  const storage = memoryStorage();
  const attempt = newPracticeAttempt(questions);
  attempt.answers[attempt.order[0].id] = 0;
  savePracticeAttempt(questions, testId, attempt, storage);
  recordHighestScore(questions, testId, 2, storage);
  const other = practiceSummary(questions, "/study/safety/module-1/practice-2", storage);
  assert.equal(other.answered, 0);
  assert.equal(other.best, null);
});

test("question-bank changes invalidate stale grading but source reordering does not", () => {
  const storage = memoryStorage();
  savePracticeAttempt(questions, testId, newPracticeAttempt(questions), storage);
  assert.equal(bankSignature(questions), bankSignature([...questions].reverse()));
  const changed = questions.map(q => q.id === 1 ? { ...q, correctIndex: 0 } : q);
  assert.equal(restorePracticeAttempt(changed, savedRecord(storage)), null);
});

test("malformed or inconsistent saves safely restart instead of skipping questions", () => {
  const storage = memoryStorage();
  savePracticeAttempt(questions, testId, newPracticeAttempt(questions), storage);
  const record = savedRecord(storage);
  assert.equal(restorePracticeAttempt(questions, { ...record, position: 2 }), null);
  assert.equal(restorePracticeAttempt(questions, { ...record, answers: { unknown: 0 } }), null);
  assert.equal(restorePracticeAttempt(questions, { ...record, complete: true }), null);
  assert.equal(restorePracticeAttempt(questions, { ...record, order: [record.order[0], record.order[0], record.order[2]] }), null);
  const badChoices = structuredClone(record);
  badChoices.order[0].options[0] = "unknown choice";
  assert.equal(restorePracticeAttempt(questions, badChoices), null);
  storage.setItem(`study-practice:progress:${testId}`, "broken JSON");
  assert.equal(loadPracticeAttempt(questions, testId, storage).position, 0);
});

test("storage failures do not break an attempt and are reported by saving helpers", () => {
  const storage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("quota"); } };
  const attempt = loadPracticeAttempt(questions, testId, storage);
  assert.equal(attempt.order.length, questions.length);
  assert.equal(savePracticeAttempt(questions, testId, attempt, storage), false);
  assert.equal(recordHighestScore(questions, testId, 2, storage).saved, false);
});
