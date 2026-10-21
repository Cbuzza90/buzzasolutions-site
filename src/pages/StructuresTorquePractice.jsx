import { ModuleStudyOverview } from "./StudentDashboard";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { endlessTorqueQuestions, torqueQuestions } from "../data/torqueTest";
import { sampleTorqueQuestions, torquePracticeQuestions } from "../data/chartTorquePractice";
import MultipleChoicePractice from "./MultipleChoicePractice";
import MeasurementSimulators from "./MeasurementSimulators";
import { measuringToolsProgressKey, legacyMeasuringToolsProgressKey, migrateMeasuringToolsProgress } from "./measuringToolsProgress.js";
import { measuringToolsQuestions, legacyMeasuringToolsQuestions } from "../data/measuringToolsPractice.js";
import { structuresModule2Questions } from "../data/structuresModule2Review.js";
import TorqueChart from "./TorqueChart";

const basePath = "/study/structures/module-2";
const savedBasePath = "/study/structures/module-1";
const title = "Torque Bolt/Nut Practice Test";

export function StructuresTestList() {
  useState(() => { migrateMeasuringToolsProgress(); return true; });
  return <section className="study-detail"><p className="study-eyebrow">BASIC AIRCRAFT STRUCTURES 1</p><h1>Module 2</h1><p className="study-detail-description">Measuring tools, safetying, cables & aircraft hardware</p><ModuleStudyOverview basePath="/study/structures/module-2" /><Link className="study-option-link study-test-link" to={`${basePath}/practice-2`}><span className="study-test-link-heading"><strong>Module 2 Full Review</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">40 questions · All 5 presentations · {structuresModule2Questions.length} in the question pool <ChevronRight size={19} /></span><PracticeRecordBadge questions={structuresModule2Questions} questionCount={40} testId={`${basePath}/practice-2:40`} /></Link><Link className="study-option-link study-test-link" to={`${basePath}/practice-1`}><span className="study-test-link-heading"><strong>Measuring Tools</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">{measuringToolsQuestions.length} questions · Tool identification, torque wrenches &amp; precision instruments <ChevronRight size={19} /></span><PracticeRecordBadge questions={measuringToolsQuestions} testId={measuringToolsProgressKey} /><PracticeRecordBadge label="Previous version · Includes scale questions" questions={legacyMeasuringToolsQuestions} testId={legacyMeasuringToolsProgressKey} /></Link><Link className="study-option-link study-test-link" to={`${basePath}/torque-bolt-nut`}><span className="study-test-link-heading"><strong>{title}</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">20 random questions · {torquePracticeQuestions.length.toLocaleString("en-US")} chart combinations <ChevronRight size={19} /></span><PracticeRecordBadge questions={torquePracticeQuestions} questionCount={20} testId={`${savedBasePath}/torque-bolt-nut:20:chart-pools`} /><PracticeRecordBadge label="Previous 20-question pool" questions={endlessTorqueQuestions} questionCount={20} testId={`${savedBasePath}/torque-bolt-nut:20`} /><PracticeRecordBadge label="Previous endless round" questions={endlessTorqueQuestions} testId={`${savedBasePath}/torque-bolt-nut:endless`} /><PracticeRecordBadge label="Previous 50-question test" questions={torqueQuestions} testId={`${savedBasePath}/torque-bolt-nut`} /></Link><MeasurementSimulators /><div className="study-flow-actions"><Link to="/study/structures"><ArrowLeft size={18} /> Structures</Link></div></section>;
}

export default function StructuresTorquePractice() {
  return <MultipleChoicePractice compactTorqueLayout questions={torquePracticeQuestions} questionCount={20} sampleQuestions={sampleTorqueQuestions} progressKey={`${savedBasePath}/torque-bolt-nut:20:chart-pools`} testNumber={1} testTitle={title} course="Structures" basePath={basePath} reference={question => <TorqueChart question={question} practiceInline />} />;
}
