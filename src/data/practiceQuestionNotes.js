import { cotterPinQuestions } from "./cotterPinPractice.js";
import electricitySource from "./electricity-module1-test1.json" with { type: "json" };
import { electricityEasyQuestions } from "./electricityEasyReview.js";
import { enginesReviewQuestions, enginesLectureQuestions } from "./enginesTest2.js";
import { aerodynamicsChoiceQuestions, aerodynamicsRecallQuestions } from "./aerodynamicsModule2.js";
import { aerodynamicsReviewQuestions } from "./aerodynamicsReviewPractice.js";
import { systemsHydraulicsQuestions } from "./systemsHydraulics.js";
import { systemsMixedQuestions } from "./systemsMixedTest.js";
import { humanFactorsQuestions } from "./humanFactorsPractice.js";
import safety1 from "./safety-module1-test1.json" with { type: "json" };
import safety2 from "./safety-module1-test2.json" with { type: "json" };
import safety3 from "./safety-module1-recall.json" with { type: "json" };
import { electricityRecallQuestions, systemsRecallQuestions, systemsAppliedRecallQuestions } from "./typedReviewQuestions.js";
import { structuresPostedQuestions } from "./structuresPostedPractice.js";
import { measuringToolsQuestions } from "./measuringToolsPractice.js";
import { torquePracticeQuestions } from "./chartTorquePractice.js";

// The references use the same verified answer banks as the practice tests.
// New questions in these banks automatically become searchable study material.
export const practiceBanksByModule = {
  "/study/engines/module-2": [enginesReviewQuestions, enginesLectureQuestions],
  "/study/aerodynamics/module-2": [aerodynamicsReviewQuestions, aerodynamicsChoiceQuestions, aerodynamicsRecallQuestions],
  "/study/safety/human-factors": [humanFactorsQuestions],
  "/study/safety/module-1": [safety1, safety2, safety3],
  "/study/electricity/module-1": [electricitySource, electricityEasyQuestions, electricityRecallQuestions],
  "/study/systems/module-1": [systemsHydraulicsQuestions, systemsMixedQuestions, systemsRecallQuestions, systemsAppliedRecallQuestions],
  "/study/structures/module-2": [torquePracticeQuestions, measuringToolsQuestions, structuresPostedQuestions, cotterPinQuestions],
};

function referenceText(question) {
  const answer = (question.answer ?? question.options[question.correctIndex]).trim();
  const explanation = question.explanation.trim();
  const remaining = explanation.slice(answer.length);
  // Many course explanations already begin with the correct answer.
  if (explanation.startsWith(answer) && (!remaining || /^[\s.,:;!?–—-]/u.test(remaining))) {
    return `Answer: ${explanation}`;
  }
  return `Answer: ${answer}${/[.!?]$/.test(answer) ? "" : "."} ${explanation}`;
}

export function practiceQuestionNotes(basePath) {
  let choiceNumber = 0, typedNumber = 0;
  const seenAerodynamicsReferences = new Set();
  return (practiceBanksByModule[basePath] ?? []).map((questions, index) => {
    const title = questions[0]?.answer ? `One-Word Test #${++typedNumber}` : `Practice Test #${++choiceNumber}`;
    return {
      id: `practice-reference-${index + 1}`,
      title: `${questions === enginesReviewQuestions ? "Engines Review Questions" : questions === enginesLectureQuestions ? "Engines Lecture Practice" : questions === aerodynamicsReviewQuestions ? "Aerodynamics Review & Practice Quiz" : questions === aerodynamicsChoiceQuestions ? "Aerodynamics Notes Practice" : questions === aerodynamicsRecallQuestions ? "Aerodynamics One-Word Recall" : questions === cotterPinQuestions ? "Cotter-Pin Diameter & Length" : questions === torquePracticeQuestions ? "Torque practice" : questions === structuresPostedQuestions ? "Posted Quiz Practice" : questions === measuringToolsQuestions ? "Measuring Tools" : questions === electricityEasyQuestions ? "Easy Review" : questions === humanFactorsQuestions ? "Human Factors" : title} · Question reference`,
      questionReference: true,
      items: questions.filter(question => {
        if (basePath !== "/study/aerodynamics/module-2") return true;
        const key = JSON.stringify([question.prompt, question.explanation, question.answer ?? question.options[question.correctIndex]]);
        if (seenAerodynamicsReferences.has(key)) return false;
        seenAerodynamicsReferences.add(key);
        return true;
      }).map(question => [
        question.prompt,
        referenceText(question),
        question.optionImages?.[question.correctIndex] ?? question.visual?.src ?? question.feedbackVisual?.src,
        question.diagram,
      ]),
    };
  });
}
