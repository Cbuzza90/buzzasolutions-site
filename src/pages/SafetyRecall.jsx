import questions from "../data/safety-module1-recall.json";
import { gradeRecall } from "./recallLogic";
import TypedPractice from "./TypedPractice";

export default function SafetyRecall() {
  return <TypedPractice questions={questions} title="Recall Challenge" eyebrow="SAFETY · MODULE 1 · RECALL CHALLENGE" basePath="/study/safety/module-1" gradeAnswer={gradeRecall} helpText="Short answers are fine. Minor spelling mistakes can count. Include all requested terms; use commas for multiple answers." />;
}
