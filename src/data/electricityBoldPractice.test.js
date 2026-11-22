import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { electricityBoldQuestions, electricityBoldPractice } from "./electricityBoldPractice.js";
import { electricityBoldGuide } from "./electricityBoldStudyNotes.js";
import { electricityModule2Parts } from "./electricityModule2.js";
import { dashboardTests } from "./studyDashboard.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";
import { newPracticeAttempt, savePracticeAttempt, loadPracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";

test("bold-text review covers each substantive PDF note with four distinct choices and its own source explanation", () => {
  assert.equal(electricityBoldQuestions.length, 122);
  assert.equal(new Set(electricityBoldQuestions.map(q => q.id)).size, 122);
  for (const q of electricityBoldQuestions) {
    assert.equal(q.options.length, 4, q.id);
    assert.equal(new Set(q.options.map(o => o.toLowerCase().trim())).size, 4, q.id);
    assert.ok(q.options.every(o => o.trim() && !/both [a-d] and [a-d]|of the above/i.test(o)), q.id);
    const [, slides, explanation] = electricityBoldGuide.find(g => g.deck === q.source.deck).entries[q.source.boldNote - 1];
    assert.deepEqual(q.source.slides, slides, q.id);
    assert.ok(q.explanation.includes(explanation), q.id);
    assert.equal(q.correctIndex, 0);
  }
  for (const group of electricityBoldGuide) for (let i = 0; i < group.entries.length; i++) {
    if (group.deck !== "battery" && i === 0) continue; // Reading list / syllabus headings.
    assert.ok(electricityBoldQuestions.some(q => q.source.deck === group.deck && q.source.boldNote === i + 1), `${group.deck} note ${i + 1}`);
  }
  assert.ok(!electricityBoldQuestions.some(q => /9 or 10|treat.*burn|short.*3.?8 hours/.test(q.prompt)));
  assert.ok(existsSync(new URL("../../public/electricity/electrical-test-2-bold-study-notes.pdf", import.meta.url)));
});

test("bold review has independent progress, score, dashboard and reset navigation without changing the original tests", () => {
  const part = electricityBoldPractice;
  assert.ok(!electricityModule2Parts.some(other => other.path === part.path || other.storageId === part.storageId));
  assert.equal(dashboardTests.find(t => t.slug === part.slug), part);
  assert.deepEqual(studyPracticeNavigation(part.path), { onPractice: true, testsPath: part.basePath });
  const records = new Map(), storage = { getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) };
  const attempt = newPracticeAttempt(part.questions, () => 0.37);
  attempt.answers[attempt.order[0].id] = attempt.order[0].correctIndex;
  savePracticeAttempt(part.questions, part.storageId, attempt, storage);
  assert.deepEqual(loadPracticeAttempt(part.questions, part.storageId, storage), attempt);
  recordHighestScore(part.questions, part.storageId, 100, storage);
  savePracticeAttempt(part.questions, part.storageId, newPracticeAttempt(part.questions), storage);
  assert.equal(loadHighestScore(part.questions, part.storageId, storage).score, 100);
});
