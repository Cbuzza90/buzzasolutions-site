import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import MultipleChoicePractice from "./MultipleChoicePractice";
import TypedAnswerPractice, { TypedRecordBadge } from "./TypedAnswerPractice";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { ModuleStudyOverview } from "./StudentDashboard";
import { systemsModule2Parts, systemsModule2Path } from "../data/systemsModule2.js";

const families = [
  { difficulty: "easy", title: "Easy · Test 2 Review", description: "Review-slide questions covering selectors, checks and fuses, sequencing, filters, seals and pneumatic systems." },
  { difficulty: "medium", title: "Medium · Hydraulic Components", description: "The broader component lesson: mechanisms, distinctions, switches, accumulators, installation, compressors and pumps." },
  { difficulty: "hard", title: "Hard · One-word recall", description: "Recall the component concepts without answer choices. Full study notes are available from this page and after completion." },
];

export function SystemsModule2TestList() {
  return <section className="study-detail">
    <p className="study-eyebrow">BASIC AIRCRAFT SYSTEMS</p><h1>Module 2</h1>
    <p className="study-detail-description">Hydraulic components &amp; pneumatics · Test 2</p>
    <ModuleStudyOverview basePath={systemsModule2Path} />
    {families.map(family => {
      const parts = systemsModule2Parts.filter(part => part.difficulty === family.difficulty);
      return <div key={family.difficulty}>
        <h2>{family.title}</h2>
        <p className="study-detail-description">{family.description} {parts.reduce((sum, part) => sum + part.questions.length, 0)} questions across {parts.length} shorter parts. Each part saves separately.</p>
        {parts.map(part => <Link key={part.slug} className="study-option-link study-test-link" to={part.path}>
          <span className="study-test-link-heading"><strong>{part.title}</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty={part.difficulty}>{part.difficulty === "easy" ? "Easy" : part.difficulty === "medium" ? "Medium" : "Hard"} difficulty</span><span className="study-format-badge">{part.kind === "typed" ? "Type one word" : "Multiple Choice"}</span></span></span>
          <span className="study-test-link-description">{part.questions.length} questions · Shuffled order <ChevronRight size={19} /></span>
          {part.kind === "typed" ? <TypedRecordBadge questions={part.questions} testId={part.storageId} /> : <PracticeRecordBadge questions={part.questions} testId={part.storageId} />}
        </Link>)}
      </div>;
    })}
    <div className="study-flow-actions"><Link to="/study/systems"><ArrowLeft size={18} /> Systems</Link></div>
  </section>;
}

export default function SystemsModule2Practice() {
  const { testSlug } = useParams();
  const part = systemsModule2Parts.find(item => item.path === `${systemsModule2Path}/${testSlug}`);
  if (!part) return <Navigate to={systemsModule2Path} replace />;
  const Practice = part.kind === "typed" ? TypedAnswerPractice : MultipleChoicePractice;
  return <Practice key={part.path} questions={part.questions} testNumber={part.number} course="Systems" basePath={systemsModule2Path} progressKey={part.storageId} testTitle={`${part.title} · ${part.difficulty === "easy" ? "Easy" : part.difficulty === "medium" ? "Medium" : "Hard"} difficulty`} />;
}
