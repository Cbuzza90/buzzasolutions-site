import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { safetyTest2Review as review, safetyTest2ReviewQuestions as bank } from "./safetyTest2Review.js";
import { safetyEasyReviewQuestions, safetyEasyReviewParts } from "./safetyEasyReview.js";
import { safetyModule2Parts } from "./safetyModule2.js";
import { studyNotesByModule, findNoteSections } from "./courseStudyNotes.js";
import { dashboardTests, savedTestSummary } from "./studyDashboard.js";
import { shufflePractice } from "../pages/safetyTestLogic.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";
import { newPracticeAttempt, savePracticeAttempt, loadPracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";

test("full Safety Test 2 Review covers the supplied review, expands grouped sets, and excludes conflicting oxygen figures", () => {
  assert.equal(bank.length, 135);
  assert.equal(new Set(bank.map(question => question.id)).size, bank.length);
  assert.ok(!bank.some(question => /oxygen.*range|range.*oxygen/i.test(question.prompt)));
  for (const prefix of ["element-", "example-"]) assert.equal(bank.filter(question => question.id.startsWith(`safety2-review-${prefix}`)).length, 3);
  for (const [prefix, count] of [["energy-", 8], ["danger-", 10], ["attach-", 5], ["old-msds-", 9], ["symbol-", 9], ["legacy-", 3], ["fluid-line-", 16]]) {
    assert.equal(bank.filter(question => question.id.startsWith(`safety2-review-${prefix}`)).length, count, prefix);
  }
  for (const question of shufflePractice(bank, () => 0.37)) {
    const original = bank.find(item => item.id === question.id);
    assert.equal(question.options.length, 4, question.id);
    assert.equal(new Set(question.options.map(option => option.toLowerCase().trim())).size, 4, question.id);
    assert.equal(question.options[question.correctIndex], original.options[original.correctIndex], question.id);
    assert.ok(question.explanation.length > 130, question.id);
    assert.ok(question.source.slides.every(slide => slide >= 1 && slide <= 76), question.id);
    assert.match(question.explanation, /compressed/);
    assert.ok(!/Under 20MB|student-review|student slide/.test(question.explanation), question.id);
    assert.ok(!question.options.some(option => /both [a-d] and [a-d]|of the above/i.test(option)), question.id);
    if (question.diagram) assert.ok(existsSync(new URL(`../../public${question.diagram.src}`, import.meta.url)));
  }
  assert.ok(bank.filter(question => question.id.includes("old-msds")).every(question => /older nine-heading/.test(question.prompt)));
  assert.ok(bank.filter(question => question.id.includes("attach-")).every(question => /not universal|not a universal/i.test(question.explanation)));
  assert.equal(safetyEasyReviewQuestions.length, 132, "Keep the previous Easy bank and scores independent");
});

test("each full-review question and source caveat is searchable in Safety Module 2", () => {
  const notes = studyNotesByModule[review.basePath];
  for (const question of bank) {
    assert.ok(findNoteSections(notes.sections, question.prompt).filter(section => section.questionReference)
      .flatMap(section => section.items).some(([prompt, explanation]) => prompt === question.prompt && explanation.includes(question.explanation)), question.id);
  }
  for (const term of ["oxygen figures", "Product labels", "Worker education", "Aircraft auxiliary fuel tanks", "Rear fuselage", "Flow", "WHMIS", "JHSC", "MSDS", "Instrument Air"]) {
    assert.ok(findNoteSections(notes.sections, term).some(section => !section.questionReference), term);
  }
  const checks = notes.sections.find(section => section.id === "safety2-test2-source-checks");
  assert.match(checks.items[0][1], /19\.5.*18.*23/);
});

test("full review is routed, tracked on the dashboard, and restores shuffled progress without sharing existing test records", () => {
  assert.equal(dashboardTests.find(item => item.path === review.path), review);
  assert.deepEqual(studyPracticeNavigation(review.path), { onPractice: true, testsPath: review.basePath });
  assert.ok([...safetyEasyReviewParts, ...safetyModule2Parts].every(part => part.storageId !== review.storageId));
  const records = new Map();
  const storage = { getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) };
  const attempt = newPracticeAttempt(bank, () => 0.37);
  attempt.answers[attempt.order[0].id] = attempt.order[0].correctIndex;
  assert.equal(savePracticeAttempt(bank, review.storageId, attempt, storage), true);
  const restored = loadPracticeAttempt(bank, review.storageId, storage);
  assert.deepEqual(restored.order, attempt.order);
  assert.deepEqual(restored.answers, attempt.answers);
  assert.equal(savedTestSummary(review, storage).answered, 1);
  recordHighestScore(bank, review.storageId, 100, storage);
  savePracticeAttempt(bank, review.storageId, newPracticeAttempt(bank), storage);
  assert.equal(loadHighestScore(bank, review.storageId, storage).score, 100);
  assert.ok([...safetyEasyReviewParts, ...safetyModule2Parts].every(part => savedTestSummary(part, storage).attempt === undefined));
});
