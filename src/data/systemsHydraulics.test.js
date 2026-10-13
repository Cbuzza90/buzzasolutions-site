import { test } from "node:test";
import assert from "node:assert/strict";
import { gradeSystemsHydraulics, systemsHydraulicsQuestions } from "./systemsHydraulics.js";

test("all 40 concept questions and answer-key entries are present and grade correctly", () => {
  assert.equal(systemsHydraulicsQuestions.length, 40);
  systemsHydraulicsQuestions.forEach((question) => {
    assert.ok(question.prompt && question.answer);
    assert.ok(!`${question.prompt}${question.answer}`.includes("�"));
    assert.ok(gradeSystemsHydraulics(question.id, question.answer).correct, `${question.id}: ${question.answer}`);
  });
});

test("answer-key alternative spellings and phrases are accepted", () => {
  [[2, "pascals law"], [15, "purple"], [19, "open-center system"], [21, "closed center"], [26, "inline"], [30, "bootstrapping"], [32, "pressure relief valve"], [32, "system pressure relief valve"], [34, "pressure-reducing valve"], [39, "disk"]].forEach(([id, answer]) => assert.ok(gradeSystemsHydraulics(id, answer).correct, answer));
  assert.deepEqual(gradeSystemsHydraulics(23, "accumlator"), { correct: true, close: true });
});

test("nearby but incorrect concepts are not accepted as spelling errors", () => {
  assert.equal(gradeSystemsHydraulics(3, "weight").correct, false);
  assert.equal(gradeSystemsHydraulics(6, "decreases").correct, false);
  assert.equal(gradeSystemsHydraulics(18, "5607").correct, false);
  assert.equal(gradeSystemsHydraulics(19, "closed centre").correct, false);
  assert.equal(gradeSystemsHydraulics(21, "open centre").correct, false);
});

test("calculation questions are excluded from the bank and cannot be graded", () => {
  [37, 42, 43, 44, 45, 46, 47, 48, 49, 50].forEach(id => {
    assert.ok(!systemsHydraulicsQuestions.some(question => question.id === id));
    assert.equal(gradeSystemsHydraulics(id, "800").correct, false);
  });
});
