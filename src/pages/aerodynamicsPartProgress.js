import { aerodynamicsTestFamilies } from "../data/aerodynamicsTestParts.js";
import { migrateAerodynamicsProgress } from "./aerodynamicsProgress.js";
import { readPracticeRecord, restorePracticeAttempt, savePracticeAttempt, recordHighestScore } from "./practiceProgress.js";
import { restoreTypedAttempt, saveTypedAttempt, recordTypedBest, typedScore } from "./typedPracticeLogic.js";
import { scoreAnswers } from "./safetyTestLogic.js";

export function migrateAerodynamicsParts(storage) {
  try {
    storage ??= globalThis.localStorage;
    migrateAerodynamicsProgress(storage);
    for (const family of aerodynamicsTestFamilies) {
      const typed = family.kind === "typed", type = typed ? "typed-progress" : "progress";
      const old = (typed ? restoreTypedAttempt : restorePracticeAttempt)(family.questions, readPracticeRecord(type,family.fullKey,storage));
      if (!old) continue;
      for (const part of family.parts) {
        if (readPracticeRecord(type,part.storageId,storage)) continue;
        const ids = new Set(part.questions.map(q=>q.id));
        const order = old.order.filter(q=>ids.has(q.id));
        const answers = Object.fromEntries(Object.entries(old.answers).filter(([id])=>ids.has(id)));
        const current = order.findIndex(q=>q.id===old.order[old.position].id);
        const draft = typed && current >= 0 && !old.complete ? old.draft : "";
        const answered = Object.keys(answers).length;
        if (!answered && !draft) continue;
        const complete = answered===order.length;
        const position = complete ? order.length-1 : current>=0 ? current : answered;
        const attempt = { order, answers, position, complete, ...(typed ? {draft} : {completedRounds:0,previousCorrect:0}) };
        const saved = (typed ? saveTypedAttempt : savePracticeAttempt)(part.questions,part.storageId,attempt,storage);
        if (saved && complete) {
          const score = typed ? typedScore(attempt) : scoreAnswers(order,answers);
          (typed ? recordTypedBest : recordHighestScore)(part.questions,part.storageId,score,storage);
        }
      }
    }
  } catch { /* A browser storage restriction must not prevent practice. */ }
}
