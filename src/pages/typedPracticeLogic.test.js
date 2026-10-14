import { test } from "node:test";
import assert from "node:assert/strict";
import { electricityRecallQuestions, systemsRecallQuestions, systemsAppliedRecallQuestions } from "../data/typedReviewQuestions.js";
import electricitySource from "../data/electricity-module1-test1.json" with { type: "json" };
import { systemsHydraulicsQuestions } from "../data/systemsHydraulics.js";
import { systemsMixedQuestions } from "../data/systemsMixedTest.js";
import { gradeTypedAnswer, loadTypedAttempt, loadTypedBest, newTypedAttempt, recordTypedBest, restoreTypedAttempt, saveTypedAttempt, typedScore } from "./typedPracticeLogic.js";
import { loadHighestScore, recordHighestScore } from "./practiceProgress.js";
const banks = [electricityRecallQuestions, systemsRecallQuestions, systemsAppliedRecallQuestions];
function storage() { const data = new Map(); return { data, getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }; }

test("all 187 recall prompts have a one-word key and preserve source explanations and diagrams", () => {
  assert.deepEqual(banks.map(bank => bank.length), [64,40,83]);
  const sources = [electricitySource, systemsHydraulicsQuestions, systemsMixedQuestions];
  banks.forEach((bank, index) => {
    assert.equal(new Set(bank.map(q => q.id)).size, bank.length);
    for (const q of bank) {
      const source = sources[index].find(item => item.id === q.id);
      assert.ok(q.prompt && q.answer && !/\s/.test(q.answer), q.prompt);
      assert.ok(!q.options, "No choices should be exposed in typed recall");
      assert.equal(q.explanation, source.explanation);
      assert.equal(q.diagram, source.diagram);
      for (const accepted of q.acceptedAnswers) assert.equal(gradeTypedAnswer(q, accepted), true);
    }
  });
});

test("grading accepts case, accents, spaces, hyphens and explicit equivalents without substring/fuzzy matches", () => {
  const ion = electricityRecallQuestions.find(q => q.id === 5);
  assert.equal(gradeTypedAnswer(ion, "  IONISATION.  "), true);
  assert.equal(gradeTypedAnswer(ion, "ionization maybe"), false);
  const fluid = systemsRecallQuestions.find(q => q.id === 15);
  assert.equal(gradeTypedAnswer(fluid, "LIGHT PURPLE"), true);
  assert.equal(gradeTypedAnswer(fluid, "red"), false);
  const reservoir = systemsRecallQuestions.find(q => q.id === 26);
  assert.equal(gradeTypedAnswer(reservoir, "In Line"), true);
  const greek = systemsRecallQuestions[0];
  for (const bad of ["", "___", "watermelon", "watt", "not water"]) assert.equal(gradeTypedAnswer(greek, bad), false);
  assert.equal(gradeTypedAnswer(greek, "WÁTER!"), true);
  assert.equal(gradeTypedAnswer(systemsRecallQuestions.find(q => q.id === 9), "fire"), false);
  assert.equal(gradeTypedAnswer(systemsRecallQuestions.find(q => q.id === 19), "closed"), false);
});

test("typed drafts, submitted wrong answers and shuffled order survive reload independently per test", () => {
  const saved = storage(), bank = systemsRecallQuestions;
  const attempt = newTypedAttempt(bank, () => 0.5);
  assert.deepEqual(new Set(attempt.order.map(q => q.id)), new Set(bank.map(q => q.id)));
  attempt.answers[attempt.order[0].id] = "definitely wrong";
  attempt.position = 1; attempt.draft = "unfin";
  assert.equal(saveTypedAttempt(bank, "systems-1", attempt, saved), true);
  assert.deepEqual(loadTypedAttempt(bank, "systems-1", saved), attempt);
  assert.equal(typedScore(loadTypedAttempt(bank, "systems-1", saved)), 0);
  assert.equal(loadTypedAttempt(bank, "systems-2", saved).draft, "");
  const key = [...saved.data.keys()].find(key => key.includes("typed-progress"));
  const record = JSON.parse(saved.getItem(key));
  record.order[1] = record.order[0];
  assert.equal(restoreTypedAttempt(bank, record), null);
});

test("completed typed results regrade correctly and reset retains typed and previous multiple-choice highest scores", () => {
  const saved = storage(), bank = electricityRecallQuestions, testId = "electricity";
  recordHighestScore(electricitySource, testId, 50, saved);
  const attempt = newTypedAttempt(bank);
  attempt.answers = Object.fromEntries(attempt.order.map((q, i) => [q.id, i === 0 ? "wrong" : q.answer.toUpperCase()]));
  attempt.position = bank.length - 1; attempt.complete = true;
  assert.equal(typedScore(attempt), 63);
  saveTypedAttempt(bank, testId, attempt, saved); recordTypedBest(bank, testId, 63, saved);
  assert.equal(typedScore(loadTypedAttempt(bank, testId, saved)), 63);
  assert.equal(loadTypedAttempt(bank, testId, saved).complete, true);
  saveTypedAttempt(bank, testId, newTypedAttempt(bank), saved); recordTypedBest(bank, testId, 20, saved);
  assert.equal(loadTypedBest(bank, testId, saved).score, 63);
  assert.equal(loadHighestScore(electricitySource, testId, saved).score, 50);
  assert.equal(recordTypedBest(bank, testId, 65, saved).saved, false);
  assert.equal(saveTypedAttempt(bank, testId, attempt, { setItem() { throw Error("Disabled"); } }), false);
});
