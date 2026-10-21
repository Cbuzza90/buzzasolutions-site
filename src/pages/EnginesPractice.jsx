import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ModuleStudyOverview } from "./StudentDashboard";
import MultipleChoicePractice from "./MultipleChoicePractice";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { enginesReviewQuestions, enginesAllNotesQuestions, enginesTest2Path as basePath } from "../data/enginesTest2.js";

export function EnginesTestList() {
  return <section className="study-detail">
    <p className="study-eyebrow">AIRCRAFT ENGINES · AMEM-10057</p><h1>Test 2</h1>
    <p className="study-detail-description">Reciprocating-engine oil &amp; lubrication</p>
    <ModuleStudyOverview basePath={basePath} />
    <Link className="study-option-link study-test-link" to={`${basePath}/practice-1`}>
      <span className="study-test-link-heading"><strong>Review Questions</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="easy">Easy difficulty</span><span className="study-format-badge">Multiple Choice</span></span></span>
      <span className="study-test-link-description">{enginesReviewQuestions.length} questions · Only the 31 review entries, with grouped concepts split up <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={enginesReviewQuestions} testId={`${basePath}/practice-1`} />
    </Link>
    <Link className="study-option-link study-test-link" to={`${basePath}/practice-2`}>
      <span className="study-test-link-heading"><strong>Notes &amp; Review Practice</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="medium">Medium difficulty</span><span className="study-format-badge">Multiple Choice</span></span></span>
      <span className="study-test-link-description">{enginesAllNotesQuestions.length} questions · All review topics, supporting lecture facts &amp; applied scenarios <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={enginesAllNotesQuestions} testId={`${basePath}/practice-2`} />
    </Link>
    <div className="study-flow-actions"><Link to="/study/engines"><ArrowLeft size={18} /> Engines</Link></div>
  </section>;
}
export function EnginesReviewPractice() {
  return <MultipleChoicePractice questions={enginesReviewQuestions} testNumber={1} testTitle="Review Questions · Easy difficulty" course="Engines" basePath={basePath} />;
}
export function EnginesAllNotesPractice() {
  return <MultipleChoicePractice questions={enginesAllNotesQuestions} testNumber={2} testTitle="Notes & Review Practice · Medium difficulty" course="Engines" basePath={basePath} />;
}
