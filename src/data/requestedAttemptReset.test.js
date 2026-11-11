import { test } from "node:test";
import assert from "node:assert/strict";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { loadPracticeAttempt, newPracticeAttempt, savePracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { loadTypedAttempt, newTypedAttempt, saveTypedAttempt, recordTypedBest, loadTypedBest } from "../pages/typedPracticeLogic.js";

test("requested reset restarts old Safety/Systems attempts once, keeps bests and resumes new attempts", () => {
  for (const entry of dashboardTests.filter(item => ["choice", "typed"].includes(item.kind) && !item.count)) {
    const { questions, storageId, kind } = entry;
    const scoped = /^\/study\/(safety|systems)\//.test(storageId);
    const data = new Map();
    const storage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
    const typed = kind === "typed";
    const create = typed ? newTypedAttempt : newPracticeAttempt;
    const save = typed ? saveTypedAttempt : savePracticeAttempt;
    const load = typed ? loadTypedAttempt : loadPracticeAttempt;
    const recordBest = typed ? recordTypedBest : recordHighestScore;
    const loadBest = typed ? loadTypedBest : loadHighestScore;
    const attempt = create(questions, () => 0.37);
    attempt.answers[attempt.order[0].id] = typed ? attempt.order[0].answer : attempt.order[0].correctIndex;
    save(questions, storageId, attempt, storage);
    recordBest(questions, storageId, 1, storage);
    const key = `study-practice:${typed ? "typed-progress" : "progress"}:${storageId}`;
    const legacy = JSON.parse(data.get(key));
    delete legacy.attemptRevision;
    data.set(key, JSON.stringify(legacy));
    for (const complete of [false, true]) {
      if (complete) {
        legacy.position = questions.length - 1;
        legacy.complete = true;
        legacy.answers = Object.fromEntries(attempt.order.map(q => [q.id, typed ? q.answer : q.correctIndex]));
      }
      data.set(key, JSON.stringify(legacy));
      const restored = load(questions, storageId, storage);
      assert.equal(Object.keys(restored.answers).length, scoped ? 0 : Object.keys(legacy.answers).length, entry.path);
      assert.equal(restored.complete, scoped ? false : complete, entry.path);
      assert.equal(savedTestSummary(entry, storage).answered, scoped ? 0 : Object.keys(legacy.answers).length, entry.path);
      assert.equal(loadBest(questions, storageId, storage).score, 1, entry.path);
    }
    // A new attempt is marked with the release revision and survives reload.
    save(questions, storageId, attempt, storage);
    assert.deepEqual(load(questions, storageId, storage), attempt, entry.path);
    assert.equal(savedTestSummary(entry, storage).answered, 1, entry.path);
    assert.equal(loadBest(questions, storageId, storage).score, 1, entry.path);
    if (scoped && !typed) {
      assert.ok(load(questions, storageId, storage).order.every(q => questions.find(item => item.id === q.id).options.every(option => q.options.includes(option))), entry.path);
    }
  }
});
