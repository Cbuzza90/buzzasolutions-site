import { ModuleStudyOverview } from "./StudentDashboard";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import questions1 from "../data/safety-module1-test1.json" with { type: "json" };
import questions2 from "../data/safety-module1-test2.json" with { type: "json" };
import questions3 from "../data/safety-module1-recall.json" with { type: "json" };
import CompletedTestStatus from "./CompletedTestStatus";
import FireClassGuide from "./FireClassGuide";
import MultipleChoicePractice from "./MultipleChoicePractice";

import { humanFactorsQuestions } from "../data/humanFactorsPractice";

const basePath = "/study/safety/module-1";
const practiceTests = [questions1, questions2, questions3];

export function SafetyTestList() {
  return <section className="study-detail"><p className="study-eyebrow">AVIATION HEALTH AND SAFETY</p><h1>Human Factor Quiz</h1><CompletedTestStatus courseSlug="safety" moduleSlug="module-1" label="Module 1" /><p className="study-detail-description">Mixed Safety practice plus a dedicated Human Factors test.</p><ModuleStudyOverview basePath="/study/safety/module-1" /><Link className="study-option-link study-test-link" to={`${basePath}/practice-4`}><span className="study-test-link-heading"><strong>Human Factor Quiz</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">{humanFactorsQuestions.length} questions · PEAR, Dirty Dozen &amp; error models <ChevronRight size={19} /></span><PracticeRecordBadge questions={humanFactorsQuestions} testId={`${basePath}/practice-4`} /></Link><FireClassGuide />{practiceTests.map((questions, index) => <Link key={index} className="study-option-link study-test-link" to={`${basePath}/practice-${index + 1}`}><span className="study-test-link-heading"><strong>Practice Test #{index + 1}</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">{questions.length} questions · Shuffled questions & choices <ChevronRight size={19} /></span><PracticeRecordBadge questions={questions} testId={`${basePath}/practice-${index + 1}`} /></Link>)}<div className="study-flow-actions"><Link to="/study/safety"><ArrowLeft size={18} /> Safety</Link></div></section>;
}
export default function SafetyPractice({ testNumber = 1 }) {
  return <MultipleChoicePractice questions={testNumber === 4 ? humanFactorsQuestions : practiceTests[testNumber - 1]} testTitle={testNumber === 4 ? "Human Factor Quiz" : `Practice Test #${testNumber}`} testNumber={testNumber} course="Safety" basePath={basePath} />;
}
