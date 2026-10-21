import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { structuresModule2Questions, structuresHardwareQuestions, structuresModule2Diagrams, structuresReviewCategories, sampleStructuresReview } from "./structuresModule2Review.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";
import { dashboardTests } from "./studyDashboard.js";
import { newPracticeAttempt, restorePracticeAttempt, savePracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";

const path = "/study/structures/module-2";
test("full Structures pool maps all five course decks and selects eight unique questions from each", () => {
  assert.equal(structuresModule2Questions.length, 224);
  assert.equal(new Set(structuresModule2Questions.map(q => q.id)).size, 224);
  for (const random of [() => 0, () => 0.99, Math.random]) {
    const sampled = sampleStructuresReview(structuresModule2Questions, 40, random);
    assert.equal(sampled.length, 40);
    assert.equal(new Set(sampled.map(q => q.id)).size, 40);
    assert.deepEqual(structuresReviewCategories.map(c => sampled.filter(q => q.category === c).length), [8,8,8,8,8]);
  }
  const maxSlides = { "safety-cables": 63, bolts: 61, nuts: 39, "screws-pins": 31 };
  for (const q of structuresHardwareQuestions) {
    assert.ok(q.source.slides.every(slide => Number.isInteger(slide) && slide > 0 && slide <= maxSlides[q.source.deck]), q.id);
  }
  for (const diagram of Object.values(structuresModule2Diagrams)) assert.ok(existsSync(new URL(`../../public${diagram.src}`, import.meta.url)));
});

test("all full-review questions are searchable, without duplicating reused measuring references", () => {
  const notes = studyNotesByModule[path];
  for (const q of structuresModule2Questions) {
    const items = findNoteSections(notes.sections, q.prompt).flatMap(section => section.items);
    const answers = items.filter(item => item[0] === q.prompt && item[1].includes(q.explanation));
    assert.equal(answers.length, 1, q.id);
    assert.ok(answers[0][1].includes(q.options[q.correctIndex]), q.id);
  }
  for (const term of ["swage terminal", "tensiometer", "6–8", "AN310", "AN320", "AN364", "AN365", "AN935", "AN936", "AN385", "AN386", "Dzus", "Camloc", "Airloc", "single wrap straight", "double wrap spiral", "AS and AMS"]) {
    assert.ok(findNoteSections(notes.sections, term).some(section => !section.questionReference), term);
  }
});

test("all pasted safety-quiz facts have slide-backed answers and uncertain blanket claims are withheld", () => {
  const answer = target => { const q = structuresHardwareQuestions.find(q => q.learningTarget === target); assert.ok(q, target); return q.options[q.correctIndex]; };
  assert.equal(answer("wire-032"), "6–8");
  assert.equal(answer("wire-041"), "5–7");
  assert.equal(answer("wire-020"), "8–10");
  assert.equal(answer("turnbuckle-groove"), "A groove");
  assert.equal(answer("turnbuckle-exposed"), "3");
  assert.equal(answer("turnbuckle-damage"), "Replace it");
  assert.equal(answer("cotter-diameter-example"), "2/32 inch (1/16 inch)");
  assert.equal(answer("cotter-length-example"), "1 inch");
  assert.ok(!structuresHardwareQuestions.some(q => /what.*temperature.*NAS679|proves.*properly torqued/i.test(q.prompt)));
});

test("balanced 40-question attempts resume and keep best scores independently of older Structures tests", () => {
  const record = dashboardTests.find(t => t.slug === "structures-full-review");
  assert.equal(record.count, 40);
  assert.equal(record.storageId, `${path}/practice-2:40`);
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const attempt = newPracticeAttempt(structuresModule2Questions, () => 0.5, 40, sampleStructuresReview);
  attempt.answers[attempt.order[0].id] = attempt.order[0].correctIndex;
  attempt.position = 1;
  savePracticeAttempt(structuresModule2Questions, record.storageId, attempt, storage);
  const saved = JSON.parse(values.get(`study-practice:progress:${record.storageId}`));
  assert.deepEqual(restorePracticeAttempt(structuresModule2Questions, saved, 40), attempt);
  recordHighestScore(structuresModule2Questions, record.storageId, 34, storage, 40);
  savePracticeAttempt(structuresModule2Questions, record.storageId, newPracticeAttempt(structuresModule2Questions, () => 0.2, 40, sampleStructuresReview), storage);
  assert.equal(loadHighestScore(structuresModule2Questions, record.storageId, storage, 40).score, 34);
  assert.equal(loadHighestScore(structuresModule2Questions, `${path}/practice-1`, storage, 40), null);
});
