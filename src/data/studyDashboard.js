import electricity from "./electricity-module1-test1.json" with { type: "json" };
import { electricityEasyQuestions } from "./electricityEasyReview.js";
import { aerodynamicsChoiceQuestions, aerodynamicsRecallQuestions, aerodynamicsModule2Path } from "./aerodynamicsModule2.js";
import { aerodynamicsReviewQuestions } from "./aerodynamicsReviewPractice.js";
import { humanFactorsQuestions } from "./humanFactorsPractice.js";
import safety1 from "./safety-module1-test1.json" with { type: "json" };
import safety2 from "./safety-module1-test2.json" with { type: "json" };
import safety3 from "./safety-module1-recall.json" with { type: "json" };
import { systemsHydraulicsQuestions } from "./systemsHydraulics.js";
import { systemsMixedQuestions } from "./systemsMixedTest.js";
import { electricityRecallQuestions, systemsRecallQuestions, systemsAppliedRecallQuestions } from "./typedReviewQuestions.js";
import { structuresPostedQuestions, structuresPostedProgressKey } from "./structuresPostedPractice.js";
import { measuringToolsProgressKey } from "../pages/measuringToolsProgress.js";
import { measuringToolsQuestions } from "./measuringToolsPractice.js";
import { torquePracticeQuestions } from "./chartTorquePractice.js";
import { readPracticeRecord, restorePracticeAttempt, loadHighestScore } from "../pages/practiceProgress.js";
import { restoreTypedAttempt, loadTypedBest, gradeTypedAnswer } from "../pages/typedPracticeLogic.js";
import { restoreResistorAttempt, loadResistorBest, resistorTestId } from "../pages/resistorPracticeLogic.js";
import { gradeResistor } from "./resistorBands.js";

const choice = (slug, course, module, title, questions, suffix, storageId) => ({ slug, course, courseSlug: course.toLowerCase(), title, questions, kind: "choice", basePath: `/study/${course.toLowerCase()}/${module}`, path: `/study/${course.toLowerCase()}/${module}/${suffix}`, storageId: storageId ?? `/study/${course.toLowerCase()}/${module}/${suffix}` });
const typed = (slug, course, title, questions, number) => ({ ...choice(slug, course, "module-1", title, questions, `one-word-${number}`, `/study/${course.toLowerCase()}/module-1/practice-${number}`), kind: "typed" });
export const dashboardTests = [
  choice("aerodynamics-review", "Aerodynamics", "module-2", "Review & Practice Quiz", aerodynamicsReviewQuestions, "practice-1"),
  choice("aerodynamics-choice", "Aerodynamics", "module-2", "Notes Practice", aerodynamicsChoiceQuestions, "practice-2"),
  { ...choice("aerodynamics-word", "Aerodynamics", "module-2", "One-Word Recall", aerodynamicsRecallQuestions, "one-word-1", `${aerodynamicsModule2Path}/one-word-1`), kind: "typed" },
  choice("electricity-choice", "Electricity", "module-1", "Practice Test #1", electricity, "practice-1"),
  choice("electricity-easy", "Electricity", "module-1", "Review Practice · Easy", electricityEasyQuestions, "practice-2"),
  typed("electricity-word", "Electricity", "One-Word Test #1", electricityRecallQuestions, 1),
  choice("safety-human-factors", "Safety", "human-factors", "Human Factors Quiz", humanFactorsQuestions, "practice-1", "/study/safety/module-1/practice-4"),
  choice("safety-1", "Safety", "module-1", "Practice Test #1", safety1, "practice-1"),
  choice("safety-2", "Safety", "module-1", "Practice Test #2", safety2, "practice-2"),
  choice("safety-3", "Safety", "module-1", "Practice Test #3", safety3, "practice-3"),
  choice("systems-1", "Systems", "module-1", "Hydraulics · Multiple choice", systemsHydraulicsQuestions, "practice-1"),
  choice("systems-2", "Systems", "module-1", "Applied review · Multiple choice", systemsMixedQuestions, "practice-2"),
  typed("systems-word-1", "Systems", "Hydraulics · One-word recall", systemsRecallQuestions, 1),
  typed("systems-word-2", "Systems", "Applied review · One-word recall", systemsAppliedRecallQuestions, 2),
  choice("structures-posted-review", "Structures", "module-2", "Posted Quiz Practice", structuresPostedQuestions, "practice-2", structuresPostedProgressKey),
  choice("measuring-tools", "Structures", "module-2", "Measuring Tools", measuringToolsQuestions, "practice-1", measuringToolsProgressKey),
  { ...choice("torque", "Structures", "module-2", "Torque bolt/nut practice", torquePracticeQuestions, "torque-bolt-nut", "/study/structures/module-1/torque-bolt-nut:20:chart-pools"), count: 20 },
  { slug: "resistors", course: "Electricity", courseSlug: "electricity", title: "Resistor band calculations", kind: "resistor", basePath: "/study/electricity/module-1", path: resistorTestId, storageId: resistorTestId },
];
export function savedTestSummary(test, storage) {
  const type = test.kind === "typed" ? "typed-progress" : test.kind === "resistor" ? "resistor-progress" : "progress";
  const record = readPracticeRecord(type, test.storageId, storage);
  const attempt = test.kind === "typed" ? restoreTypedAttempt(test.questions, record) : test.kind === "resistor" ? restoreResistorAttempt(record) : restorePracticeAttempt(test.questions, record, test.count ?? test.questions.length);
  const best = test.kind === "typed" ? loadTypedBest(test.questions, test.storageId, storage) : test.kind === "resistor" ? loadResistorBest(storage) : loadHighestScore(test.questions, test.storageId, storage, test.count ?? test.questions.length);
  if (!attempt) return { test, best, answered: 0, total: test.count ?? test.questions?.length ?? 20, missed: [], updatedAt: null };
  const order = attempt.order ?? attempt.questions;
  const answered = Object.keys(attempt.answers).length;
  const missed = order.filter((q, i) => test.kind === "resistor" ? attempt.answers[i] && !gradeResistor(q, attempt.answers[i]).allCorrect : attempt.answers[q.id] !== undefined && !(test.kind === "typed" ? gradeTypedAnswer(q, attempt.answers[q.id]) : attempt.answers[q.id] === q.correctIndex));
  const hasDraft = typeof attempt.draft === "string" ? Boolean(attempt.draft.trim()) : attempt.draft && Object.entries(attempt.draft).some(([k, v]) => k !== "unit" && String(v).trim());
  const updatedAt = Number.isFinite(Date.parse(record.updatedAt)) ? record.updatedAt : null;
  return { test, attempt, best, answered, total: order.length, missed, updatedAt, unfinished: !attempt.complete && (answered > 0 || hasDraft), complete: attempt.complete };
}
export const newestFirst = (a, b) => (Date.parse(b.updatedAt) || 0) - (Date.parse(a.updatedAt) || 0);
export function loadDashboard(storage) { return dashboardTests.map(test => savedTestSummary(test, storage)).sort(newestFirst); }
