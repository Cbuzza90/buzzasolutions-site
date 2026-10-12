import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { shuffleQuestions, scoreAnswers } from "./safetyTestLogic.js";

const questions = JSON.parse(readFileSync(new URL("../data/safety-module1-test1.json", import.meta.url), "utf8"));

test("all 38 questions have four choices and match the supplied answer key", () => {
  assert.equal(questions.length, 38);
  assert.equal(new Set(questions.map(question => question.id)).size, 38);
  const key = "BDACBDACBDACBDACBDACBDACBDACBDACBDACBDACBD";
  questions.forEach((question, index) => {
    assert.equal(question.id, index + 1);
    assert.equal(question.options.length, 4);
    assert.ok(question.options.every(Boolean));
    assert.ok(question.prompt && question.explanation);
    assert.equal(question.correctIndex, key.charCodeAt(index) - 65);
  });
});

test("shuffling keeps every question and its answers without changing the bank", () => {
  const originalIds = questions.map(question => question.id);
  const shuffled = shuffleQuestions(questions, () => 0);
  assert.deepEqual(questions.map(question => question.id), originalIds);
  assert.notDeepEqual(shuffled.map(question => question.id), originalIds);
  assert.deepEqual([...shuffled].sort((a, b) => a.id - b.id), questions);
});

test("scoring follows question IDs after shuffling and counts each answer once", () => {
  const shuffled = shuffleQuestions(questions, () => 0);
  const answers = Object.fromEntries(questions.map(question => [question.id, question.correctIndex]));
  assert.equal(scoreAnswers(shuffled, answers), 38);
  assert.equal(scoreAnswers(shuffled, {}), 0);
  answers[questions[0].id] = (questions[0].correctIndex + 1) % 4;
  assert.equal(scoreAnswers(shuffled, answers), 37);
});
