import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { aeroSources, aerodynamicsChoiceQuestions as choice, aerodynamicsRecallQuestions as recall, aerodynamicsDiagrams, aerodynamicsWeek8Warning, aerodynamicsModule2Path as path } from "./aerodynamicsModule2.js";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";
import { dashboardTests } from "./studyDashboard.js";
import { aerodynamicsReviewQuestions as review, aerodynamicsReviewExclusions } from "./aerodynamicsReviewPractice.js";
import { gradeTypedAnswer, newTypedAttempt, saveTypedAttempt, restoreTypedAttempt, recordTypedBest, loadTypedBest } from "../pages/typedPracticeLogic.js";
import { newPracticeAttempt, savePracticeAttempt, restorePracticeAttempt, recordHighestScore, loadHighestScore, readPracticeRecord } from "../pages/practiceProgress.js";

test("Aerodynamics banks cover every available PDF and each topic with valid, source-backed choices and one-word keys", () => {
  assert.equal(choice.length, 165);
  assert.equal(recall.length, 124);
  for (const bank of [choice, recall, review]) {
    assert.equal(new Set(bank.map(q => q.id)).size, bank.length);
    assert.deepEqual([...new Set(bank.map(q => q.source.deck))].sort(), Object.keys(aeroSources).sort());
    if (bank !== review) assert.equal(new Set(bank.map(q => q.topic)).size, 19);
    for (const q of bank) {
      assert.ok(q.explanation && q.source.pages.length);
      assert.ok(q.source.pages.every(page => Number.isInteger(page) && page > 0 && page <= aeroSources[q.source.deck].pages), q.id);
      if (q.options) {
        assert.equal(q.options.length, 4, q.id);
        assert.equal(new Set(q.options.map(s => s.toLowerCase())).size, 4, q.id);
        assert.ok(q.options[q.correctIndex], q.id);
        assert.ok(!q.options.some(option => /both [a-d] and [a-d]|all of the above/i.test(option)), q.id);
      } else {
        assert.match(q.answer, /^\p{L}+(?:[-']\p{L}+)*$/u, q.id);
        assert.ok(gradeTypedAnswer(q, q.answer.toUpperCase()), q.id);
        for (const alias of q.acceptedAnswers) assert.ok(gradeTypedAnswer(q, alias), q.id);
        assert.ok(!gradeTypedAnswer(q, "not the answer"), q.id);
      }
    }
  }
});

test("review test covers all 60 review entries and 53 conceptual quiz positions, with the calculation explicitly excluded", () => {
  assert.equal(review.length, 136);
  assert.deepEqual([...new Set(review.flatMap(q => q.reviewQuestions))].sort((a,b) => a-b), Array.from({ length: 60 }, (_, i) => i+1));
  const positions = new Set(review.flatMap(q => q.quizPositions));
  for (let i = 1; i <= 54; i++) assert.equal(positions.has(i), i !== 40, `Quiz Q${i}`);
  assert.deepEqual(aerodynamicsReviewExclusions.map(q => q.quizPosition), [40]);
  const onset = review.find(q => q.learningTarget === "bank-onset");
  assert.match(onset.explanation, /misleading/);
  assert.ok(review.find(q => q.learningTarget === "vortex-generators").options[0].includes("boundary layer"));
});

test("every Aerodynamics question is searchable in its exact module, with valid enlargable source references", () => {
  const notes = studyNotesByModule[path];
  assert.ok(notes.basis.includes("14–23"));
  assert.ok(notes.intro.includes(aerodynamicsWeek8Warning));
  assert.equal(new Set(notes.sections.map(s => s.id)).size, notes.sections.length);
  for (const q of [...choice, ...recall, ...review]) {
    const items = findNoteSections(notes.sections, q.prompt).flatMap(s => s.items);
    assert.ok(items.some(item => item[0] === q.prompt && item[1].includes(q.explanation)), q.id);
  }
  for (const term of ["elevons", "ruddervators", "flaperons", "spoilerons", "stabilator", "positive static", "negative static", "neutral dynamic", "dihedral", "anhedral", "Dutch roll", "tension", "compression", "bending", "shear", "torsion", "Mach trim", "Mach feel", "load factor", "wing loading", "spar", "rib", "longerons"]) {
    assert.ok(findNoteSections(notes.sections, term).some(s => !s.questionReference), term);
  }
  for (const diagram of Object.values(aerodynamicsDiagrams)) {
    assert.ok(existsSync(new URL(`../../public${diagram.src}`, import.meta.url)));
    assert.equal(diagram.crop.width, 1920);
    assert.ok(diagram.alt);
  }
});

test("choice and recall save, resume, reset and retain independent best scores", () => {
  const entries = new Map(), storage = { getItem: key => entries.get(key) ?? null, setItem: (key, value) => entries.set(key, value) };
  const choiceRecord = dashboardTests.find(t => t.slug === "aerodynamics-choice");
  const wordRecord = dashboardTests.find(t => t.slug === "aerodynamics-word");
  assert.equal(choiceRecord.path, `${path}/practice-2`);
  assert.equal(wordRecord.path, `${path}/one-word-1`);
  assert.notEqual(choiceRecord.storageId, wordRecord.storageId);
  const reviewRecord = dashboardTests.find(t => t.slug === "aerodynamics-review");
  assert.equal(reviewRecord.path, `${path}/practice-1`);
  assert.notEqual(reviewRecord.storageId, choiceRecord.storageId);
  recordHighestScore(review, reviewRecord.storageId, 110, storage);
  const attempt = newPracticeAttempt(choice, () => 0.4);
  attempt.answers[attempt.order[0].id] = attempt.order[0].correctIndex;
  attempt.position = 1;
  savePracticeAttempt(choice, choiceRecord.storageId, attempt, storage);
  assert.deepEqual(restorePracticeAttempt(choice, readPracticeRecord("progress", choiceRecord.storageId, storage)), attempt);
  recordHighestScore(choice, choiceRecord.storageId, 100, storage);
  const typed = newTypedAttempt(recall, () => 0.4);
  typed.answers[typed.order[0].id] = typed.order[0].answer;
  typed.position = 1;
  typed.draft = "unfinished";
  saveTypedAttempt(recall, wordRecord.storageId, typed, storage);
  assert.deepEqual(restoreTypedAttempt(recall, readPracticeRecord("typed-progress", wordRecord.storageId, storage)), typed);
  recordTypedBest(recall, wordRecord.storageId, 80, storage);
  savePracticeAttempt(choice, choiceRecord.storageId, newPracticeAttempt(choice), storage);
  saveTypedAttempt(recall, wordRecord.storageId, newTypedAttempt(recall), storage);
  assert.equal(loadHighestScore(choice, choiceRecord.storageId, storage).score, 100);
  assert.equal(loadTypedBest(recall, wordRecord.storageId, storage).score, 80);
  assert.equal(loadHighestScore(review, reviewRecord.storageId, storage).score, 110);
});
