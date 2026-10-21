import MultipleChoicePractice from "./MultipleChoicePractice";
import { sampleStructuresReview, structuresModule2Questions } from "../data/structuresModule2Review.js";

export default function StructuresModule2Practice() {
  return <MultipleChoicePractice questions={structuresModule2Questions} questionCount={40} sampleQuestions={sampleStructuresReview} testNumber={2} testTitle="Module 2 Full Review" course="Structures" basePath="/study/structures/module-2" />;
}
