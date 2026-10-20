import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { humanFactorsQuestions } from "./humanFactorsPractice.js";
import { dashboardTests } from "./studyDashboard.js";

test("Human Factors keeps source answers and covers all twelve factors and PEAR without fire/shop questions", () => {
  assert.equal(humanFactorsQuestions.length, 32);
  assert.equal(new Set(humanFactorsQuestions.map(q => q.id)).size, 32);
  const sources = ["test1", "test2", "recall"].map(name => JSON.parse(readFileSync(new URL(`safety-module1-${name}.json`, import.meta.url), "utf8")));
  for (const q of humanFactorsQuestions) {
    const original = sources[q.source.bank - 1].find(item => item.id === q.source.questionId);
    assert.equal(q.prompt, original.prompt);
    assert.deepEqual(q.options, original.options);
    assert.equal(q.correctIndex, original.correctIndex);
    assert.equal(q.explanation, original.explanation);
    assert.ok(!/fire-|symbol-|ppe|storage|housekeeping/.test(q.learningTarget));
  }
  for (const target of ["pear-people", "pear-environment", "pear-actions", "pear-resources", "communication-identification", "complacency-identification", "knowledge-identification", "distraction-identification", "teamwork-identification", "fatigue-identification", "resources-identification", "pressure-identification", "assertiveness-identification", "stress-definition", "awareness-identification", "norms-identification"]) {
    assert.ok(humanFactorsQuestions.some(q => q.learningTarget === target), target);
  }
  const registered = dashboardTests.find(t => t.slug === "safety-human-factors");
  assert.equal(registered.questions, humanFactorsQuestions);
  assert.equal(registered.storageId, "/study/safety/module-1/practice-4");
});
