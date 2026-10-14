import safety1 from "./safety-module1-test1.json" with { type: "json" };
import safety2 from "./safety-module1-test2.json" with { type: "json" };
import safety3 from "./safety-module1-recall.json" with { type: "json" };
import electricity from "./electricity-module1-test1.json" with { type: "json" };
import { systemsHydraulicsQuestions } from "./systemsHydraulics.js";
import { systemsMixedQuestions } from "./systemsMixedTest.js";
import { torquePracticeQuestions } from "./chartTorquePractice.js";

// The references use the same verified answer banks as the practice tests.
// New questions in these banks automatically become searchable study material.
export const practiceBanksByModule = {
  "/study/safety/module-1": [safety1, safety2, safety3],
  "/study/electricity/module-1": [electricity],
  "/study/systems/module-1": [systemsHydraulicsQuestions, systemsMixedQuestions],
  "/study/structures/module-1": [torquePracticeQuestions],
};

function referenceText(question) {
  const answer = question.options[question.correctIndex].trim();
  const explanation = question.explanation.trim();
  const remaining = explanation.slice(answer.length);
  // Many course explanations already begin with the correct answer.
  if (explanation.startsWith(answer) && (!remaining || /^[\s.,:;!?–—-]/u.test(remaining))) {
    return `Answer: ${explanation}`;
  }
  return `Answer: ${answer}${/[.!?]$/.test(answer) ? "" : "."} ${explanation}`;
}

export function practiceQuestionNotes(basePath) {
  return (practiceBanksByModule[basePath] ?? []).map((questions, index) => ({
    id: `practice-reference-${index + 1}`,
    title: basePath.includes("structures") ? "Torque practice · Question reference" : `Practice Test #${index + 1} · Question reference`,
    questionReference: true,
    items: questions.map(question => [
      question.prompt,
      referenceText(question),
      question.optionImages?.[question.correctIndex] ?? question.visual?.src ?? question.feedbackVisual?.src,
      question.diagram,
    ]),
  }));
}
