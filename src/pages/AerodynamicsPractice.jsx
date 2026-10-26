import { Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ModuleStudyOverview } from "./StudentDashboard";
import MultipleChoicePractice from "./MultipleChoicePractice";
import TypedAnswerPractice, { TypedRecordBadge } from "./TypedAnswerPractice";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { legacyAerodynamicsChoiceQuestions, legacyAerodynamicsRecallQuestions, previousAerodynamicsChoiceQuestions, previousAerodynamicsRecallQuestions, aerodynamicsModule2Path as basePath } from "../data/aerodynamicsModule2.js";
import { legacyAeroChoiceKey, legacyAeroRecallKey, previousAeroChoiceKey, previousAeroRecallKey } from "./aerodynamicsProgress.js";
import { aerodynamicsTestFamilies } from "../data/aerodynamicsTestParts.js";
import { migrateAerodynamicsParts } from "./aerodynamicsPartProgress.js";

function FormatBadge({ family }) {
  return <span className="study-test-badges"><span className="study-difficulty" data-difficulty={family.difficulty}>{family.difficulty[0].toUpperCase()+family.difficulty.slice(1)} difficulty</span><span className="study-format-badge">{family.kind === "typed" ? "Type one word" : "Multiple Choice"}</span></span>;
}
function PreviousRecords({ family }) {
  return <>
    {family.kind === "typed" ? <TypedRecordBadge questions={family.questions} testId={family.fullKey} label="Previous full-test best" /> : <PracticeRecordBadge questions={family.questions} testId={family.fullKey} label="Previous full-test best" />}
    {family.id === "choice" && <><PracticeRecordBadge questions={previousAerodynamicsChoiceQuestions} testId={previousAeroChoiceKey} label="Previous version · Presentations 14–25" /><PracticeRecordBadge questions={legacyAerodynamicsChoiceQuestions} testId={legacyAeroChoiceKey} label="Previous version · Presentations 14–23" /></>}
    {family.id === "word" && <><TypedRecordBadge questions={previousAerodynamicsRecallQuestions} testId={previousAeroRecallKey} label="Previous version · Presentations 14–25" /><TypedRecordBadge questions={legacyAerodynamicsRecallQuestions} testId={legacyAeroRecallKey} label="Previous version · Presentations 14–23" /></>}
  </>;
}
export function AerodynamicsTestList() {
  useState(() => { migrateAerodynamicsParts(); return true; });
  return <section className="study-detail">
    <p className="study-eyebrow">AIRCRAFT ENGINEERING &amp; AERODYNAMICS</p><h1>Module 2</h1>
    <p className="study-detail-description">Shorter parts · All questions retained · Maximum 39 questions per part</p>
    <ModuleStudyOverview basePath={basePath} />
    {aerodynamicsTestFamilies.map(family => <Link key={family.id} className="study-option-link study-test-link" to={family.path}>
      <span className="study-test-link-heading"><strong>{family.title}</strong><FormatBadge family={family} /></span>
      <span className="study-test-link-description">{family.parts.length} parts · {[...new Set(family.parts.map(p=>p.questions.length))].sort((a,b)=>a-b).join("–")} questions each · {family.questions.length} total <ChevronRight size={19} /></span>
    </Link>)}
    <div className="study-flow-actions"><Link to="/study/aerodynamics"><ArrowLeft size={18} /> Aerodynamics</Link></div>
  </section>;
}
function AerodynamicsPartList({ familyId }) {
  useState(() => { migrateAerodynamicsParts(); return true; });
  const family = aerodynamicsTestFamilies.find(f=>f.id===familyId);
  return <section className="study-detail">
    <p className="study-eyebrow">AERODYNAMICS · MODULE 2</p><h1>{family.title}</h1>
    <p className="study-detail-description">Choose a part. Each saves its own progress and highest score.</p>
    <ModuleStudyOverview basePath={basePath} />
    {family.parts.map(part=><Link key={part.path} className="study-option-link study-test-link" to={part.path}>
      <span className="study-test-link-heading"><strong>Part {part.number} of {part.totalParts}</strong><FormatBadge family={family} /></span>
      <span className="study-test-link-description">{part.questions.length} questions <ChevronRight size={19} /></span>
      {part.kind === "typed" ? <TypedRecordBadge questions={part.questions} testId={part.storageId} /> : <PracticeRecordBadge questions={part.questions} testId={part.storageId} />}
    </Link>)}
    <PreviousRecords family={family} />
    <div className="study-flow-actions"><Link to={basePath}><ArrowLeft size={18} /> Module 2 tests</Link></div>
  </section>;
}
export function AerodynamicsPartPractice({ familyId }) {
  useState(() => { migrateAerodynamicsParts(); return true; });
  const { partSlug } = useParams();
  const family = aerodynamicsTestFamilies.find(f=>f.id===familyId);
  const part = family.parts.find(p=>`part-${p.number}`===partSlug);
  if (!part) return <Navigate to={family.path} replace />;
  const props = {questions:part.questions, progressKey:part.storageId, testNumber:part.number, testTitle:`${family.title} · Part ${part.number} of ${part.totalParts}`, course:"Aerodynamics", basePath};
  return part.kind === "typed" ? <TypedAnswerPractice key={part.path} {...props} /> : <MultipleChoicePractice key={part.path} {...props} />;
}
export function AerodynamicsChoicePractice() { return <AerodynamicsPartList familyId="choice" />; }
export function AerodynamicsReviewPractice() { return <AerodynamicsPartList familyId="review" />; }
export function AerodynamicsWordPractice() { return <AerodynamicsPartList familyId="word" />; }
