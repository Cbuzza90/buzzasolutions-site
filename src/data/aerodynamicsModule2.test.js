import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { aeroSources, aerodynamicsChoiceQuestions as choice, aerodynamicsRecallQuestions as recall, aerodynamicsDiagrams, aerodynamicsModule2Path as path } from "./aerodynamicsModule2.js";
import { findNoteSections, studyNotesByModule } from "./courseStudyNotes.js";
import { dashboardTests } from "./studyDashboard.js";
import { aerodynamicsReviewQuestions as review, aerodynamicsReviewExclusions } from "./aerodynamicsReviewPractice.js";
import { gradeTypedAnswer, newTypedAttempt, saveTypedAttempt, restoreTypedAttempt, recordTypedBest, loadTypedBest } from "../pages/typedPracticeLogic.js";
import { newPracticeAttempt, savePracticeAttempt, restorePracticeAttempt, recordHighestScore, loadHighestScore, readPracticeRecord } from "../pages/practiceProgress.js";

test("Aerodynamics banks cover every available PDF and each topic with valid, source-backed choices and one-word keys", () => {
  assert.equal(choice.length, 318);
  assert.equal(recall.length, 287);
  for (const bank of [choice, recall, review]) {
    assert.equal(new Set(bank.map(q => q.id)).size, bank.length);
    assert.deepEqual([...new Set(bank.map(q => q.source.deck))].sort(), Object.keys(aeroSources).filter(key => bank !== review || !["empennage", "ground", "primaryStructure", "engineStructure", "stations", "stressDistribution"].includes(key)).sort());
    if (bank !== review) assert.equal(new Set(bank.map(q => q.topic)).size, bank === choice ? 34 : 33);
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

test("both module tests cover every review/quiz target with reworded questions, including all four final PDFs", () => {
  for (const bank of [choice,recall]) {
    for (const reference of review) {
      const variants = bank.filter(q => q.reviewTargets?.includes(reference.learningTarget));
      assert.ok(variants.length, reference.learningTarget);
      assert.ok(variants.every(q => q.prompt !== reference.prompt), reference.id);
      for (const n of reference.reviewQuestions) assert.ok(variants.some(q => q.reviewQuestions.includes(n)), `Review ${n}`);
      for (const n of reference.quizPositions) assert.ok(variants.some(q => q.quizPositions.includes(n)), `Quiz ${n}`);
    }
    assert.deepEqual([...new Set(bank.flatMap(q => q.reviewQuestions ?? []))].sort((a,b)=>a-b), Array.from({length:60},(_,i)=>i+1));
    assert.equal(new Set(bank.flatMap(q => q.quizPositions ?? [])).size,53);
    for (const deck of ["primaryStructure","engineStructure","stations","stressDistribution"]) assert.ok(bank.filter(q => q.source.deck===deck).length >= 8, deck);
  }
  const cautions = studyNotesByModule[path].sections.find(s => s.id === "aero-new-source-cautions");
  assert.ok(cautions.items.some(([label]) => label.includes("Normal stress")));
  assert.ok(cautions.items.some(([label]) => label.includes("Flap location")));
  for (const term of ["malleability","ductility","hardness","toughness","trunnion","pylon","lightening","datum","proof load","kinetic friction","yield"]) {
    assert.ok(findNoteSections(studyNotesByModule[path].sections,term).some(s=>!s.questionReference),term);
  }
});

test("every Aerodynamics question is searchable in its exact module, with valid enlargable source references", () => {
  const notes = studyNotesByModule[path];
  assert.ok(notes.basis.includes("14–29"));
  assert.ok(!/week 8.*pending|aren.t out yet/i.test(notes.intro));
  assert.equal(new Set(notes.sections.map(s => s.id)).size, notes.sections.length);
  for (const q of [...choice, ...recall, ...review]) {
    const items = findNoteSections(notes.sections, q.prompt).flatMap(s => s.items);
    assert.ok(items.some(item => item[0] === q.prompt && item[1].includes(q.explanation)), q.id);
  }
  for (const term of ["elevons", "ruddervators", "flaperons", "spoilerons", "stabilator", "positive static", "negative static", "neutral dynamic", "dihedral", "anhedral", "Dutch roll", "tension", "compression", "bending", "shear", "torsion", "Mach trim", "Mach feel", "load factor", "wing loading", "spar", "rib", "longerons", "trunnion", "dorsal", "ventral", "service panel", "stagger", "aspect ratio"]) {
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
  const choiceRecord = dashboardTests.find(t => t.slug === "aerodynamics-choice-part-1");
  const wordRecord = dashboardTests.find(t => t.slug === "aerodynamics-word-part-1");
  assert.equal(choiceRecord.path, `${path}/practice-2/part-1`);
  assert.equal(wordRecord.path, `${path}/one-word-1/part-1`);
  assert.notEqual(choiceRecord.storageId, wordRecord.storageId);
  const reviewRecord = dashboardTests.find(t => t.slug === "aerodynamics-review-part-1");
  assert.equal(reviewRecord.path, `${path}/practice-1/part-1`);
  assert.notEqual(reviewRecord.storageId, choiceRecord.storageId);
  recordHighestScore(reviewRecord.questions, reviewRecord.storageId, 25, storage);
  const attempt = newPracticeAttempt(choiceRecord.questions, () => 0.4);
  attempt.answers[attempt.order[0].id] = attempt.order[0].correctIndex;
  attempt.position = 1;
  savePracticeAttempt(choiceRecord.questions, choiceRecord.storageId, attempt, storage);
  assert.deepEqual(restorePracticeAttempt(choiceRecord.questions, readPracticeRecord("progress", choiceRecord.storageId, storage)), attempt);
  recordHighestScore(choiceRecord.questions, choiceRecord.storageId, 20, storage);
  const typed = newTypedAttempt(wordRecord.questions, () => 0.4);
  typed.answers[typed.order[0].id] = typed.order[0].answer;
  typed.position = 1;
  typed.draft = "unfinished";
  saveTypedAttempt(wordRecord.questions, wordRecord.storageId, typed, storage);
  assert.deepEqual(restoreTypedAttempt(wordRecord.questions, readPracticeRecord("typed-progress", wordRecord.storageId, storage)), typed);
  recordTypedBest(wordRecord.questions, wordRecord.storageId, 15, storage);
  savePracticeAttempt(choiceRecord.questions, choiceRecord.storageId, newPracticeAttempt(choiceRecord.questions), storage);
  saveTypedAttempt(wordRecord.questions, wordRecord.storageId, newTypedAttempt(wordRecord.questions), storage);
  assert.equal(loadHighestScore(choiceRecord.questions, choiceRecord.storageId, storage).score, 20);
  assert.equal(loadTypedBest(wordRecord.questions, wordRecord.storageId, storage).score, 15);
  assert.equal(loadHighestScore(reviewRecord.questions, reviewRecord.storageId, storage).score, 25);
});
