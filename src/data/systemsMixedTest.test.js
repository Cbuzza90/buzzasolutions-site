import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { diagramQuestions, systemsMixedQuestions } from "./systemsMixedTest.js";

test("applied review retains the original groups and adds focused coverage", () => {
  assert.equal(systemsMixedQuestions.length, 83);
  assert.deepEqual([...new Set(systemsMixedQuestions.map(q => q.sourceId))], Array.from({length: 30}, (_, i) => i + 1));
  assert.equal(new Set(systemsMixedQuestions.map(q => q.id)).size, 83);
  assert.equal(new Set(systemsMixedQuestions.map(q => q.learningTarget)).size, 83);
  assert.ok(systemsMixedQuestions.every(q => q.options.length === 4 && !q.fields && !q.kind));
});
test("diagram questions use shipped assets and retain every numbered component", () => {
  assert.deepEqual([...new Set(diagramQuestions.map(q => q.sourceId))], [4, 12, 17, 22, 25, 26, 27, 30]);
  assert.equal(diagramQuestions.filter(q => q.sourceId === 25).length, 5);
  assert.ok(diagramQuestions.every(q => q.diagram.src && q.diagram.crop));
  diagramQuestions.forEach(q => assert.ok(existsSync(new URL(`../../public${q.diagram.src}`, import.meta.url))));
  const answers = Array.from({ length: 5 }, (_, i) => {
    const q = systemsMixedQuestions.find(q => q.id === `25-${i + 1}`);
    return q.options[q.correctIndex];
  });
  assert.deepEqual(answers, ["Thermal relief valve", "Filter", "System relief valve", "Accumulator", "Reservoir"]);
});
test("former formula group now tests qualitative relationships without calculations", () => {
  const formulas = systemsMixedQuestions.filter(q => q.sourceId === 28);
  assert.equal(formulas.length, 8);
  assert.ok(formulas.every(q => !q.options.some(option => /\d|=/.test(option))));
  assert.ok(!systemsMixedQuestions.some(q => /calculate|find the (force|pressure)|how much work/i.test(q.prompt)));
});

test("every pressure-control role and each seal family has a focused applied question", () => {
  const expected = ["Pressure regulator", "System relief valve", "Thermal relief valve", "Pressure reducer", "Debooster", "Unloading valve"];
  expected.forEach((answer, index) => {
    const q = systemsMixedQuestions.find(q => q.id === `23-${index + 1}`);
    assert.equal(q.options[q.correctIndex], answer);
  });
  ["Ethylene-propylene", "Natural rubber", "Neoprene"].forEach((answer, index) => {
    const q = systemsMixedQuestions.find(q => q.id === `29-${index + 1}`);
    assert.equal(q.options[q.correctIndex], answer);
  });
});

test("the review's previously missing law names now have separate unambiguous questions", () => {
  for (const [target, answer] of [["boyle", "Boyle's law"], ["charles", "Charles's law"], ["bernoulli", "Bernoulli's principle"], ["hydrostatic-paradox", "Hydrostatic paradox"]]) {
    const q = systemsMixedQuestions.find(q => q.learningTarget === target);
    assert.ok(q, target);
    assert.equal(q.options[q.correctIndex], answer);
  }
  assert.match(systemsMixedQuestions.find(q => q.learningTarget === "boyle").prompt, /temperature stays constant/);
  assert.match(systemsMixedQuestions.find(q => q.learningTarget === "charles").prompt, /pressure stays constant/);
  assert.match(systemsMixedQuestions.find(q => q.learningTarget === "bernoulli").prompt, /ideal steady incompressible.*same elevation/);
});
