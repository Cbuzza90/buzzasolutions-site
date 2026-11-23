import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ModuleStudyOverview } from "./StudentDashboard";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { structuresHardwareQuizParts } from "../data/structuresHardwareQuizzes.js";
export function StructuresTestList() {
  return <section className="study-detail">
    <p className="study-eyebrow">BASIC AIRCRAFT STRUCTURES 1</p><h1>Module 2</h1>
    <p className="study-detail-description">Practice rebuilt from your three graded hardware quizzes.</p>
    <ModuleStudyOverview basePath="/study/structures/module-2" />
    <Link className="study-option-link" to="/study/structures/module-2/hardware-sizing-notes"><strong>Diameter &amp; Length Guide</strong><span className="study-test-link-description">Separate notes · Every tested bolt, nut, washer and pin · Worked sizing methods <ChevronRight size={19} /></span></Link>
    {structuresHardwareQuizParts.map(part => <Link key={part.slug} className="study-option-link study-test-link" to={part.path}>
      <span className="study-test-link-heading"><strong>{part.title}</strong><span className="study-format-badge">Multiple Choice</span></span>
      <span className="study-test-link-description">{part.questions.length} questions · Matching items expanded individually · Original pictures <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={part.questions} testId={part.storageId} />
    </Link>)}
    <div className="study-flow-actions"><Link to="/study/structures"><ArrowLeft size={18} /> Structures</Link></div>
  </section>;
}
