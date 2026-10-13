import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { gradeSystemsHydraulics, systemsHydraulicsQuestions } from "../data/systemsHydraulics";
import { systemsMixedQuestions } from "../data/systemsMixedTest";
import TypedPractice from "./TypedPractice";

export function SystemsTestList() {
  return <section className="study-detail"><p className="study-eyebrow">BASIC AIRCRAFT SYSTEMS</p><h1>Module 1</h1><p className="study-detail-description">Hydraulics practice</p><Link className="study-option-link study-test-link" to="/study/systems/module-1/practice-1"><span className="study-test-link-heading"><strong>Practice Test #1</strong><span className="study-format-badge">Typed Answers</span></span><span className="study-test-link-description">{systemsHydraulicsQuestions.length} questions · Hydraulics recall <ChevronRight size={19} /></span></Link><Link className="study-option-link study-test-link" to="/study/systems/module-1/practice-2"><span className="study-test-link-heading"><strong>Practice Test #2</strong><span className="study-format-badge">Mixed Format</span></span><span className="study-test-link-description">{systemsMixedQuestions.length} questions · Concepts, matching & diagrams <ChevronRight size={19} /></span></Link><div className="study-detail-panel"><BookOpen size={25} /><h2>Before you start</h2><p>These tests focus on hydraulic concepts, components, and fluid identification. No calculations are required.</p><p>Short answers accept small spelling mistakes and equivalent wording. Complete every part of matching questions, and tap diagrams to enlarge them.</p></div><div className="study-flow-actions"><Link to="/study/systems"><ArrowLeft size={18} /> Systems</Link></div></section>;
}

export default function SystemsPractice() {
  return <TypedPractice questions={systemsHydraulicsQuestions} title="Systems Practice Test #1" eyebrow="SYSTEMS · HYDRAULICS · PRACTICE TEST #1" basePath="/study/systems/module-1" gradeAnswer={gradeSystemsHydraulics} helpText="Answer with a word or short phrase. Small spelling mistakes and equivalent wording are accepted." />;
}
