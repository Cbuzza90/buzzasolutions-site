import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import baseline from "./distractorRevisionBaseline.json" with { type: "json" };
import { dashboardTests } from "./studyDashboard.js";
import { safetyModule2Choice } from "./safetyModule2.js";
import { systemsModule2Medium } from "./systemsModule2.js";
import { bankSignature, previousBankSignature, newPracticeAttempt, savePracticeAttempt, restorePracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { typedSignature } from "../pages/typedPracticeLogic.js";

const semantic = qs => createHash("sha256").update(JSON.stringify(qs.map(q => ({ id: q.id, prompt: q.prompt, answer: q.answer ?? q.options[q.correctIndex], acceptedAnswers: q.acceptedAnswers, explanation: q.explanation, source: q.source, diagram: q.diagram })))).digest("hex");
const oldBank = qs => qs.map(q => q.previousOptions ? { ...q, options: q.previousOptions, correctIndex: q.previousOptions.indexOf(q.options[q.correctIndex]) } : q);

test("Safety and Systems revise choices without changing any of 30 routes' answers, prompts, sources, diagrams or recall tests", () => {
  let changed = 0;
  for (const original of baseline) {
    const current = dashboardTests.find(t => t.path === original.path);
    assert.ok(current, original.path);
    assert.equal(current.questions.length, original.count);
    assert.equal(semantic(current.questions), original.semantic, original.path);
    if (original.kind === "typed") assert.equal(typedSignature(current.questions), original.signature);
    else {
      assert.equal(previousBankSignature(current.questions), original.signature, original.path);
      for (const q of current.questions) {
        assert.equal(q.options.length, 4, q.id);
        assert.equal(new Set(q.options.map(s => s.toLowerCase().trim())).size, 4, q.id);
        if (q.previousOptions && JSON.stringify(q.previousOptions) !== JSON.stringify(q.options)) changed++;
      }
    }
  }
  assert.ok(changed > 300, "Repair the affected families, not only a few sample questions");
  const supervisor = safetyModule2Choice.find(q => q.learningTarget === "supervisor");
  assert.ok(supervisor.options.filter((_, i) => i !== supervisor.correctIndex).every(s => /attendant|entrant|rescue-team/i.test(s)));
  const pump = systemsModule2Medium.find(q => q.learningTarget === "vane-drive");
  assert.ok(pump.options.some(s => /electric motor/.test(s)));
  assert.ok(!pump.options.some(s => /backup ring|filter cleaning|level pointer/.test(s)));
});

test("old shuffled attempts retain the exact choices, grading and best score; reset starts the improved choices", () => {
  for (const original of baseline.filter(p => p.kind === "choice")) {
    const current = dashboardTests.find(t => t.path === original.path);
    const old = oldBank(current.questions);
    assert.equal(bankSignature(old), original.signature);
    const data = new Map(), storage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
    const attempt = newPracticeAttempt(old, () => 0.37);
    attempt.position = 1;
    const [first, second] = attempt.order;
    attempt.answers[first.id] = (first.correctIndex + 1) % 4;
    attempt.answers[second.id] = second.correctIndex;
    savePracticeAttempt(old, current.storageId, attempt, storage);
    recordHighestScore(old, current.storageId, old.length - 1, storage);
    const key = `study-practice:progress:${current.storageId}`;
    const restored = restorePracticeAttempt(current.questions, JSON.parse(data.get(key)));
    assert.ok(restored, current.path);
    assert.equal(restored.position, 1);
    assert.deepEqual(restored.answers, attempt.answers);
    assert.deepEqual(restored.order.map(q => q.options), attempt.order.map(q => q.options));
    assert.equal(restored.order[0].options[restored.order[0].correctIndex], first.options[first.correctIndex]);
    assert.notEqual(restored.answers[first.id], restored.order[0].correctIndex);
    assert.equal(restored.answers[second.id], restored.order[1].correctIndex);
    assert.equal(loadHighestScore(current.questions, current.storageId, storage).score, old.length - 1);
    // Saving a continued old attempt under the current bank version must reload.
    savePracticeAttempt(current.questions, current.storageId, restored, storage);
    assert.ok(restorePracticeAttempt(current.questions, JSON.parse(data.get(key))));
    const reset = newPracticeAttempt(current.questions, () => 0.37);
    assert.ok(reset.order.every(q => current.questions.find(c => c.id === q.id).options.every(o => q.options.includes(o))));
    savePracticeAttempt(current.questions, current.storageId, reset, storage);
    assert.equal(loadHighestScore(current.questions, current.storageId, storage).score, old.length - 1);
    const corrupt = JSON.parse(data.get(key));
    corrupt.order[0].options[0] = "An unrecognized replacement choice";
    assert.equal(restorePracticeAttempt(current.questions, corrupt), null);
  }
});
