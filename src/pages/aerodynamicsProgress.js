import { aerodynamicsChoiceQuestions, aerodynamicsRecallQuestions, legacyAerodynamicsChoiceQuestions, legacyAerodynamicsRecallQuestions, previousAerodynamicsChoiceQuestions, previousAerodynamicsRecallQuestions, aerodynamicsModule2Path } from "../data/aerodynamicsModule2.js";
import { readPracticeRecord, restorePracticeAttempt, savePracticeAttempt, newPracticeAttempt } from "./practiceProgress.js";
import { restoreTypedAttempt, saveTypedAttempt, newTypedAttempt } from "./typedPracticeLogic.js";

export const legacyAeroChoiceKey = `${aerodynamicsModule2Path}/practice-2`;
export const legacyAeroRecallKey = `${aerodynamicsModule2Path}/one-word-1`;
export const previousAeroChoiceKey = `${legacyAeroChoiceKey}:complete-v2`;
export const aeroChoiceKey = `${legacyAeroChoiceKey}:complete-v3`;
export const previousAeroRecallKey = `${legacyAeroRecallKey}:complete-v2`;
export const aeroRecallKey = `${legacyAeroRecallKey}:complete-v3`;

// Keep the original bank and best records intact. Compatible answers/options
// remain in order; newly supplied questions are shuffled after the old bank.
export function migrateAerodynamicsProgress(storage) {
  try {
    storage ??= globalThis.localStorage;
    if (!readPracticeRecord("progress", aeroChoiceKey, storage)) {
      const old = restorePracticeAttempt(previousAerodynamicsChoiceQuestions, readPracticeRecord("progress", previousAeroChoiceKey, storage))
        ?? restorePracticeAttempt(legacyAerodynamicsChoiceQuestions, readPracticeRecord("progress", legacyAeroChoiceKey, storage));
      if (old) {
        const ids = new Set(old.order.map(q => q.id));
        const extra = newPracticeAttempt(aerodynamicsChoiceQuestions.filter(q => !ids.has(q.id))).order;
        savePracticeAttempt(aerodynamicsChoiceQuestions, aeroChoiceKey, { ...old, order: [...old.order, ...extra], position: old.complete ? old.order.length : old.position, complete: false }, storage);
      }
    }
    if (!readPracticeRecord("typed-progress", aeroRecallKey, storage)) {
      const old = restoreTypedAttempt(previousAerodynamicsRecallQuestions, readPracticeRecord("typed-progress", previousAeroRecallKey, storage))
        ?? restoreTypedAttempt(legacyAerodynamicsRecallQuestions, readPracticeRecord("typed-progress", legacyAeroRecallKey, storage));
      if (old) {
        const ids = new Set(old.order.map(q => q.id));
        const extra = newTypedAttempt(aerodynamicsRecallQuestions.filter(q => !ids.has(q.id))).order;
        saveTypedAttempt(aerodynamicsRecallQuestions, aeroRecallKey, { ...old, order: [...old.order, ...extra], position: old.complete ? old.order.length : old.position, draft: old.complete ? "" : old.draft, complete: false }, storage);
      }
    }
  } catch { /* Storage restrictions must not prevent opening a test. */ }
}
