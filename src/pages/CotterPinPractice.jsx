import MultipleChoicePractice from "./MultipleChoicePractice";
import { cotterPinQuestions, cotterPinProgressKey, sampleCotterPinQuestions } from "../data/cotterPinPractice.js";

export default function CotterPinPractice() {
  return <MultipleChoicePractice questions={cotterPinQuestions} questionCount={20} sampleQuestions={sampleCotterPinQuestions} progressKey={cotterPinProgressKey} testNumber={3} testTitle="Cotter-Pin Diameter & Length" course="Structures" basePath="/study/structures/module-2" />;
}
