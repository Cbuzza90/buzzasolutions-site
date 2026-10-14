import PracticeRecordBadge from "./PracticeRecordBadge";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { systemsHydraulicsQuestions } from "../data/systemsHydraulics";
import { systemsMixedQuestions } from "../data/systemsMixedTest";
import MultipleChoicePractice from "./MultipleChoicePractice";

export function SystemsTestList() {
  return <section className="study-detail"><p className="study-eyebrow">BASIC AIRCRAFT SYSTEMS</p><h1>Module 1</h1><p className="study-detail-description">Hydraulics practice</p><Link className="study-option-link study-test-link" to="/study/systems/module-1/practice-1"><span className="study-test-link-heading"><strong>Practice Test #1</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">{systemsHydraulicsQuestions.length} questions · Hydraulics concepts <ChevronRight size={19} /></span><PracticeRecordBadge questions={systemsHydraulicsQuestions} testId="/study/systems/module-1/practice-1" /></Link><Link className="study-option-link study-test-link" to="/study/systems/module-1/practice-2"><span className="study-test-link-heading"><strong>Practice Test #2</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">{systemsMixedQuestions.length} questions · Applied review & diagrams <ChevronRight size={19} /></span><PracticeRecordBadge questions={systemsMixedQuestions} testId="/study/systems/module-1/practice-2" /></Link><Link className="study-option-link" to="/study/systems/module-1/notes"><span><strong>Study notes</strong><small>Quick reference · Fluids, valves, flow & diagrams</small></span><BookOpen size={22} /></Link><div className="study-detail-panel"><BookOpen size={25} /><h2>Before you start</h2><p>These tests focus on hydraulic concepts, components, and fluid identification. No calculations are required.</p><p>Choose the best of four answers. Questions and answer choices are shuffled each attempt. Tap diagrams to enlarge them.</p></div><div className="study-flow-actions"><Link to="/study/systems"><ArrowLeft size={18} /> Systems</Link></div></section>;
}

export default function SystemsPractice() {
  return <MultipleChoicePractice questions={systemsHydraulicsQuestions} testNumber={1} course="Systems" basePath="/study/systems/module-1" />;
}
