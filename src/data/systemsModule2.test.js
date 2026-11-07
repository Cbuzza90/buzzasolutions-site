import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { systemsModule2Easy as easy, systemsModule2Medium as medium, systemsModule2Hard as hard, systemsModule2Parts as parts, systemsModule2Path as path, systemsModule2Diagrams as diagrams } from "./systemsModule2.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";
import { shufflePractice } from "../pages/safetyTestLogic.js";
import { gradeTypedAnswer, newTypedAttempt, saveTypedAttempt, recordTypedBest, loadTypedBest } from "../pages/typedPracticeLogic.js";
import { newPracticeAttempt, savePracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";

test("Systems Test 2 has review-only Easy, broad Medium and single-word Hard banks with source references", () => {
  assert.deepEqual([easy.length, medium.length, hard.length], [82, 137, 135]);
  assert.equal(new Set([...easy, ...medium, ...hard].map(q => q.id)).size, easy.length + medium.length + hard.length);
  assert.ok(easy.every(q => q.source.reviewSlides.length && q.source.reviewSlides.every(n => n >= 1 && n <= 38)));
  for (const q of [...easy, ...medium, ...hard]) {
    assert.ok(q.prompt && q.explanation.length > 140, q.id);
    assert.ok(q.source.pages.every(n => Number.isInteger(n) && n >= 1 && n <= 113), q.id);
    assert.match(q.explanation, /Hydraulic Components \(2024\)/);
    assert.ok(!/calculate|how many days|expiry date|expiration date|February 30/i.test(q.prompt), q.id);
    if (q.options) {
      assert.equal(q.options.length, 4, q.id);
      assert.equal(new Set(q.options.map(s => s.toLowerCase().trim())).size, 4, q.id);
      assert.ok(!q.options.some(option => /both [a-d] and [a-d]|of the above/i.test(option)), q.id);
    } else {
      assert.ok(!/\s/.test(q.answer), q.id);
      for (const alias of q.acceptedAnswers) assert.equal(gradeTypedAnswer(q, ` ${alias.toUpperCase()} `), true, q.id);
      assert.equal(gradeTypedAnswer(q, "unrelated"), false, q.id);
    }
  }
  for (const q of shufflePractice(medium, () => 0.37)) assert.equal(q.options[q.correctIndex], medium.find(item => item.id === q.id).options[0], q.id);
  assert.ok(hard.every(q => medium.some(item => item.learningTarget === q.learningTarget)));
  for (const [prefix, count] of [["quarter-", 4], ["colour-", 6], ["accumulator-", 5], ["switch-", 4]]) {
    assert.equal(medium.filter(q => q.learningTarget.startsWith(prefix)).length, count, prefix);
  }
});

test("every Systems 2 question, individual pairing and source conflict is searchable in the exact module", () => {
  const notes = studyNotesByModule[path];
  assert.notEqual(notes, studyNotesByModule["/study/systems/module-1"]);
  for (const q of [...easy, ...medium, ...hard]) {
    assert.ok(findNoteSections(notes.sections, q.prompt).filter(s => s.questionReference).flatMap(s => s.items)
      .some(([prompt, text]) => prompt === q.prompt && text.includes(q.explanation) && text.includes(q.answer ?? q.options[q.correctIndex])), q.id);
  }
  for (const term of ["poppet", "spool", "rotary", "orifice", "diaphragm", "bladder", "pressure switch", "thermal switch", "volume fuse", "Cuno", "sintered", "Chevron", "backup ring", "Q1", "Q2", "Q3", "Q4", "blue", "red", "yellow", "white", "green", "purple", "nitrogen", "shuttle", "gerotor", "swashplate", "February 30", "shelf life"]) {
    assert.ok(findNoteSections(notes.sections, term).some(s => !s.questionReference), term);
  }
  for (const [key, diagram] of Object.entries(diagrams)) {
    assert.equal(notes.diagrams[key], diagram);
    assert.ok(existsSync(new URL(`../../public${diagram.src}`, import.meta.url)), key);
    assert.deepEqual(diagram.crop, { imageWidth: 1080, x: 0, y: 0, width: 1080, height: 810 });
  }
  for (const q of [...easy, ...medium].filter(item => item.diagram)) assert.ok(Object.values(diagrams).includes(q.diagram));
  assert.ok(!hard.some(q => q.diagram), "Source-labelled charts should not give away one-word answers");
});

test("all Systems 2 parts register independent saved tests without replacing the original Systems quizzes", () => {
  assert.equal(parts.length, 11);
  assert.equal(new Set(parts.map(part => part.storageId)).size, parts.length);
  for (const [difficulty, bank] of [["easy", easy], ["medium", medium], ["hard", hard]]) {
    const family = parts.filter(part => part.difficulty === difficulty);
    assert.deepEqual(family.flatMap(part => part.questions), bank);
    assert.ok(family.every(part => part.questions.length <= 39 && part.questions.length > 0));
  }
  for (const part of parts) {
    assert.equal(dashboardTests.find(item => item.path === part.path), part);
    assert.deepEqual(studyPracticeNavigation(part.path), { onPractice: true, testsPath: path });
  }
  assert.equal(dashboardTests.filter(item => item.basePath === "/study/systems/module-1").length, 4);
  const records = new Map(), storage = { getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) };
  const choice = parts.find(part => part.difficulty === "easy"), typed = parts.find(part => part.kind === "typed");
  const attempt = newPracticeAttempt(choice.questions, () => 0.37);
  attempt.answers[attempt.order[0].id] = attempt.order[0].correctIndex;
  savePracticeAttempt(choice.questions, choice.storageId, attempt, storage);
  const recall = newTypedAttempt(typed.questions, () => 0.37);
  recall.draft = "working";
  saveTypedAttempt(typed.questions, typed.storageId, recall, storage);
  assert.equal(savedTestSummary(choice, storage).answered, 1);
  assert.equal(savedTestSummary(typed, storage).unfinished, true);
  recordHighestScore(choice.questions, choice.storageId, 20, storage);
  recordTypedBest(typed.questions, typed.storageId, 20, storage);
  savePracticeAttempt(choice.questions, choice.storageId, newPracticeAttempt(choice.questions), storage);
  saveTypedAttempt(typed.questions, typed.storageId, newTypedAttempt(typed.questions), storage);
  assert.equal(loadHighestScore(choice.questions, choice.storageId, storage).score, 20);
  assert.equal(loadTypedBest(typed.questions, typed.storageId, storage).score, 20);
  assert.ok(dashboardTests.filter(item => item.basePath === "/study/systems/module-1").every(item => savedTestSummary(item, storage).attempt === undefined));
});
