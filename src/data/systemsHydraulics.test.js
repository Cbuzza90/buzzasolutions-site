import { test } from "node:test";
import assert from "node:assert/strict";
import { gradeSystemsHydraulics, systemsHydraulicsQuestions } from "./systemsHydraulics.js";

test("all 50 PDF questions and answer-key entries are present and grade correctly", () => {
  assert.equal(systemsHydraulicsQuestions.length, 50);
  systemsHydraulicsQuestions.forEach((question, index) => {
    assert.equal(question.id, index + 1);
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

test("all calculated values accept supplied units or a bare number", () => {
  const key = {37: 1500, 42: 800, 43: 3600, 44: 72, 45: 3000, 46: 960, 47: 1, 48: 660000, 49: 330000, 50: 10};
  Object.entries(key).forEach(([id, value]) => {
    assert.ok(gradeSystemsHydraulics(Number(id), String(value)).correct);
    assert.equal(gradeSystemsHydraulics(Number(id), String(value + 1)).correct, false);
  });
  [[42, "800 lb/in²"], [43, "3,600 lbf"], [44, "72 in^3"], [44, "72 cubic inches"], [47, "1 inch"], [48, "660,000 ft-lb"], [49, "330000 ft-lb/min"], [50, "10 horsepower"]].forEach(([id, answer]) => assert.ok(gradeSystemsHydraulics(id, answer).correct, answer));
  assert.equal(gradeSystemsHydraulics(42, "800 lb").correct, false);
  assert.equal(gradeSystemsHydraulics(49, "330000 ft-lb").correct, false);
  assert.equal(gradeSystemsHydraulics(42, "800 or 900 psi").correct, false);
  assert.equal(gradeSystemsHydraulics(42, "").correct, false);
});
