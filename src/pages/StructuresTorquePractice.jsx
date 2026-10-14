import PracticeRecordBadge from "./PracticeRecordBadge";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { endlessTorqueQuestions, torqueQuestions } from "../data/torqueTest";
import MultipleChoicePractice from "./MultipleChoicePractice";
import TorqueChart from "./TorqueChart";

const basePath = "/study/structures/module-1";
const title = "Torque Bolt/Nut Practice Test";

export function StructuresTestList() {
  return <section className="study-detail"><p className="study-eyebrow">BASIC AIRCRAFT STRUCTURES 1</p><h1>Module 1</h1><p className="study-detail-description">Fasteners & torque charts</p><Link className="study-option-link study-test-link" to={`${basePath}/torque-bolt-nut`}><span className="study-test-link-heading"><strong>{title}</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">20 random questions · Fine-thread chart lookup <ChevronRight size={19} /></span><PracticeRecordBadge questions={endlessTorqueQuestions} questionCount={20} testId={`${basePath}/torque-bolt-nut:20`} /><PracticeRecordBadge label="Previous endless round" questions={endlessTorqueQuestions} testId={`${basePath}/torque-bolt-nut:endless`} /><PracticeRecordBadge label="Previous 50-question test" questions={torqueQuestions} testId={`${basePath}/torque-bolt-nut`} /></Link><Link className="study-option-link" to="/study/structures/module-1/notes"><span><strong>Study notes</strong><small>Searchable quick reference</small></span><ChevronRight size={22} /></Link><div className="study-detail-panel"><BookOpen size={25} /><h2>Before you start</h2><p>Find the minimum and maximum torque in inch-pounds (in-lb). Use the fine-thread section, and match both the bolt group and nut type. NAS series means NAS583–NAS590.</p><p>Each answer gives the full minimum–maximum range. Each attempt picks 20 different combinations from the 104 supported chart combinations and shuffles the answers. Results are scored out of 20. Progress saves when you leave; Reset picks a new mix and keeps your highest score.</p><TorqueChart /></div><div className="study-flow-actions"><Link to="/study/structures"><ArrowLeft size={18} /> Structures</Link></div></section>;
}

export default function StructuresTorquePractice() {
  return <MultipleChoicePractice questions={endlessTorqueQuestions} questionCount={20} testNumber={1} testTitle={title} course="Structures" basePath={basePath} reference={question => <TorqueChart question={question} />} />;
}
