import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { gradeSystemsHydraulics, systemsHydraulicsQuestions } from "../data/systemsHydraulics";
import TypedPractice from "./TypedPractice";

export function SystemsTestList() {
  return <section className="study-detail"><p className="study-eyebrow">BASIC AIRCRAFT SYSTEMS</p><h1>Module 1</h1><p className="study-detail-description">Hydraulics practice</p><Link className="study-option-link study-test-link" to="/study/systems/module-1/practice-1"><span className="study-test-link-heading"><strong>Practice Test #1</strong><span className="study-format-badge">Typed Answers</span></span><span className="study-test-link-description">50 questions · Hydraulics recall & calculations <ChevronRight size={19} /></span></Link><div className="study-detail-panel"><BookOpen size={25} /><h2>Before you start</h2><p>Answer with a word, short phrase, or number. For calculations, use π = 3.14, assume ideal systems, and keep intermediate values unrounded.</p><p>A number alone is accepted when the question supplies the unit. If you include units, they must be correct. Small spelling mistakes and equivalent wording from the answer key are accepted.</p></div><div className="study-flow-actions"><Link to="/study/systems"><ArrowLeft size={18} /> Systems</Link></div></section>;
}

export default function SystemsPractice() {
  return <TypedPractice questions={systemsHydraulicsQuestions} title="Systems Practice Test #1" eyebrow="SYSTEMS · HYDRAULICS · PRACTICE TEST #1" basePath="/study/systems/module-1" gradeAnswer={gradeSystemsHydraulics} helpText="Short answers are fine. For calculations, use π = 3.14 and keep intermediate values unrounded. Units can be omitted when supplied by the question." />;
}
