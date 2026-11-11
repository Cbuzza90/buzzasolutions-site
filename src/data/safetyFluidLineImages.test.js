import { test } from "node:test";
import assert from "node:assert/strict";
import { safetyEasyReviewQuestions } from "./safetyEasyReview.js";
import { safetyTest2ReviewQuestions } from "./safetyTest2Review.js";

test("all sixteen fluid-line pictures include source colours and the same clean pattern in both review banks", () => {
  const easy = safetyEasyReviewQuestions.filter(q => q.topic === "review-fluid-lines");
  const full = safetyTest2ReviewQuestions.filter(q => q.topic === "review-fluid-lines");
  assert.equal(easy.length, 16);
  assert.equal(full.length, 16);
  const colours = [
    ["#ff1e22"], ["#ff1e22", "#a8a8a8"], ["#ff1e22", "#a8a8a8"], ["#ffff0e"],
    ["#ffff0e", "#007b49"], ["#007b49"], ["#ff561f"], ["#ff561f"],
    ["#ff561f", "#a8a8a8"], ["#007b49", "#a8a8a8"], ["#838295"], ["#8b3f25"],
    ["#ff561f", "#056fc6"], ["#056fc6"], ["#056fc6", "#ffff0e"], ["#8b3f25", "#a8a8a8"],
  ];
  for (const [index, question] of easy.entries()) {
    const diagram = question.diagram;
    assert.deepEqual(full[index].diagram, diagram);
    assert.deepEqual(diagram.lineBand.colours, colours[index], question.id);
    assert.equal(diagram.crop.width, 40, "Exclude neighbouring labels/highlight borders");
    assert.equal(diagram.crop.height, 220, "Keep repeated complete pattern symbols");
    assert.ok(diagram.crop.x >= 0 && diagram.crop.x + diagram.crop.width <= 1505);
    assert.ok(diagram.crop.y >= 0 && diagram.crop.y + diagram.crop.height <= 932);
    assert.equal(diagram.src, "/safety/module-2/review-fluid-lines.png", "Preserve original pattern source");
  }
});
