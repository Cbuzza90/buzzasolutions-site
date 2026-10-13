import { test } from "node:test";
import assert from "node:assert/strict";
import { systemsHydraulicsQuestions } from "./systemsHydraulics.js";

test("all 40 hydraulic concept questions have four distinct choices", () => {
  assert.equal(systemsHydraulicsQuestions.length, 40);
  assert.equal(new Set(systemsHydraulicsQuestions.map(q => q.id)).size, 40);
  systemsHydraulicsQuestions.forEach(q => {
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options).size, 4);
    assert.ok(q.prompt && q.explanation);
  });
});
test("closely related pressure-control components keep their correct distinctions", () => {
  const key = {31: "Pressure regulator", 32: "System relief valve", 33: "Thermal relief valve", 34: "Pressure reducer", 35: "Unloading valve", 36: "Debooster"};
  Object.entries(key).forEach(([id, answer]) => {
    const q = systemsHydraulicsQuestions.find(q => q.id === Number(id));
    assert.equal(q.options[q.correctIndex], answer);
  });
});
test("previous calculation questions remain excluded", () => {
  [37, 42, 43, 44, 45, 46, 47, 48, 49, 50].forEach(id => assert.ok(!systemsHydraulicsQuestions.some(q => q.id === id)));
});
