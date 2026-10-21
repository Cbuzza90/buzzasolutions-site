import MultipleChoicePractice from "./MultipleChoicePractice";
import { structuresPostedQuestions, structuresPostedProgressKey } from "../data/structuresPostedPractice.js";

export default function StructuresModule2Practice() {
  return <MultipleChoicePractice questions={structuresPostedQuestions} progressKey={structuresPostedProgressKey} testNumber={2} testTitle="Posted Quiz Practice" course="Structures" basePath="/study/structures/module-2" />;
}
