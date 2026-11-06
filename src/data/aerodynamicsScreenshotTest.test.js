import { test } from "node:test";
import assert from "node:assert/strict";
import { aerodynamicsScreenshotNumbers, aerodynamicsScreenshotQuestions } from "./aerodynamicsScreenshotTest.js";
import { aeroSources } from "./aerodynamicsModule2.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";

test("class screenshot test includes only the visible questions with source-backed feedback", () => {
  assert.deepEqual(aerodynamicsScreenshotNumbers, [5,6,7,8,9,10,11,12,26,27,28,29,30,31,32,33]);
  assert.equal(new Set(aerodynamicsScreenshotQuestions.map(q => q.id)).size, 16);
  const notes = studyNotesByModule["/study/aerodynamics/module-2"];
  for (const question of aerodynamicsScreenshotQuestions) {
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options).size, 4, question.id);
    assert.ok(question.options[question.correctIndex], question.id);
    assert.ok(question.explanation.length > 180, question.id);
    assert.ok(question.source.pages.every(page => page > 0 && page <= aeroSources[question.source.deck].pages), question.id);
    assert.ok(findNoteSections(notes.sections, question.prompt).some(section =>
      section.questionReference && section.items.some(([prompt, text]) => prompt === question.prompt && text.includes(question.explanation))), question.id);
  }
  assert.equal(aerodynamicsScreenshotQuestions.find(q => q.screenshotNumber === 6).options[1], "To prevent flutter");
  assert.equal(aerodynamicsScreenshotQuestions.find(q => q.screenshotNumber === 26).options[1], "Solid");
  assert.match(aerodynamicsScreenshotQuestions.find(q => q.screenshotNumber === 33).explanation, /misleading/);
  assert.match(notes.sections.find(section => section.id === "aero-screenshot-test-limits").items[0][1], /only questions 5–12 and 26–33/);
});
