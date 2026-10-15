import { ModuleStudyOverview } from "./StudentDashboard";
import { TypedRecordBadge } from "./TypedAnswerPractice";
import { systemsRecallQuestions, systemsAppliedRecallQuestions } from "../data/typedReviewQuestions.js";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { systemsHydraulicsQuestions } from "../data/systemsHydraulics";
import { systemsMixedQuestions } from "../data/systemsMixedTest";
import MultipleChoicePractice from "./MultipleChoicePractice";

export function SystemsTestList() {
  return <section className="study-detail"><p className="study-eyebrow">BASIC AIRCRAFT SYSTEMS</p><h1>Module 1</h1><p className="study-detail-description">Hydraulics practice</p><ModuleStudyOverview basePath="/study/systems/module-1" /><Link className="study-option-link study-test-link" to="/study/systems/module-1/practice-1"><span className="study-test-link-heading"><strong>Practice Test #1</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">{systemsHydraulicsQuestions.length} questions · Hydraulics concepts <ChevronRight size={19} /></span><PracticeRecordBadge questions={systemsHydraulicsQuestions} testId="/study/systems/module-1/practice-1" /></Link><Link className="study-option-link study-test-link" to="/study/systems/module-1/practice-2"><span className="study-test-link-heading"><strong>Practice Test #2</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">{systemsMixedQuestions.length} questions · Applied review & diagrams <ChevronRight size={19} /></span><PracticeRecordBadge questions={systemsMixedQuestions} testId="/study/systems/module-1/practice-2" /></Link><Link className="study-option-link study-test-link" to="/study/systems/module-1/one-word-1"><span className="study-test-link-heading"><strong>One-Word Test #1</strong><span className="study-format-badge">Type one word</span></span><span className="study-test-link-description">{systemsRecallQuestions.length} questions · Hydraulics recall <ChevronRight size={19} /></span><TypedRecordBadge questions={systemsRecallQuestions} legacyQuestions={systemsHydraulicsQuestions} testId="/study/systems/module-1/practice-1" /></Link><Link className="study-option-link study-test-link" to="/study/systems/module-1/one-word-2"><span className="study-test-link-heading"><strong>One-Word Test #2</strong><span className="study-format-badge">Type one word</span></span><span className="study-test-link-description">{systemsAppliedRecallQuestions.length} questions · Applied recall & diagrams <ChevronRight size={19} /></span><TypedRecordBadge questions={systemsAppliedRecallQuestions} legacyQuestions={systemsMixedQuestions} testId="/study/systems/module-1/practice-2" /></Link><div className="study-flow-actions"><Link to="/study/systems"><ArrowLeft size={18} /> Systems</Link></div></section>;
}

export default function SystemsPractice() {
  return <MultipleChoicePractice questions={systemsHydraulicsQuestions} testNumber={1} course="Systems" basePath="/study/systems/module-1" />;
}
