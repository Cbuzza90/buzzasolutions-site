import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { practiceBanksByModule } from "./practiceQuestionNotes.js";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";

test("every current playable module has source-based searchable notes and valid assets", () => {
  for (const slug of ["safety", "electricity", "structures", "systems", "aerodynamics"]) {
    const notes = studyNotesByModule[`/study/${slug}/${["structures", "aerodynamics"].includes(slug) ? "module-2" : "module-1"}`];
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

test("every practice question finds its verified answer and explanation in the exact module notes", () => {
  let covered = 0;
  for (const [basePath, banks] of Object.entries(practiceBanksByModule)) {
    const notes = studyNotesByModule[basePath];
    for (const questions of banks) for (const question of questions) {
      const found = findNoteSections(notes.sections, question.prompt);
      const entry = found.flatMap(section => section.items).find(item => item[0] === question.prompt && item[1].includes(question.explanation));
      assert.ok(entry, `${basePath}: ${question.prompt}`);
      assert.ok(entry[1].includes(question.answer ?? question.options[question.correctIndex]));
      assert.ok(entry[1].includes(question.explanation));
      if (question.diagram) assert.equal(entry[3], question.diagram);
      covered++;
    }
  }
  assert.equal(covered, Object.values(practiceBanksByModule).flat().reduce((total, bank) => total + bank.length, 0));
});

test("notes search accepts question wording, reordered terms and punctuation variants", () => {
  const systems = studyNotesByModule["/study/systems/module-1"].sections;
  assert.ok(findNoteSections(systems, "Greek meaning hydraulics").some(section => section.id === "principles"));
  const greek = findNoteSections(systems, 'GREEK "hydraulics"').flatMap(section => section.items);
  assert.ok(greek.some(([label, text]) => /Greek/.test(label) && /water/i.test(text)));
  assert.ok(findNoteSections(systems, "mil h 5606").some(section => section.id === "fluids"));
  const references = findNoteSections(systems, "Greek").filter(section => section.questionReference);
  assert.equal(references.flatMap(section => section.items).length, 2, "Show the matching choice and one-word references, not entire banks");
});


test("electricity technical terms return condensed definitions as well as question references", () => {
  const sections = studyNotesByModule["/study/electricity/module-1"].sections;
  for (const term of ["potentiometer", "rheostat", "wiper", "voltage divider", "piezoelectric", "thermocouple", "photovoltaic", "electromagnetic induction", "nichrome", "galvanometer", "sensitivity", "full-scale", "electrical damping", "shunt", "multiplier resistor", "megohmmeter", "digital multimeter", "resolution", "accuracy", "Wheatstone", "oscilloscope", "frequency", "period", "electromotive force"]) {
    const definitions = findNoteSections(sections, term).filter(section => !section.questionReference);
    assert.ok(definitions.length > 0, `No condensed definition for ${term}`);
  }
  const entries = sections.filter(section => !section.questionReference).flatMap(section => section.items);
  const pot = entries.find(([label]) => label === "Potentiometer")[1];
  assert.match(pot, /wiper/);
  assert.match(pot, /volume control/);
  assert.match(pot, /three terminals/);
  assert.equal(new Set(entries.map(([label]) => label)).size, entries.length, "Avoid duplicate condensed term headings");
});
