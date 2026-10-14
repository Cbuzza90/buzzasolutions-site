import TypedAnswerPractice from "./TypedAnswerPractice";
import electricitySource from "../data/electricity-module1-test1.json" with { type: "json" };
import { systemsHydraulicsQuestions } from "../data/systemsHydraulics.js";
import { systemsMixedQuestions } from "../data/systemsMixedTest.js";
import { electricityRecallQuestions, systemsRecallQuestions, systemsAppliedRecallQuestions } from "../data/typedReviewQuestions.js";

export function ElectricityWordPractice() {
  return <TypedAnswerPractice questions={electricityRecallQuestions} legacyQuestions={electricitySource} progressKey="/study/electricity/module-1/practice-1" testNumber={1} testTitle="One-Word Test #1" course="Electricity" basePath="/study/electricity/module-1" />;
}
export function SystemsWordPractice() {
  return <TypedAnswerPractice questions={systemsRecallQuestions} legacyQuestions={systemsHydraulicsQuestions} progressKey="/study/systems/module-1/practice-1" testNumber={1} testTitle="One-Word Test #1" course="Systems" basePath="/study/systems/module-1" />;
}
export function SystemsAppliedWordPractice() {
  return <TypedAnswerPractice questions={systemsAppliedRecallQuestions} legacyQuestions={systemsMixedQuestions} progressKey="/study/systems/module-1/practice-2" testNumber={2} testTitle="One-Word Test #2" course="Systems" basePath="/study/systems/module-1" />;
}
