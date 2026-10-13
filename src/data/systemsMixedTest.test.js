import { test } from "node:test";
import assert from "node:assert/strict";
import { diagramQuestions, systemsMixedQuestions } from "./systemsMixedTest.js";

test("converted matching sets retain all 28 original concept groups", () => {
  assert.equal(systemsMixedQuestions.length, 58);
  assert.deepEqual([...new Set(systemsMixedQuestions.map(q => q.sourceId))], Array.from({length: 28}, (_, i) => i + 1));
  assert.equal(new Set(systemsMixedQuestions.map(q => q.id)).size, 58);
  assert.ok(systemsMixedQuestions.every(q => q.options.length === 4 && !q.fields && !q.kind));
});
test("all four diagrams are retained on their converted questions", () => {
  assert.deepEqual([...new Set(diagramQuestions.map(q => q.sourceId))], [17, 25, 26, 27]);
  assert.equal(diagramQuestions.filter(q => q.sourceId === 25).length, 5);
  assert.ok(diagramQuestions.every(q => q.diagram.src && q.diagram.crop));
});
test("converted formula questions ask for recognition without numerical calculation", () => {
  const formulas = systemsMixedQuestions.filter(q => q.sourceId === 28);
  assert.equal(formulas.length, 8);
  assert.ok(formulas.every(q => q.prompt.startsWith("Which formula represents")));
  assert.ok(!systemsMixedQuestions.some(q => /calculate|find the (force|pressure)|how much work/i.test(q.prompt)));
});
