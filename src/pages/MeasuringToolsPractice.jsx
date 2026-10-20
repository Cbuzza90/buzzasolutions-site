import MultipleChoicePractice from "./MultipleChoicePractice";
import { measuringToolsQuestions } from "../data/measuringToolsPractice.js";

export default function MeasuringToolsPractice() {
  return <MultipleChoicePractice questions={measuringToolsQuestions} testNumber={1} testTitle="Measuring Tools" course="Structures" basePath="/study/structures/module-2" />;
}
