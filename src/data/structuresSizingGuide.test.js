import { test } from "node:test";
import assert from "node:assert/strict";
import { structuresSizingGuide } from "./structuresSizingGuide.js";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";
import { structuresHardwareQuizParts } from "./structuresHardwareQuizzes.js";
import { dashboardTests } from "./studyDashboard.js";
import { practiceBanksByModule } from "./practiceQuestionNotes.js";

test("dedicated sizing notes cover every tested part and teach the correct family-specific fields", () => {
  const entries = structuresSizingGuide.sections.flatMap(s => s.items);
  const text = entries.flat().join(" ");
  for (const part of ["AN3-5", "AN3-20", "AN4H-3", "AN4-7A", "AN5-6A", "AN5H-3A", "AN5-27", "AN5-30A", "AN6-7A", "AN6-10A", "AN6-11", "AN6-12", "AN6-21", "AN8-21A", "NAS1103-5", "NAS1103-06", "NAS1104-5", "NAS1105-7", "NAS1106-15", "NAS1404-6", "NAS1404-7", "NAS6204-5H", "NAS6205-3H", "AN310-5", "AN310-6", "AN310-8", "AN320-4", "AN320-8", "AN960PD-10", "AN960PD416", "AN960416L", "AN960PD516", "AN960PD-616", "AN960616L", "AN970-5", "AN380-3-4", "AN380-4-2", "AN380-5-2", "AN380-6-5", "AN75-3", "AN392-6"]) {
    assert.ok(text.includes(part), part);
    assert.ok(findNoteSections(studyNotesByModule["/study/structures/module-2"].sections, part).length, part);
  }
  assert.match(entries.find(([label]) => label === "AN5-27")[1], /2 7\/8/);
  assert.match(entries.find(([label]) => label === "AN8-21A")[1], /1\/2.*2 1\/8/);
  assert.match(entries.find(([label]) => label === "NAS1106-15")[1], /15\/16/);
  assert.match(entries.find(([label]) => label === "AN380-6-5")[1], /3\/16.*1 1\/4/);
  assert.match(text, /not 10\/16/);
});

test("Structures advertises only the replacement quiz tests and registers only their active question references", () => {
  const tests = dashboardTests.filter(t => t.courseSlug === "structures");
  assert.deepEqual(tests, structuresHardwareQuizParts);
  assert.deepEqual(practiceBanksByModule["/study/structures/module-2"], structuresHardwareQuizParts.map(p => p.questions));
});
