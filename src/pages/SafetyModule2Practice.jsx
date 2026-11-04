import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import MultipleChoicePractice from "./MultipleChoicePractice";
import TypedAnswerPractice, { TypedRecordBadge } from "./TypedAnswerPractice";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { ModuleStudyOverview } from "./StudentDashboard";
import { safetyModule2Parts, safetyModule2Path, safetyModule2Choice, safetyModule2Recall } from "../data/safetyModule2.js";
import { safetyEasyReviewParts, safetyEasyReviewQuestions } from "../data/safetyEasyReview.js";

const allParts=[...safetyEasyReviewParts,...safetyModule2Parts];

export function SafetyModule2TestList() {
  return <section className="study-detail">
    <p className="study-eyebrow">AVIATION HEALTH AND SAFETY</p><h1>Module 2</h1>
    <p className="study-detail-description">WHMIS &amp; worker rights · Confined spaces · Flight line · Towing · Lockout/tagout</p>
    <ModuleStudyOverview basePath={safetyModule2Path} />
    <p className="study-detail-description">Easy practice follows the supplied review. Older WHMIS/MSDS material and conflicting source claims are clearly labelled in Study notes.</p>
    {["easy","medium","hard"].map(difficulty=><div key={difficulty}>
      <h2>{difficulty==="easy"?"Easy · Review practice":difficulty==="medium"?"Medium · Multiple choice":"Hard · One-word recall"}</h2>
      <p className="study-detail-description">{difficulty==="easy"?safetyEasyReviewQuestions.length:difficulty==="medium"?safetyModule2Choice.length:safetyModule2Recall.length} questions across four shorter parts. Each part saves separately.</p>
      {allParts.filter(part=>part.difficulty===difficulty).map(part=><Link key={part.slug} className="study-option-link study-test-link" to={part.path}>
        <span className="study-test-link-heading"><strong>{part.title}</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty={part.difficulty}>{difficulty==="easy"?"Easy":difficulty==="medium"?"Medium":"Hard"} difficulty</span><span className="study-format-badge">{part.kind==="choice"?"Multiple Choice":"Type one word"}</span></span></span>
        <span className="study-test-link-description">{part.questions.length} questions · Shuffled order <ChevronRight size={19} /></span>
        {part.kind==="choice"?<PracticeRecordBadge questions={part.questions} testId={part.storageId}/>:<TypedRecordBadge questions={part.questions} testId={part.storageId}/>}
      </Link>)}
    </div>)}
    <div className="study-flow-actions"><Link to="/study/safety"><ArrowLeft size={18}/> Safety</Link></div>
  </section>;
}

export default function SafetyModule2Practice() {
  const {testSlug}=useParams();
  const part=allParts.find(part=>part.path===`${safetyModule2Path}/${testSlug}`);
  if(!part) return <Navigate to={safetyModule2Path} replace/>;
  const Practice=part.kind==="choice"?MultipleChoicePractice:TypedAnswerPractice;
  return <Practice key={part.path} questions={part.questions} testNumber={part.number} course="Safety" basePath={safetyModule2Path} progressKey={part.storageId} testTitle={`${part.title} · ${part.difficulty==="easy"?"Easy":part.difficulty==="medium"?"Medium":"Hard"} difficulty`}/>;
}
