import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { gradeRecall } from "./recallLogic.js";

test("all 38 supplied recall prompts are present", () => {
  const questions = JSON.parse(readFileSync(new URL("../data/safety-module1-recall.json", import.meta.url), "utf8"));
  assert.equal(questions.length, 38);
  assert.equal(new Set(questions.map(question => question.id)).size, 38);
  assert.ok(questions.every(question => question.prompt && question.answer));
});

test("every question accepts an expected response", () => {
  const answers = ["Housekeeping", "proper place", "everybody", "pedestrians", "upright secured valve closed cap fitted", "body", "unobstructed", "flammable-material", "entanglement", "hydraulic pressure", "oxygen fuel heat", "A", "B", "C", "D", "shut off", "water", "oxygen", "red square", "check for loss of extinguishing agent", "80%", "anthropometrics", "computer science", "risk", "cognitive science", "cognitive science", "fewer errors and improved aircraft safety", "prevent harm", "organizational psychology", "fatigue", "lack of awareness", "complacency", "stress", "crossing electrical connections", "people", "latent", "Ishikawa diagram", "social environment"];
  answers.forEach((answer, index) => assert.ok(gradeRecall(index + 1, answer).correct, `Question ${index + 1}: ${answer}`));
});

test("small spelling differences are accepted and marked as close", () => {
  [ [1, "hosuekeeping"], [22, "anthropometery"], [32, "complaceny"], [38, "social enviroment"] ].forEach(([id, answer]) => assert.deepEqual(gradeRecall(id, answer), { correct: true, close: true }));
  assert.deepEqual(gradeRecall(1, " HOUSEKEEPING! "), { correct: true, close: false });
  assert.equal(gradeRecall(16, "Disconnect the power, if it is safe to do so.").correct, true);
});

test("wrong numbers and fire classes are not accepted as typos", () => {
  assert.equal(gradeRecall(12, "B").correct, false);
  assert.equal(gradeRecall(13, "class C").correct, false);
  assert.equal(gradeRecall(21, "81").correct, false);
  assert.equal(gradeRecall(21, "8").correct, false);
});

test("multi-part responses require complete, distinct concepts", () => {
  assert.equal(gradeRecall(11, "heat and fuel").correct, false);
  assert.equal(gradeRecall(11, "heat fuel not oxygen").correct, false);
  assert.equal(gradeRecall(11, "heat fuel nitrogen").correct, false);
  assert.equal(gradeRecall(5, "upright secured").correct, false);
  assert.equal(gradeRecall(5, "upright unsecured valve closed cap fitted").correct, false);
  assert.equal(gradeRecall(27, "fewer errors and fewer mistakes").correct, false);
  assert.equal(gradeRecall(27, "worker safety and aircraft safety").correct, true);
  assert.equal(gradeRecall(19, "red triangle").correct, false);
  assert.equal(gradeRecall(19, "red blue square").correct, false);
  assert.equal(gradeRecall(34, "an inadequate training policy").correct, false);
});

test("empty and unrelated responses are rejected", () => {
  assert.equal(gradeRecall(1, "").correct, false);
  assert.equal(gradeRecall(1, "not housekeeping").correct, false);
  assert.equal(gradeRecall(22, "computer science").correct, false);
});
