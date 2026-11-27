import { electricityBoldQuestions } from "./electricityBoldPractice.js";
import { structuresHardwareQuizParts } from "./structuresHardwareQuizzes.js";
import { ataCodeQuestions } from "./ataCodePractice.js";
import { mathTest2Questions } from "./mathTest2.js";
import { mathTest2ExtendedQuestions } from "./mathTest2Extended.js";
import { mathTest2GroupedQuestions } from "./mathTest2Grouped.js";
import { safetyModule2Choice, safetyModule2Recall } from "./safetyModule2.js";
import { safetyEasyReviewQuestions } from "./safetyEasyReview.js";
import { safetyTest2ReviewQuestions } from "./safetyTest2Review.js";
import { techPubWorksheetQuestions, techPubMediumQuestions } from "./techPubWorksheetPractice.js";
import { cotterPinQuestions } from "./cotterPinPractice.js";
import electricitySource from "./electricity-module1-test1.json" with { type: "json" };
import { electricityEasyQuestions } from "./electricityEasyReview.js";
import { electricityModule2Choice, electricityModule2Easy, electricityModule2Recall } from "./electricityModule2.js";
import { enginesTest3Questions, enginesTest3Path } from "./enginesTest3.js";
import { enginesReviewQuestions, enginesLectureQuestions } from "./enginesTest2.js";
import { aerodynamicsChoiceQuestions, aerodynamicsRecallQuestions } from "./aerodynamicsModule2.js";
import { aerodynamicsReviewQuestions } from "./aerodynamicsReviewPractice.js";
import { systemsHydraulicsQuestions } from "./systemsHydraulics.js";
import { systemsMixedQuestions } from "./systemsMixedTest.js";
import { systemsModule2Easy, systemsModule2Medium, systemsModule2Hard } from "./systemsModule2.js";
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
  "/study/math/module-2": [mathTest2Questions, mathTest2ExtendedQuestions, mathTest2GroupedQuestions],
  "/study/electricity/module-2": [electricityModule2Easy, electricityModule2Choice, electricityModule2Recall, electricityBoldQuestions],
  "/study/systems/module-2": [systemsModule2Easy, systemsModule2Medium, systemsModule2Hard],
  "/study/safety/module-2": [safetyModule2Choice,safetyModule2Recall,safetyEasyReviewQuestions,safetyTest2ReviewQuestions],
  "/study/publications/module-2": [ataCodeQuestions, techPubWorksheetQuestions, techPubMediumQuestions],
  [enginesTest3Path]: [enginesTest3Questions],
  "/study/engines/module-2": [enginesReviewQuestions, enginesLectureQuestions],
  "/study/aerodynamics/module-2": [aerodynamicsReviewQuestions, aerodynamicsChoiceQuestions, aerodynamicsRecallQuestions],
  "/study/safety/human-factors": [humanFactorsQuestions],
  "/study/safety/module-1": [safety1, safety2, safety3],
  "/study/electricity/module-1": [electricitySource, electricityEasyQuestions, electricityRecallQuestions],
  "/study/systems/module-1": [systemsHydraulicsQuestions, systemsMixedQuestions, systemsRecallQuestions, systemsAppliedRecallQuestions],
  "/study/structures/module-2": [...structuresHardwareQuizParts.map(part => part.questions)],
};

function referenceText(question) {
  const answer = (question.answer ?? question.options[question.correctIndex]).trim();
  const explanation = [question.explanation.trim(), ...(question.learningNotes ?? []).map(([title, text]) => `${title}: ${text}`)].join(" ");
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
    const title = questions === electricityBoldQuestions ? "Bold-Text Review" : structuresHardwareQuizParts.find(part => part.questions === questions)?.title ?? (questions === mathTest2Questions ? "Math Test 2 · 30-question practice" : questions === mathTest2ExtendedQuestions ? "Math Test 2 · Extended practice" : questions === mathTest2GroupedQuestions ? "Math Test 2 · Five of each type" : questions === systemsModule2Easy ? "Systems Test 2 · Easy Review" : questions === systemsModule2Medium ? "Systems Hydraulic Components · Medium" : questions === systemsModule2Hard ? "Systems Component Recall · Hard" : questions === safetyTest2ReviewQuestions ? "Safety Test 2 Review" : questions === techPubWorksheetQuestions ? "Test 2 Worksheet Practice" : questions[0]?.answer ? `One-Word Test #${++typedNumber}` : `Practice Test #${++choiceNumber}`);
    return {
      id: `practice-reference-${index + 1}`,
      title: `${questions === enginesReviewQuestions ? "Engines Review Questions" : questions === enginesLectureQuestions ? "Engines Lecture Practice" : questions === aerodynamicsReviewQuestions ? "Aerodynamics Review & Practice Quiz" : questions === aerodynamicsChoiceQuestions ? "Aerodynamics Notes Practice" : questions === aerodynamicsRecallQuestions ? "Aerodynamics One-Word Recall" : questions === ataCodeQuestions ? "ATA Review Chapters" : questions === techPubMediumQuestions ? "Tech Pub Project & Worksheet Practice" : questions === cotterPinQuestions ? "Cotter-Pin Diameter & Length" : questions === torquePracticeQuestions ? "Torque practice" : questions === structuresPostedQuestions ? "Posted Quiz Practice" : questions === measuringToolsQuestions ? "Measuring Tools" : questions === electricityEasyQuestions ? "Easy Review" : questions === humanFactorsQuestions ? "Human Factors" : title} · Question reference`,
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
