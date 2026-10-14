import { systemsMixedQuestions } from "../data/systemsMixedTest";
import MultipleChoicePractice from "./MultipleChoicePractice";

export default function SystemsMixedPractice() {
  return <MultipleChoicePractice questions={systemsMixedQuestions} testNumber={2} course="Systems" basePath="/study/systems/module-1" />;
}
