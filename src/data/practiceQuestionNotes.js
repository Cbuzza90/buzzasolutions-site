import safety1 from "./safety-module1-test1.json" with { type: "json" };
import safety2 from "./safety-module1-test2.json" with { type: "json" };
import safety3 from "./safety-module1-recall.json" with { type: "json" };
import electricity from "./electricity-module1-test1.json" with { type: "json" };
import { systemsHydraulicsQuestions } from "./systemsHydraulics.js";
import { systemsMixedQuestions } from "./systemsMixedTest.js";
import { endlessTorqueQuestions } from "./torqueTest.js";

// The references use the same verified answer banks as the practice tests.
// New questions in these banks automatically become searchable study material.
export const practiceBanksByModule = {
  "/study/safety/module-1": [safety1, safety2, safety3],
  "/study/electricity/module-1": [electricity],
  "/study/systems/module-1": [systemsHydraulicsQuestions, systemsMixedQuestions],
  "/study/structures/module-1": [endlessTorqueQuestions],
};

export function practiceQuestionNotes(basePath) {
  return (practiceBanksByModule[basePath] ?? []).map((questions, index) => ({
    id: `practice-reference-${index + 1}`,
    title: basePath.includes("structures") ? "Endless torque practice · Question reference" : `Practice Test #${index + 1} · Question reference`,
    questionReference: true,
    items: questions.map(question => [
      question.prompt,
      `Answer: ${question.options[question.correctIndex]}. ${question.explanation}`,
      question.optionImages?.[question.correctIndex] ?? question.visual?.src ?? question.feedbackVisual?.src,
      question.diagram,
    ]),
  }));
}
