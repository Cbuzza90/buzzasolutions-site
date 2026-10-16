import { TypedRecordBadge } from "./TypedAnswerPractice";
import { electricityRecallQuestions } from "../data/typedReviewQuestions.js";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import questions from "../data/electricity-module1-test1.json" with { type: "json" };
import { ResistorRecordBadge } from "./ResistorBandPractice";
import MultipleChoicePractice from "./MultipleChoicePractice";
import { ModuleStudyOverview } from "./StudentDashboard";
import { electricityEasyQuestions } from "../data/electricityEasyReview.js";

const basePath = "/study/electricity/module-1";

export function ElectricityEasyPractice() {
  return <MultipleChoicePractice questions={electricityEasyQuestions} testNumber={2} testTitle="Review Practice · Easy difficulty" course="Electricity" basePath={basePath} />;
}

export function ElectricityTestList() {
  return <section className="study-detail">
    <p className="study-eyebrow">AIRCRAFT ELECTRICITY 1</p>
    <h1>Module 1</h1>
    <p className="study-detail-description">Electrical fundamentals & resistor colour codes</p>
    <ModuleStudyOverview basePath="/study/electricity/module-1" />
    <Link className="study-option-link study-test-link" to={`${basePath}/practice-2`}>
      <span className="study-test-link-heading"><strong>Review Practice</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="easy">Easy difficulty</span><span className="study-format-badge">Multiple Choice</span></span></span>
      <span className="study-test-link-description">{electricityEasyQuestions.length} questions · Original study aid & practice quiz wording <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={electricityEasyQuestions} testId={`${basePath}/practice-2`} />
    </Link>
    <Link className="study-option-link study-test-link" to="/study/electricity/module-1/practice-1">
      <span className="study-test-link-heading"><strong>Practice Test #1</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="medium">Medium difficulty</span><span className="study-format-badge">Multiple Choice</span></span></span>
      <span className="study-test-link-description">{questions.length} questions · Electricity, circuits & meters <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={questions} testId="/study/electricity/module-1/practice-1" />
    </Link>
    <Link className="study-option-link study-test-link" to="/study/electricity/module-1/one-word-1">
      <span className="study-test-link-heading"><strong>One-Word Test #1</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="hard">Hard difficulty</span><span className="study-format-badge">Type one word</span></span></span>
      <span className="study-test-link-description">{electricityRecallQuestions.length} questions · Electricity recall <ChevronRight size={19} /></span>
      <TypedRecordBadge questions={electricityRecallQuestions} legacyQuestions={questions} testId="/study/electricity/module-1/practice-1" />
    </Link>
    <Link className="study-option-link study-test-link" to="/study/electricity/module-1/resistor-band-calculations">
      <span className="study-test-link-heading"><strong>Resistor Band Calculations</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="medium">Medium difficulty</span><span className="study-format-badge">Answer fields</span></span></span>
      <span className="study-test-link-description">20 randomized resistors · 4 & 5 bands <ChevronRight size={19} /></span>
      <ResistorRecordBadge />
    </Link>
    <div className="study-flow-actions"><Link to="/study/electricity"><ArrowLeft size={18} /> Electricity</Link></div>
  </section>;
}

export default function ElectricityPractice() {
  return <MultipleChoicePractice questions={questions} testNumber={1} testTitle="Practice Test #1 · Medium difficulty" course="Electricity" basePath={basePath} />;
}
