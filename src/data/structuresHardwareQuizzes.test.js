import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { structuresHardwareQuizParts, hardwareQuizSourceIssues } from "./structuresHardwareQuizzes.js";
import { dashboardTests } from "./studyDashboard.js";
import { practiceBanksByModule } from "./practiceQuestionNotes.js";
import { studyPracticeNavigation } from "../pages/studyPracticeNavigation.js";
import { newPracticeAttempt, savePracticeAttempt, loadPracticeAttempt, recordHighestScore, loadHighestScore } from "../pages/practiceProgress.js";

test("three hardware tests cover each readable quiz item and individually expand matching sets", () => {
  assert.deepEqual(structuresHardwareQuizParts.map(part => part.questions.length), [37, 37, 47]);
  const ids = structuresHardwareQuizParts.flatMap(part => part.questions.map(q => q.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const [index, part] of structuresHardwareQuizParts.entries()) {
    const covered = new Set(part.questions.map(q => Number(q.source.question.split("-")[0])));
    for (let number = 1; number <= 30; number++) {
      if ((index === 1 && number === 1) || (index === 2 && number === 25)) continue;
      assert.ok(covered.has(number), `${part.title}: source question ${number}`);
    }
    for (const q of part.questions) {
      assert.equal(q.options.length, 4, q.id);
      assert.equal(new Set(q.options).size, 4, q.id);
      assert.ok(q.explanation.length > 50, q.id);
      assert.ok(!q.options.some(option => /both [ABCD] and [ABCD]/i.test(option)), q.id);
      if (q.diagram) {
        assert.ok(existsSync(new URL(`../../public${q.diagram.src}`, import.meta.url)), q.id);
        assert.ok(q.diagram.crop.width > 0 && q.diagram.crop.height > 0, q.id);
      }
    }
  }
  assert.ok(hardwareQuizSourceIssues.some(([label]) => label.includes("AN75-3")));
  assert.ok(hardwareQuizSourceIssues.some(([label]) => label.includes("AN392-6")));
  const question = (deck, number) => structuresHardwareQuizParts[deck].questions.find(q => q.source.question === number);
  assert.equal(question(1, "11").options[0], "5/16 inch");
  assert.match(question(0, "3").prompt, /grip length/);
  assert.equal(question(1, "3").options[0], "AN355 slotted engine nut");
  assert.equal(question(2, "10").options[0], "AN505");
  assert.equal(question(2, "29").options[0], "AN507");
});

test("new hardware routes participate in notes, dashboard, reset navigation and independent saved attempts", () => {
  const values = new Map();
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  for (const part of structuresHardwareQuizParts) {
    assert.ok(practiceBanksByModule[part.basePath].includes(part.questions));
    assert.equal(dashboardTests.find(item => item.slug === part.slug), part);
    assert.deepEqual(studyPracticeNavigation(part.path), { onPractice: true, testsPath: part.basePath });
    const attempt = newPracticeAttempt(part.questions, () => 0.25);
    attempt.answers[attempt.order[0].id] = attempt.order[0].correctIndex;
    savePracticeAttempt(part.questions, part.storageId, attempt, storage);
    assert.deepEqual(loadPracticeAttempt(part.questions, part.storageId, storage), attempt);
    recordHighestScore(part.questions, part.storageId, 10, storage);
    savePracticeAttempt(part.questions, part.storageId, newPracticeAttempt(part.questions), storage);
    assert.equal(loadHighestScore(part.questions, part.storageId, storage).score, 10);
  }
  assert.equal(new Set(structuresHardwareQuizParts.map(part => part.storageId)).size, 3);
});
