import { systemsMixedQuestions } from "../data/systemsMixedTest";
import TypedAnswerPractice from "./TypedAnswerPractice";
import { systemsAppliedRecallQuestions } from "../data/typedReviewQuestions.js";

export default function SystemsMixedPractice() {
  return <TypedAnswerPractice questions={systemsAppliedRecallQuestions} legacyQuestions={systemsMixedQuestions} testNumber={2} course="Systems" basePath="/study/systems/module-1" />;
}
