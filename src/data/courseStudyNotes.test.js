import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";

test("every current playable module has source-based searchable notes and valid assets", () => {
  for (const slug of ["safety", "electricity", "structures", "systems"]) {
    const notes = studyNotesByModule[`/study/${slug}/module-1`];
    assert.ok(notes?.basis && notes.intro && notes.sections.length);
    assert.equal(new Set(notes.sections.map(section => section.id)).size, notes.sections.length);
    for (const section of notes.sections) {
      assert.ok(section.title && section.items.length);
      for (const [label, text, image] of section.items) {
        assert.ok(label && text);
        if (image) assert.ok(existsSync(new URL(`../../public${image}`, import.meta.url)));
      }
      for (const key of section.diagramKeys ?? (section.diagramKey ? [section.diagramKey] : [])) {
        assert.ok(notes.diagrams[key]?.crop, key);
        assert.ok(existsSync(new URL(`../../public${notes.diagrams[key].src}`, import.meta.url)));
      }
    }
  }
  assert.equal(studyNotesByModule["/study/safety/module-2"], undefined, "New modules must not inherit unrelated notes");
});

test("search matches headings and explanations, ignores case and whitespace, and handles no results", () => {
  const safety = studyNotesByModule["/study/safety/module-1"].sections;
  assert.equal(findNoteSections(safety, "  PeAr ")[0].id, "pear");
  assert.ok(findNoteSections(safety, "reaction time").some(section => section.id === "dirty-dozen"));
  assert.deepEqual(findNoteSections(safety, "this phrase does not exist"), []);
  assert.equal(findNoteSections(safety, " ").length, safety.length);
  const electricity = studyNotesByModule["/study/electricity/module-1"].sections;
  assert.ok(findNoteSections(electricity, "multiplier").some(section => section.id === "meters"));
});
