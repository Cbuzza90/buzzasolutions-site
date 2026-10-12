import { test } from "node:test";
import assert from "node:assert/strict";
import { diagramQuestions, gradeStructures, structuresQuestions, structuresReady } from "./structuresTest.js";

const getQuestion = id => structuresQuestions.find(question => question.id === id);

test("31 usable questions, with four missing diagram questions explicitly excluded", () => {
  assert.equal(structuresQuestions.length, 31);
  assert.deepEqual(diagramQuestions.map(question => question.id), [17, 25, 26, 27]);
  assert.equal(new Set(structuresQuestions.map(question => question.id)).size, 31);
});

test("every usable question has a working correct response", () => {
  structuresQuestions.forEach(question => {
    const response = question.kind === "choice" || question.kind === "multiple" ? question.correct : Object.fromEntries(question.fields.map((field, i) => [i, { text: field.type === "text" ? field.example : String(field.correct), ...(field.unit ? { unit: field.unit } : {}) }]));
    assert.ok(structuresReady(question, response), `Ready: ${question.id}`);
    assert.ok(gradeStructures(question, response).correct, `Correct: ${question.id}`);
  });
});

test("calculations require the right value and units", () => {
  assert.ok(gradeStructures(getQuestion(29), { 0: { text: "800", unit: "psi" } }).correct);
  assert.equal(gradeStructures(getQuestion(29), { 0: { text: "800", unit: "lb" } }).correct, false);
  assert.equal(gradeStructures(getQuestion(29), { 0: { text: "800" } }).correct, false);
  assert.equal(gradeStructures(getQuestion(29), { 0: { text: "800 bananas", unit: "psi" } }).correct, false);
  assert.ok(gradeStructures(getQuestion(35), { 0: { text: "660,000", unit: "ft-lb" }, 1: { text: "330,000", unit: "ft-lb/min" }, 2: { text: "10", unit: "hp" } }).correct);
  assert.equal(gradeStructures(getQuestion(24), { 0: { text: "system relief valve" }, 1: { text: "1,500", unit: "lb" } }).correct, false);
});

test("all required choices and subparts must be correct", () => {
  assert.ok(gradeStructures(getQuestion(10), ["D", "B", "C", "A"]).correct);
  assert.equal(gradeStructures(getQuestion(10), ["A", "B", "C", "D", "E"]).correct, false);
  assert.equal(gradeStructures(getQuestion(10), ["A", "B"]).correct, false);
  assert.equal(gradeStructures(getQuestion(5), {}).correct, false);
  assert.equal(structuresReady(getQuestion(5), {}), false);
  assert.equal(gradeStructures(getQuestion(18), { 0: { text: "purging air and removing air" } }).correct, false);
});
