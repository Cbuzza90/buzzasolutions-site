import { test } from "node:test";
import assert from "node:assert/strict";
import { diagramQuestions, gradeSystemsMixed, systemsMixedQuestions, systemsMixedReady } from "./systemsMixedTest.js";

const getQuestion = id => systemsMixedQuestions.find(question => question.id === id);

test("all 28 questions are usable, including the four supplied diagrams", () => {
  assert.equal(systemsMixedQuestions.length, 28);
  assert.deepEqual(diagramQuestions.map(question => question.id), [17, 25, 26, 27]);
  assert.equal(new Set(systemsMixedQuestions.map(question => question.id)).size, 28);
  assert.ok([17, 25, 26, 27].every(id => getQuestion(id).diagram && !getQuestion(id).needsDiagram));
});

test("every usable question has a working correct response", () => {
  systemsMixedQuestions.forEach(question => {
    const response = question.kind === "choice" || question.kind === "multiple" ? question.correct : Object.fromEntries(question.fields.map((field, i) => [i, { text: field.type === "text" ? field.example : String(field.correct), ...(field.unit ? { unit: field.unit } : {}) }]));
    assert.ok(systemsMixedReady(question, response), `Ready: ${question.id}`);
    assert.ok(gradeSystemsMixed(question, response).correct, `Correct: ${question.id}`);
  });
});

test("the mixed test has no calculation inputs and regulator failure is conceptual", () => {
  assert.ok(systemsMixedQuestions.every(question => !question.title.startsWith("Calculation") && !question.fields?.some(field => field.type === "number")));
  assert.equal(getQuestion(24).fields.length, 1);
  assert.ok(gradeSystemsMixed(getQuestion(24), {0: {text: "system relief valve"}}).correct);
  assert.equal(getQuestion(29), undefined);
});

test("all required choices and subparts must be correct", () => {
  assert.ok(gradeSystemsMixed(getQuestion(10), ["D", "B", "C", "A"]).correct);
  assert.equal(gradeSystemsMixed(getQuestion(10), ["A", "B", "C", "D", "E"]).correct, false);
  assert.equal(gradeSystemsMixed(getQuestion(10), ["A", "B"]).correct, false);
  assert.equal(gradeSystemsMixed(getQuestion(5), {}).correct, false);
  assert.equal(systemsMixedReady(getQuestion(5), {}), false);
  assert.equal(gradeSystemsMixed(getQuestion(18), { 0: { text: "purging air and removing air" } }).correct, false);
});
