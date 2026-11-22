import MultipleChoicePractice from "./MultipleChoicePractice";
import { structuresHardwareQuizParts } from "../data/structuresHardwareQuizzes.js";

export default function StructuresHardwareQuiz({ presentation }) {
  const part = structuresHardwareQuizParts[presentation - 5];
  return <MultipleChoicePractice questions={part.questions} progressKey={part.storageId} testNumber={presentation} testTitle={part.title} course="Structures" basePath={part.basePath} />;
}
