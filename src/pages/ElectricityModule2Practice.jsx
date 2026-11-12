import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import MultipleChoicePractice from "./MultipleChoicePractice";
import TypedAnswerPractice, { TypedRecordBadge } from "./TypedAnswerPractice";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { ModuleStudyOverview } from "./StudentDashboard";
import { electricityModule2Parts, electricityModule2Path } from "../data/electricityModule2.js";

export function ElectricityModule2TestList() {
  return <section className="study-detail">
    <p className="study-eyebrow">AIRCRAFT ELECTRICITY 1</p><h1>Module 2</h1>
    <p className="study-detail-description">Batteries · Electromagnetic induction · DC generators &amp; controls</p>
    <ModuleStudyOverview basePath={electricityModule2Path} />
    {["easy", "medium", "hard"].map(difficulty => {
      const parts = electricityModule2Parts.filter(part => part.difficulty === difficulty);
      return <div key={difficulty}>
        <h2>{difficulty === "easy" ? "Easy · Quiz review" : difficulty === "medium" ? "Medium · Lecture practice" : "Hard · One-word recall"}</h2>
        <p className="study-detail-description">{parts.reduce((sum, part) => sum + part.questions.length, 0)} questions across {parts.length} saved parts. {difficulty === "easy" ? "All 42 supplied quiz items, with grouped concepts expanded." : difficulty === "medium" ? "Source-based questions with explanations and study notes." : "Type one word. Notes are available before and after attempts."}</p>
        {parts.map(part => <Link key={part.path} className="study-option-link study-test-link" to={part.path}>
          <span className="study-test-link-heading"><strong>{part.title}</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty={difficulty}>{difficulty === "easy" ? "Easy" : difficulty === "medium" ? "Medium" : "Hard"} difficulty</span><span className="study-format-badge">{part.kind === "typed" ? "Type one word" : "Multiple Choice"}</span></span></span>
          <span className="study-test-link-description">{part.questions.length} questions · Shuffled order · Saves your place <ChevronRight size={19} /></span>
          {part.kind === "typed" ? <TypedRecordBadge questions={part.questions} testId={part.storageId} /> : <PracticeRecordBadge questions={part.questions} testId={part.storageId} />}
        </Link>)}
      </div>;
    })}
    <div className="study-flow-actions"><Link to="/study/electricity"><ArrowLeft size={18} /> Electricity</Link></div>
  </section>;
}

export default function ElectricityModule2Practice() {
  const { testSlug } = useParams();
  const part = electricityModule2Parts.find(part => part.path === `${electricityModule2Path}/${testSlug}`);
  if (!part) return <Navigate to={electricityModule2Path} replace />;
  const Practice = part.kind === "typed" ? TypedAnswerPractice : MultipleChoicePractice;
  return <Practice key={part.path} questions={part.questions} testNumber={part.number} course="Electricity" basePath={electricityModule2Path} progressKey={part.storageId} testTitle={`${part.title} · ${part.difficulty === "easy" ? "Easy" : part.difficulty === "medium" ? "Medium" : "Hard"} difficulty`} />;
}
