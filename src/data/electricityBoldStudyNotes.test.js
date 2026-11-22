import { test } from "node:test";
import assert from "node:assert/strict";
import emphasis from "./electricityBoldSourceIndex.json" with { type: "json" };
import { electricityBoldGuide } from "./electricityBoldStudyNotes.js";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";

test("bold-source coverage includes all three decks, split-file numbering and the emphasized speaker note", () => {
  assert.equal(emphasis.length, 173);
  assert.equal(electricityBoldGuide.reduce((sum, group) => sum + group.entries.length, 0), 73);
  const maxima = { battery: 70, induction: 62, generator: 79 };
  for (const row of emphasis) {
    assert.ok(row.slide > 0 && row.slide <= maxima[row.deck]);
    const group = electricityBoldGuide.find(group => group.deck === row.deck);
    assert.ok(group.entries.some(([, slides]) => slides.includes(row.slide)), `${row.deck} ${row.slide}: ${row.bold}`);
  }
  assert.ok(emphasis.some(row => row.speakerNote && row.deck === "induction" && row.slide === 46 && row.bold === "concentration"));
  assert.ok(emphasis.some(row => row.deck === "generator" && row.slide === 74 && row.bold.includes("Reverse Current")));
});

test("each condensed note is searchable in Electrical Test 2 with source context and corrected distinctions", () => {
  const notes = studyNotesByModule["/study/electricity/module-2"];
  for (const group of electricityBoldGuide) for (const [label, slides, text] of group.entries) {
    const entry = findNoteSections(notes.sections, label).flatMap(section => section.items).find(([title, description]) => title === label && description.includes(text));
    assert.ok(entry, label);
    assert.ok(entry[1].includes(`slides ${slides.join(", ")}`), label);
  }
  const all = electricityBoldGuide.flatMap(group => group.entries).map(entry => entry[2]).join(" ");
  assert.match(all, /voltage is induced EMF, while inductance is/);
  assert.match(all, /fixed core does not mean nothing moves/);
  assert.match(all, /9 or 10 cells for 12 V.*ambiguous/);
  assert.match(all, /not a universal rule/);
  assert.match(all, /AFTER: add water/);
});
