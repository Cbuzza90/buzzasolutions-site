import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ModuleStudyOverview } from "./StudentDashboard";
import MultipleChoicePractice from "./MultipleChoicePractice";
import TypedAnswerPractice, { TypedRecordBadge } from "./TypedAnswerPractice";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { aerodynamicsChoiceQuestions, aerodynamicsRecallQuestions, aerodynamicsModule2Path as basePath, aerodynamicsWeek8Warning } from "../data/aerodynamicsModule2.js";
import { aerodynamicsReviewQuestions } from "../data/aerodynamicsReviewPractice.js";
import "./AerodynamicsPractice.css";

export function AerodynamicsTestList() {
  return <section className="study-detail">
    <p className="study-eyebrow">AIRCRAFT ENGINEERING &amp; AERODYNAMICS</p><h1>Module 2</h1>
    <p className="study-detail-description">Flight controls, stability, high-speed flight &amp; aircraft structure</p>
    <aside className="aero-notes-warning"><strong>Week 8 notes pending</strong><p>{aerodynamicsWeek8Warning}</p></aside>
    <ModuleStudyOverview basePath={basePath} />
    <Link className="study-option-link study-test-link" to={`${basePath}/practice-1`}>
      <span className="study-test-link-heading"><strong>Review &amp; Practice Quiz</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="easy">Easy difficulty</span><span className="study-format-badge">Multiple Choice</span></span></span>
      <span className="study-test-link-description">{aerodynamicsReviewQuestions.length} questions · Your review sheet &amp; practice quiz, with matching sets split up <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={aerodynamicsReviewQuestions} testId={`${basePath}/practice-1`} />
    </Link>
    <Link className="study-option-link study-test-link" to={`${basePath}/practice-2`}>
      <span className="study-test-link-heading"><strong>Notes Practice</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="medium">Medium difficulty</span><span className="study-format-badge">Multiple Choice</span></span></span>
      <span className="study-test-link-description">{aerodynamicsChoiceQuestions.length} questions · 10 available PDFs, definitions &amp; applied concepts <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={aerodynamicsChoiceQuestions} testId={`${basePath}/practice-2`} />
    </Link>
    <Link className="study-option-link study-test-link" to={`${basePath}/one-word-1`}>
      <span className="study-test-link-heading"><strong>One-Word Recall</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="hard">Hard difficulty</span><span className="study-format-badge">Type one word</span></span></span>
      <span className="study-test-link-description">{aerodynamicsRecallQuestions.length} questions · Recall across the 10 available PDFs <ChevronRight size={19} /></span>
      <TypedRecordBadge questions={aerodynamicsRecallQuestions} testId={`${basePath}/one-word-1`} />
    </Link>
    <div className="study-flow-actions"><Link to="/study/aerodynamics"><ArrowLeft size={18} /> Aerodynamics</Link></div>
  </section>;
}
export function AerodynamicsChoicePractice() {
  return <MultipleChoicePractice questions={aerodynamicsChoiceQuestions} testNumber={2} testTitle="Notes Practice · Medium difficulty" course="Aerodynamics" basePath={basePath} />;
}
export function AerodynamicsReviewPractice() {
  return <MultipleChoicePractice questions={aerodynamicsReviewQuestions} testNumber={1} testTitle="Review & Practice Quiz · Easy difficulty" course="Aerodynamics" basePath={basePath} />;
}
export function AerodynamicsWordPractice() {
  return <TypedAnswerPractice questions={aerodynamicsRecallQuestions} testNumber={1} testTitle="One-Word Recall · Hard difficulty" course="Aerodynamics" basePath={basePath} />;
}
