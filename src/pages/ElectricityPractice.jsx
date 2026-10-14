import TypedAnswerPractice, { TypedRecordBadge } from "./TypedAnswerPractice";
import { electricityRecallQuestions } from "../data/typedReviewQuestions.js";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import questions from "../data/electricity-module1-test1.json" with { type: "json" };
import { ResistorRecordBadge } from "./ResistorBandPractice";


export function ElectricityTestList() {
  return <section className="study-detail">
    <p className="study-eyebrow">AIRCRAFT ELECTRICITY 1</p>
    <h1>Module 1</h1>
    <p className="study-detail-description">Electrical fundamentals & resistor colour codes</p>
    <Link className="study-option-link study-test-link" to="/study/electricity/module-1/practice-1">
      <span className="study-test-link-heading"><strong>Practice Test #1</strong><span className="study-format-badge">Type one word</span></span>
      <span className="study-test-link-description">{electricityRecallQuestions.length} questions · Electricity, circuits & meters <ChevronRight size={19} /></span>
      <TypedRecordBadge questions={electricityRecallQuestions} legacyQuestions={questions} testId="/study/electricity/module-1/practice-1" />
    </Link>
    <Link className="study-option-link study-test-link" to="/study/electricity/module-1/resistor-band-calculations">
      <span className="study-test-link-heading"><strong>Resistor Band Calculations</strong><span className="study-format-badge">Answer fields</span></span>
      <span className="study-test-link-description">20 randomized resistors · 4, 5 & 6 bands <ChevronRight size={19} /></span>
      <ResistorRecordBadge />
    </Link>
    <Link className="study-option-link" to="/study/electricity/module-1/notes"><span><strong>Study notes</strong><small>Searchable quick reference</small></span><ChevronRight size={22} /></Link><div className="study-detail-panel"><BookOpen size={25} /><h2>Before you start</h2>
      <p>Practice atoms and charge, the six sources of electricity, resistance, series and parallel circuits, resistor bands, and electrical test instruments.</p>
      <p>Practice Test #1 uses one-word answers without calculations. Type the missing word or term, then check your answer. Questions shuffle each attempt, with feedback after every answer. Resistor Band Calculations uses typed resistance, tolerance and range answers based on your course chart.</p>
    </div>
    <div className="study-flow-actions"><Link to="/study/electricity"><ArrowLeft size={18} /> Electricity</Link></div>
  </section>;
}

export default function ElectricityPractice() {
  return <TypedAnswerPractice questions={electricityRecallQuestions} legacyQuestions={questions} testNumber={1} course="Electricity" basePath="/study/electricity/module-1" />;
}
