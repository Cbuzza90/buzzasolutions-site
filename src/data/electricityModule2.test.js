import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { electricityModule2Path as path, electricityModule2Easy as easy, electricityModule2Choice as medium, electricityModule2Recall as hard, electricityModule2QuizMap as quiz, electricityModule2Parts as parts, electricityModule2Diagrams as diagrams, electricityModule2Sources as sources } from "./electricityModule2.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";
import { shufflePractice } from "../pages/safetyTestLogic.js";
import { newPracticeAttempt, loadPracticeAttempt, savePracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { gradeTypedAnswer, newTypedAttempt, loadTypedAttempt, saveTypedAttempt, recordTypedBest, loadTypedBest } from "../pages/typedPracticeLogic.js";

test("Electricity Module 2 covers all 42 quiz items, expands grouped concepts and cites the five source decks", () => {
  assert.deepEqual([easy.length, medium.length, hard.length], [51, 149, 149]);
  assert.equal(new Set([...easy, ...medium, ...hard].map(q => q.id)).size, 349);
  assert.deepEqual(Object.keys(quiz).map(Number), Array.from({ length: 42 }, (_, i) => i + 1));
  assert.deepEqual([...new Set(easy.flatMap(q => q.source.quizQuestions))].sort((a, b) => a - b), Array.from({ length: 42 }, (_, i) => i + 1));
  for (const [number, count] of [[3, 2], [5, 2], [13, 3], [24, 3], [39, 4]]) assert.equal(easy.filter(q => q.source.quizQuestions.includes(number)).length, count);
  for (const q of [...easy, ...medium, ...hard]) {
    assert.ok(q.prompt && q.explanation.length > 120, q.id);
    assert.ok(sources[q.source.deck], q.id);
    assert.ok(q.source.slides.length && q.source.slides.every(n => Number.isInteger(n) && n >= 1 && n <= sources[q.source.deck].slides), q.id);
    assert.ok(!/calculate|compute|how many hours|find the peak|expiry date/i.test(q.prompt), q.id);
    if (q.options) {
      assert.equal(q.options.length, 4, q.id);
      assert.equal(new Set(q.options.map(o => o.toLowerCase().trim())).size, 4, q.id);
      assert.ok(!q.options.some(o => /both [a-d] and [a-d]|of the above/i.test(o)), q.id);
    } else {
      assert.ok(!/\s/.test(q.answer), q.id);
      assert.ok(q.acceptedAnswers.every(answer => gradeTypedAnswer(q, ` ${answer.toUpperCase()} `)), q.id);
      assert.equal(gradeTypedAnswer(q, "not a course answer"), false, q.id);
    }
  }
  for (const q of shufflePractice(medium, () => 0.37)) assert.equal(q.options[q.correctIndex], medium.find(item => item.id === q.id).options[0], q.id);
});

test("source ambiguities are repaired explicitly and the grouped regulator/EMF sets retain distinct answers", () => {
  const answer = id => medium.find(q => q.learningTarget === id).options[0];
  assert.equal(answer("induced-emf"), "Electromotive force (EMF)");
  assert.equal(answer("gel-cell"), "Gel cell");
  assert.equal(answer("nicad-spill"), "Boric acid or vinegar, as distinct named alternatives");
  assert.equal(answer("series-field"), "In series with the load");
  assert.equal(answer("shunt-field"), "In parallel with the load");
  for (const id of ["emf-conductors", "emf-field", "emf-speed", "three-voltage", "three-current", "three-reverse", "permeability", "reluctance", "solenoid"]) assert.ok(medium.some(q => q.learningTarget === id), id);
  const notes = studyNotesByModule[path];
  for (const term of ["vinegar", "boric acid", "inductance", "Hand rules", "Shield grounding", "chemical exposure", "B/A/E", "EMF", "RMS", "SWPM"]) assert.ok(findNoteSections(notes.sections, term).some(s => !s.questionReference), term);
  assert.ok(!medium.some(q => /only one.*shield.*ground|ground.*only one.*shield/i.test(q.prompt)));
});

test("every active Electricity 2 question is searchable in its exact module and every original image crop is in bounds", () => {
  const notes = studyNotesByModule[path];
  assert.notEqual(notes, studyNotesByModule["/study/electricity/module-1"]);
  for (const q of [...easy, ...medium, ...hard]) {
    assert.ok(findNoteSections(notes.sections, q.prompt).filter(s => s.questionReference).flatMap(s => s.items).some(([prompt, explanation]) => prompt === q.prompt && explanation.includes(q.explanation)), q.id);
  }
  assert.equal(Object.keys(diagrams).length, 19);
  for (const [key, d] of Object.entries(diagrams)) {
    assert.equal(notes.diagrams[key], d);
    const bytes = readFileSync(new URL(`../../public${d.src}`, import.meta.url));
    assert.equal(bytes.toString("ascii", 1, 4), "PNG");
    const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
    assert.equal(d.crop.imageWidth, width, key);
    assert.ok(d.crop.x >= 0 && d.crop.x + d.crop.width <= width, key);
    assert.ok(d.crop.y >= 0 && d.crop.y + d.crop.height <= height, key);
  }
});

test("all twelve module routes are independent, resumable, resettable and retain highest scores", () => {
  assert.equal(parts.length, 12);
  assert.equal(new Set(parts.map(p => p.storageId)).size, 12);
  assert.deepEqual(parts.filter(p => p.difficulty === "easy").flatMap(p => p.questions), easy);
  assert.deepEqual(parts.filter(p => p.difficulty === "medium").flatMap(p => p.questions), medium);
  assert.deepEqual(parts.filter(p => p.difficulty === "hard").flatMap(p => p.questions), hard);
  const records = new Map(), storage = { getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) };
  for (const p of parts) {
    assert.equal(dashboardTests.find(t => t.path === p.path), p);
    assert.deepEqual(studyPracticeNavigation(p.path), { onPractice: true, testsPath: path });
    const typed = p.kind === "typed", create = typed ? newTypedAttempt : newPracticeAttempt, save = typed ? saveTypedAttempt : savePracticeAttempt, load = typed ? loadTypedAttempt : loadPracticeAttempt;
    const best = typed ? recordTypedBest : recordHighestScore, getBest = typed ? loadTypedBest : loadHighestScore;
    const attempt = create(p.questions, () => 0.37), first = attempt.order[0];
    attempt.answers[first.id] = typed ? first.answer : first.correctIndex;
    save(p.questions, p.storageId, attempt, storage);
    assert.deepEqual(load(p.questions, p.storageId, storage), attempt);
    assert.equal(savedTestSummary(p, storage).answered, 1);
    best(p.questions, p.storageId, p.questions.length - 1, storage);
    save(p.questions, p.storageId, create(p.questions), storage);
    assert.equal(savedTestSummary(p, storage).answered, 0);
    assert.equal(getBest(p.questions, p.storageId, storage).score, p.questions.length - 1);
  }
});
