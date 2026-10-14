import { systemsMixedQuestions } from "../data/systemsMixedTest";
import MultipleChoicePractice from "./MultipleChoicePractice";
import { SystemsStudyGuide } from "./SystemsStudyNotes";

export default function SystemsMixedPractice() {
  return <MultipleChoicePractice questions={systemsMixedQuestions} testNumber={2} course="Systems" basePath="/study/systems/module-1" reference={<SystemsStudyGuide />} />;
}
