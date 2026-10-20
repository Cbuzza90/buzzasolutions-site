import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { measuringToolsQuestions, measuringToolsDiagrams } from "./measuringToolsPractice.js";
import { dashboardTests } from "./studyDashboard.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";

test("Measuring Tools has independently saved source-mapped questions and original tool pictures", () => {
  assert.equal(measuringToolsQuestions.length, 59);
  assert.equal(new Set(measuringToolsQuestions.map(q => q.id)).size, 59);
  assert.equal(new Set(measuringToolsQuestions.map(q => q.learningTarget)).size, 59);
  for (const q of measuringToolsQuestions) {
    assert.ok(q.source.slides.length);
    assert.ok(q.source.slides.every(slide => Number.isInteger(slide) && slide >= 1 && slide <= 74));
    assert.ok(q.source.reviewQuestions.every(number => [1,4,5,6,7,8,14].includes(number)), "No unkeyed numerical exercises copied into the conceptual test");
    if (q.diagram) assert.ok(!/trammel|micrometer|caliper|pyrometer|feeler|radius gauge|machinist square/i.test(q.diagram.alt), "Identification alt describes the picture without revealing its name");
  }
  for (const diagram of Object.values(measuringToolsDiagrams)) {
    assert.ok(existsSync(new URL(`../../public${diagram.src}`, import.meta.url)), diagram.src);
    assert.equal(diagram.crop.width, diagram.crop.imageWidth);
    assert.equal(diagram.crop.height, diagram.crop.imageHeight);
  }
  const entry = dashboardTests.find(t => t.slug === "measuring-tools");
  assert.equal(entry.questions, measuringToolsQuestions);
  assert.equal(entry.basePath, "/study/structures/module-2");
  assert.equal(entry.storageId, "/study/structures/module-2/practice-1");
  assert.notEqual(entry.storageId, dashboardTests.find(t => t.slug === "torque").storageId);
});

test("Measuring Tools notes explain every micrometer part, retain source qualifications and support nested diagrams", () => {
  const notes = studyNotesByModule["/study/structures/module-2"];
  for (const term of ["anvil", "spindle", "frame", "sleeve", "thimble", "lock nut", "ratchet stop", "measuring faces", "friction drag torque", "dial revolution", "trammeling", "radius", "feeler"]) {
    assert.ok(findNoteSections(notes.sections, term).some(section => section.id.startsWith("measuring-")), term);
  }
  assert.ok(notes.sections.find(s => s.id === "measuring-micrometers").diagramKey);
  assert.equal(notes.diagrams.measuringMicrometerParts, measuringToolsDiagrams.parts);
  assert.ok(findNoteSections(notes.sections, "rated direction").some(s => s.id === "measuring-torque"));
  assert.ok(findNoteSections(notes.sections, "resolution").some(s => s.id === "measuring-calipers"));
});
