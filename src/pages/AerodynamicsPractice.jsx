import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ModuleStudyOverview } from "./StudentDashboard";
import MultipleChoicePractice from "./MultipleChoicePractice";
import TypedAnswerPractice, { TypedRecordBadge } from "./TypedAnswerPractice";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { aerodynamicsChoiceQuestions, aerodynamicsRecallQuestions, legacyAerodynamicsChoiceQuestions, legacyAerodynamicsRecallQuestions, previousAerodynamicsChoiceQuestions, previousAerodynamicsRecallQuestions, aerodynamicsModule2Path as basePath } from "../data/aerodynamicsModule2.js";
import { aeroChoiceKey, aeroRecallKey, legacyAeroChoiceKey, legacyAeroRecallKey, previousAeroChoiceKey, previousAeroRecallKey, migrateAerodynamicsProgress } from "./aerodynamicsProgress.js";
import { aerodynamicsReviewQuestions } from "../data/aerodynamicsReviewPractice.js";

export function AerodynamicsTestList() {
  useState(() => { migrateAerodynamicsProgress(); return true; });
  return <section className="study-detail">
    <p className="study-eyebrow">AIRCRAFT ENGINEERING &amp; AERODYNAMICS</p><h1>Module 2</h1>
    <p className="study-detail-description">Flight controls, stability, high-speed flight &amp; aircraft structure</p>
    <ModuleStudyOverview basePath={basePath} />
    <Link className="study-option-link study-test-link" to={`${basePath}/practice-1`}>
      <span className="study-test-link-heading"><strong>Review &amp; Practice Quiz</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="easy">Easy difficulty</span><span className="study-format-badge">Multiple Choice</span></span></span>
      <span className="study-test-link-description">{aerodynamicsReviewQuestions.length} questions · Your review sheet &amp; practice quiz, with matching sets split up <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={aerodynamicsReviewQuestions} testId={`${basePath}/practice-1`} />
    </Link>
    <Link className="study-option-link study-test-link" to={`${basePath}/practice-2`}>
      <span className="study-test-link-heading"><strong>Notes Practice</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="medium">Medium difficulty</span><span className="study-format-badge">Multiple Choice</span></span></span>
      <span className="study-test-link-description">{aerodynamicsChoiceQuestions.length} questions · 16 presentations + review &amp; quiz concepts <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={aerodynamicsChoiceQuestions} testId={aeroChoiceKey} />
      <PracticeRecordBadge questions={previousAerodynamicsChoiceQuestions} testId={previousAeroChoiceKey} label="Previous version · Presentations 14–25" />
      <PracticeRecordBadge questions={legacyAerodynamicsChoiceQuestions} testId={legacyAeroChoiceKey} label="Previous version · Presentations 14–23" />
    </Link>
    <Link className="study-option-link study-test-link" to={`${basePath}/one-word-1`}>
      <span className="study-test-link-heading"><strong>One-Word Recall</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="hard">Hard difficulty</span><span className="study-format-badge">Type one word</span></span></span>
      <span className="study-test-link-description">{aerodynamicsRecallQuestions.length} questions · 16 presentations + review &amp; quiz concepts <ChevronRight size={19} /></span>
      <TypedRecordBadge questions={aerodynamicsRecallQuestions} testId={aeroRecallKey} />
      <TypedRecordBadge questions={previousAerodynamicsRecallQuestions} testId={previousAeroRecallKey} label="Previous version · Presentations 14–25" />
      <TypedRecordBadge questions={legacyAerodynamicsRecallQuestions} testId={legacyAeroRecallKey} label="Previous version · Presentations 14–23" />
    </Link>
    <div className="study-flow-actions"><Link to="/study/aerodynamics"><ArrowLeft size={18} /> Aerodynamics</Link></div>
  </section>;
}
export function AerodynamicsChoicePractice() {
  useState(() => { migrateAerodynamicsProgress(); return true; });
  return <MultipleChoicePractice questions={aerodynamicsChoiceQuestions} progressKey={aeroChoiceKey} testNumber={2} testTitle="Notes Practice · Medium difficulty" course="Aerodynamics" basePath={basePath} />;
}
export function AerodynamicsReviewPractice() {
  return <MultipleChoicePractice questions={aerodynamicsReviewQuestions} testNumber={1} testTitle="Review & Practice Quiz · Easy difficulty" course="Aerodynamics" basePath={basePath} />;
}
export function AerodynamicsWordPractice() {
  useState(() => { migrateAerodynamicsProgress(); return true; });
  return <TypedAnswerPractice questions={aerodynamicsRecallQuestions} progressKey={aeroRecallKey} testNumber={1} testTitle="One-Word Recall · Hard difficulty" course="Aerodynamics" basePath={basePath} />;
}
