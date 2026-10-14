import PracticeRecordBadge from "./PracticeRecordBadge";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import questions from "../data/electricity-module1-test1.json" with { type: "json" };
import MultipleChoicePractice from "./MultipleChoicePractice";

export function ElectricityTestList() {
  return <section className="study-detail">
    <p className="study-eyebrow">AIRCRAFT ELECTRICITY 1</p>
    <h1>Module 1</h1>
    <p className="study-detail-description">Test 1 practice · Electrical fundamentals</p>
    <Link className="study-option-link study-test-link" to="/study/electricity/module-1/practice-1">
      <span className="study-test-link-heading"><strong>Practice Test #1</strong><span className="study-format-badge">Multiple Choice</span></span>
      <span className="study-test-link-description">{questions.length} questions · Electricity, circuits & meters <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={questions} testId="/study/electricity/module-1/practice-1" />
    </Link>
    <Link className="study-option-link" to="/study/electricity/module-1/notes"><span><strong>Study notes</strong><small>Searchable quick reference</small></span><ChevronRight size={22} /></Link><div className="study-detail-panel"><BookOpen size={25} /><h2>Before you start</h2>
      <p>Practice atoms and charge, the six sources of electricity, resistance, series and parallel circuits, resistor bands, and electrical test instruments.</p>
      <p>No calculations required. Choose the best of four answers. Questions and choices shuffle each attempt, with feedback after every answer.</p>
    </div>
    <div className="study-flow-actions"><Link to="/study/electricity"><ArrowLeft size={18} /> Electricity</Link></div>
  </section>;
}

export default function ElectricityPractice() {
  return <MultipleChoicePractice questions={questions} testNumber={1} course="Electricity" basePath="/study/electricity/module-1" />;
}
