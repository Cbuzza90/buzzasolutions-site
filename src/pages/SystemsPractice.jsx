import TypedAnswerPractice, { TypedRecordBadge } from "./TypedAnswerPractice";
import { systemsRecallQuestions, systemsAppliedRecallQuestions } from "../data/typedReviewQuestions.js";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { systemsHydraulicsQuestions } from "../data/systemsHydraulics";
import { systemsMixedQuestions } from "../data/systemsMixedTest";


export function SystemsTestList() {
  return <section className="study-detail"><p className="study-eyebrow">BASIC AIRCRAFT SYSTEMS</p><h1>Module 1</h1><p className="study-detail-description">Hydraulics practice</p><Link className="study-option-link study-test-link" to="/study/systems/module-1/practice-1"><span className="study-test-link-heading"><strong>Practice Test #1</strong><span className="study-format-badge">Type one word</span></span><span className="study-test-link-description">{systemsRecallQuestions.length} questions · Hydraulics concepts <ChevronRight size={19} /></span><TypedRecordBadge questions={systemsRecallQuestions} legacyQuestions={systemsHydraulicsQuestions} testId="/study/systems/module-1/practice-1" /></Link><Link className="study-option-link study-test-link" to="/study/systems/module-1/practice-2"><span className="study-test-link-heading"><strong>Practice Test #2</strong><span className="study-format-badge">Type one word</span></span><span className="study-test-link-description">{systemsAppliedRecallQuestions.length} questions · Applied review & diagrams <ChevronRight size={19} /></span><TypedRecordBadge questions={systemsAppliedRecallQuestions} legacyQuestions={systemsMixedQuestions} testId="/study/systems/module-1/practice-2" /></Link><Link className="study-option-link" to="/study/systems/module-1/notes"><span><strong>Study notes</strong><small>Quick reference · Fluids, valves, flow & diagrams</small></span><BookOpen size={22} /></Link><div className="study-detail-panel"><BookOpen size={25} /><h2>Before you start</h2><p>These tests focus on hydraulic concepts, components, and fluid identification. No calculations are required.</p><p>Type one word to answer each question. Capitalization and common equivalent terms are accepted. Questions shuffle each attempt. Tap diagrams to enlarge them.</p></div><div className="study-flow-actions"><Link to="/study/systems"><ArrowLeft size={18} /> Systems</Link></div></section>;
}

export default function SystemsPractice() {
  return <TypedAnswerPractice questions={systemsRecallQuestions} legacyQuestions={systemsHydraulicsQuestions} testNumber={1} course="Systems" basePath="/study/systems/module-1" />;
}
