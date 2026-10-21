import { test } from "node:test";
import assert from "node:assert/strict";
import { legacyMeasuringToolsQuestions as oldBank, measuringToolsQuestions as bank } from "../data/measuringToolsPractice.js";
import { structuresPostedQuestions } from "../data/structuresPostedPractice.js";
import { migrateMeasuringToolsProgress, measuringToolsProgressKey as currentKey, legacyMeasuringToolsProgressKey as oldKey } from "./measuringToolsProgress.js";
import { newPracticeAttempt, savePracticeAttempt, readPracticeRecord, restorePracticeAttempt, recordHighestScore, loadHighestScore } from "./practiceProgress.js";

function memory() { const entries = new Map(); return { getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value) }; }
test("simulator reading targets leave both quiz pools while the legacy score bank remains intact", () => {
  const removed = ["thimble-turn", "sleeve-line", "thimble-line", "dial-revolution", "vernier-zero"];
  assert.equal(oldBank.length, 59);
  assert.equal(bank.length, 54);
  assert.ok(bank.some(q => q.learningTarget === "zero-check"), "Care/zero checks stay in the conceptual test");
  for (const target of removed) {
    assert.ok(!bank.some(q => q.learningTarget === target));
    assert.ok(!structuresPostedQuestions.some(q => q.learningTarget === target));
  }
});

test("an attempt paused on a removed scale question resumes with retained answers and a valid next question", () => {
  const storage = memory();
  const position = oldBank.findIndex(q => q.learningTarget === "thimble-turn");
  const old = { order: [...oldBank], position, answers: Object.fromEntries(oldBank.slice(0, position).map(q => [q.id, q.correctIndex])), complete: false, completedRounds: 0, previousCorrect: 0 };
  savePracticeAttempt(oldBank, oldKey, old, storage);
  const original = storage.getItem(`study-practice:progress:${oldKey}`);
  migrateMeasuringToolsProgress(storage);
  const migrated = restorePracticeAttempt(bank, readPracticeRecord("progress", currentKey, storage));
  assert.ok(migrated);
  assert.deepEqual(migrated.answers, old.answers);
  assert.equal(migrated.order[migrated.position].learningTarget, "anvil");
  assert.equal(storage.getItem(`study-practice:progress:${oldKey}`), original);
  const updated = storage.getItem(`study-practice:progress:${currentKey}`);
  migrateMeasuringToolsProgress(storage);
  assert.equal(storage.getItem(`study-practice:progress:${currentKey}`), updated);
});

test("completed attempts regrade only retained questions and keep the previous version's best score", () => {
  const storage = memory();
  const answers = Object.fromEntries(oldBank.map(q => [q.id, q.correctIndex]));
  answers[oldBank[0].id] = (oldBank[0].correctIndex + 1) % 4;
  const old = { order: [...oldBank], position: 58, answers, complete: true, completedRounds: 0, previousCorrect: 0 };
  savePracticeAttempt(oldBank, oldKey, old, storage);
  recordHighestScore(oldBank, oldKey, 58, storage);
  migrateMeasuringToolsProgress(storage);
  assert.equal(loadHighestScore(oldBank, oldKey, storage).score, 58);
  assert.equal(loadHighestScore(bank, currentKey, storage).score, 53);
  assert.equal(restorePracticeAttempt(bank, readPracticeRecord("progress", currentKey, storage)).complete, true);
});

test("an existing revised attempt is never replaced by migration", () => {
  const storage = memory();
  savePracticeAttempt(bank, currentKey, newPracticeAttempt(bank), storage);
  const original = storage.getItem(`study-practice:progress:${currentKey}`);
  savePracticeAttempt(oldBank, oldKey, newPracticeAttempt(oldBank), storage);
  migrateMeasuringToolsProgress(storage);
  assert.equal(storage.getItem(`study-practice:progress:${currentKey}`), original);
});
