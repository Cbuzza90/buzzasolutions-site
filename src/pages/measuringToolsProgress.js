import { legacyMeasuringToolsQuestions, measuringToolsQuestions } from "../data/measuringToolsPractice.js";
import { readPracticeRecord, restorePracticeAttempt, savePracticeAttempt, recordHighestScore } from "./practiceProgress.js";
import { scoreAnswers } from "./safetyTestLogic.js";

export const measuringToolsProgressKey = "/study/structures/module-2/practice-1:concepts";
export const legacyMeasuringToolsProgressKey = "/study/structures/module-2/practice-1";

export function migrateMeasuringToolsProgress(storage) {
  try {
    storage ??= globalThis.localStorage;
    if (readPracticeRecord("progress", measuringToolsProgressKey, storage)) return;
    const old = restorePracticeAttempt(legacyMeasuringToolsQuestions, readPracticeRecord("progress", legacyMeasuringToolsProgressKey, storage));
    if (!old) return;
    const ids = new Set(measuringToolsQuestions.map(q => q.id));
    const order = old.order.filter(q => ids.has(q.id));
    const answers = Object.fromEntries(Object.entries(old.answers).filter(([id]) => ids.has(id)));
    const complete = old.complete || Object.keys(answers).length === order.length;
    const position = complete ? order.length - 1 : Math.min(old.order.slice(0, old.position).filter(q => ids.has(q.id)).length, order.length - 1);
    const attempt = { ...old, order, answers, position, complete };
    if (!savePracticeAttempt(measuringToolsQuestions, measuringToolsProgressKey, attempt, storage)) return;
    if (complete) recordHighestScore(measuringToolsQuestions, measuringToolsProgressKey, scoreAnswers(order, answers), storage);
  } catch { /* A storage restriction does not prevent opening the new test. */ }
}
