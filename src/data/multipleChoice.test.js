import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { systemsMixedQuestions } from "./systemsMixedTest.js";
import { torqueQuestions } from "./torqueTest.js";
import { humanFactorsQuestions } from "./humanFactorsPractice.js";
import { measuringToolsQuestions } from "./measuringToolsPractice.js";
import { electricityEasyQuestions } from "./electricityEasyReview.js";
import { shufflePractice, scoreAnswers } from "../pages/safetyTestLogic.js";
const banks = ["safety-module1-test1.json", "safety-module1-test2.json", "safety-module1-recall.json", "systems-hydraulics-test1.json", "electricity-module1-test1.json"].map(name => JSON.parse(readFileSync(new URL(name, import.meta.url), "utf8")));
banks.push(systemsMixedQuestions, torqueQuestions, electricityEasyQuestions, humanFactorsQuestions, measuringToolsQuestions);

test("every playable bank uses four unique choices and a valid answer key", () => {
  assert.deepEqual(banks.map(bank => bank.length), [24, 24, 24, 40, 64, 83, 50, 40, 32, 59]);
  for (const bank of banks) for (const q of bank) {
    assert.ok(q.prompt && q.explanation, String(q.id));
    assert.equal(q.options.length, 4, String(q.id));
    assert.equal(new Set(q.options.map(o => o.toLowerCase().trim())).size, 4, String(q.id));
    assert.ok(Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex < 4);
    assert.ok(q.options.every(o => typeof o === "string" && o.trim()));
    assert.ok(!q.options.some(o => /\b(both|all|none) (?:[A-D] and [A-D]|of the above)\b/i.test(o)), "Choices must not refer to shuffled letters");
    assert.ok(!/^[A-D] [—-]/.test(q.explanation), "Explanations must not retain old answer letters");
  }
});
test("choice shuffling preserves the correct answer, diagrams, and source data", () => {
  for (const bank of banks) {
    const original = JSON.stringify(bank);
    const shuffled = shufflePractice(bank, () => 0);
    for (const q of shuffled) {
      const source = bank.find(item => item.id === q.id);
      assert.equal(q.options[q.correctIndex], source.options[source.correctIndex]);
      assert.deepEqual([...q.options].sort(), [...source.options].sort());
      assert.equal(q.diagram, source.diagram);
      if (source.optionImages) q.options.forEach((option, i) => assert.equal(q.optionImages[i], source.optionImages[source.options.indexOf(option)]));
    }
    assert.equal(JSON.stringify(bank), original);
    const answers = Object.fromEntries(shuffled.map(q => [q.id, q.correctIndex]));
    assert.equal(scoreAnswers(shuffled, answers), bank.length);
    answers[shuffled[0].id] = (shuffled[0].correctIndex + 1) % 4;
    assert.equal(scoreAnswers(shuffled, answers), bank.length - 1);
  }
});
