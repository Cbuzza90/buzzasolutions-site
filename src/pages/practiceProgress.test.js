import { test } from "node:test";
import assert from "node:assert/strict";
import { bankSignature, loadHighestScore, loadPracticeAttempt, newPracticeAttempt, nextEndlessRound, practiceSummary, recordHighestScore, restorePracticeAttempt, savePracticeAttempt } from "./practiceProgress.js";
import { endlessTorqueQuestions } from "../data/torqueTest.js";
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

test("endless rounds continue with cumulative scores, no immediate repeat, and resumable state", () => {
  const storage = memoryStorage();
  let attempt = newPracticeAttempt(questions, () => 0.5);
  for (let round = 0; round < 4; round++) {
    attempt.position = questions.length - 1;
    attempt.answers = Object.fromEntries(attempt.order.map(q => [q.id, q.correctIndex]));
    const last = attempt.order.at(-1).id;
    attempt = nextEndlessRound(questions, attempt, () => 0.5);
    assert.notEqual(attempt.order[0].id, last);
    assert.equal(attempt.complete, false);
    assert.equal(attempt.completedRounds, round + 1);
    assert.equal(attempt.previousCorrect, (round + 1) * questions.length);
    assert.equal(savePracticeAttempt(questions, "/endless", attempt, storage), true);
    assert.deepEqual(loadPracticeAttempt(questions, "/endless", storage), attempt);
  }
});

test("20-question samples resume and retain scores out of 20 rather than the whole bank", () => {
  const storage = memoryStorage();
  const pool = endlessTorqueQuestions;
  const attempt = newPracticeAttempt(pool, () => 0.1, 20);
  assert.equal(attempt.order.length, 20);
  assert.equal(new Set(attempt.order.map(q => q.id)).size, 20);
  attempt.position = 19;
  attempt.answers = Object.fromEntries(attempt.order.map((q, index) => [q.id, index < 18 ? q.correctIndex : (q.correctIndex + 1) % 4]));
  attempt.complete = true;
  assert.equal(scoreAnswers(attempt.order, attempt.answers), 18);
  savePracticeAttempt(pool, "/torque:20", attempt, storage);
  assert.deepEqual(loadPracticeAttempt(pool, "/torque:20", storage, 20), attempt);
  const result = recordHighestScore(pool, "/torque:20", 18, storage, 20);
  assert.equal(result.best.total, 20);
  assert.equal(recordHighestScore(pool, "/torque:20", 21, storage, 20).saved, false);
  const reset = newPracticeAttempt(pool, () => 0.9, 20);
  assert.notDeepEqual(reset.order.map(q => q.id), attempt.order.map(q => q.id));
  savePracticeAttempt(pool, "/torque:20", reset, storage);
  assert.equal(loadHighestScore(pool, "/torque:20", storage, 20).score, 18);
  const summary = practiceSummary(pool, "/torque:20", storage, 20);
  assert.equal(summary.answered, 0);
  assert.equal(summary.best.total, 20);
});
