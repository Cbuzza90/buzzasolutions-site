import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { shufflePractice, scoreAnswers } from "./safetyTestLogic.js";
const banks = ["test1", "test2", "recall"].map(name => JSON.parse(readFileSync(new URL(`../data/safety-module1-${name}.json`, import.meta.url), "utf8")));
const all = banks.flat();
const byTarget = target => all.find(q => q.learningTarget === target);
const correctText = target => { const q = byTarget(target); return q.options[q.correctIndex]; };

test("three balanced Safety tests contain 72 distinct prompts and learning targets", () => {
  assert.deepEqual(banks.map(bank => bank.length), [24,24,24]);
  assert.equal(new Set(all.map(q => q.learningTarget)).size, 72);
  assert.equal(new Set(all.map(q => q.prompt.toLowerCase().replace(/[^a-z0-9]/g, ""))).size, 72);
  banks.forEach(bank => {
    assert.equal(new Set(bank.map(q => q.id)).size, 24);
    bank.forEach(q => {
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4);
      assert.ok(q.prompt && q.explanation && q.learningTarget);
      assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    });
  });
});

test("all four traditional fire-class colours and shapes have visible picture choices", () => {
  const expected = {a:"Green triangle", b:"Red square", c:"Blue circle", d:"Yellow five-pointed star"};
  Object.entries(expected).forEach(([letter, text]) => {
    const q = byTarget(`symbol-${letter}-colour`);
    assert.equal(correctText(q.learningTarget), text);
    assert.equal(q.optionImages[q.correctIndex], `/safety/fire-class-${letter}-shape.svg`);
    assert.ok(q.feedbackVisual.src.endsWith(`fire-class-${letter}.svg`));
    q.optionImages.forEach(src => {
      const asset = new URL(`../../public${src}`, import.meta.url);
      assert.ok(existsSync(asset));
      assert.ok(!readFileSync(asset, "utf8").includes("<text"), "Colour question pictures must not reveal class letters");
    });
    assert.ok(byTarget(`fire-${letter}-materials`).visual);
  });
});

test("extinguisher coverage distinguishes agent limitations and approvals", () => {
  assert.equal(correctText("co2-approved-classes"), "B and C");
  assert.equal(correctText("foam-rated-classes"), "A and B");
  assert.equal(correctText("metal-specific-agent"), "Class D dry powder specifically approved for the burning metal");
  assert.equal(correctText("abc-versus-d"), "The ABC marking does not approve it for Class D");
  assert.equal(correctText("water-cooling"), "By cooling the burning material and removing heat");
});

test("all twelve Dirty Dozen factors remain covered without repeated identification questions", () => {
  const targets = ["fatigue-identification","awareness-identification","complacency-identification","stress-definition","communication-identification","knowledge-identification","distraction-identification","teamwork-identification","resources-identification","pressure-identification","assertiveness-identification","norms-identification"];
  targets.forEach(target => assert.ok(byTarget(target), target));
});

test("shuffled pictures stay with their answers and each question scores once", () => {
  for (const bank of banks) {
    const original = JSON.stringify(bank);
    const shuffled = shufflePractice(bank, () => 0);
    shuffled.forEach(q => {
      const source = bank.find(item => item.id === q.id);
      assert.equal(q.options[q.correctIndex], source.options[source.correctIndex]);
      if (q.optionImages) q.options.forEach((option, index) => assert.equal(q.optionImages[index], source.optionImages[source.options.indexOf(option)]));
    });
    assert.equal(JSON.stringify(bank), original);
    const answers = Object.fromEntries(shuffled.map(q => [q.id,q.correctIndex]));
    assert.equal(scoreAnswers(shuffled, answers), 24);
    answers[shuffled[0].id] = (shuffled[0].correctIndex + 1) % 4;
    assert.equal(scoreAnswers(shuffled, answers), 23);
  }
});
