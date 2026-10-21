import MultipleChoicePractice from "./MultipleChoicePractice";
import { useState } from "react";
import { measuringToolsQuestions } from "../data/measuringToolsPractice.js";
import { measuringToolsProgressKey, migrateMeasuringToolsProgress } from "./measuringToolsProgress.js";

export default function MeasuringToolsPractice() {
  useState(() => { migrateMeasuringToolsProgress(); return true; });
  return <MultipleChoicePractice questions={measuringToolsQuestions} progressKey={measuringToolsProgressKey} testNumber={1} testTitle="Measuring Tools" course="Structures" basePath="/study/structures/module-2" />;
}
