import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import questions1 from "../data/safety-module1-test1.json";
import questions2 from "../data/safety-module1-test2.json";
import questions3 from "../data/safety-module1-recall.json";
import FireClassGuide from "./FireClassGuide";
import MultipleChoicePractice from "./MultipleChoicePractice";

const basePath = "/study/safety/module-1";
const practiceTests = [questions1, questions2, questions3];

export function SafetyTestList() {
  return <section className="study-detail"><p className="study-eyebrow">AVIATION HEALTH AND SAFETY</p><h1>Module 1</h1><p className="study-detail-description">Three different question sets covering shop safety, fire safety, and human factors.</p><FireClassGuide /><Link className="study-option-link" to="/study/safety/module-1/notes"><span><strong>Study notes</strong><small>Searchable quick reference</small></span><ChevronRight size={22} /></Link>{practiceTests.map((questions, index) => <Link key={index} className="study-option-link study-test-link" to={`${basePath}/practice-${index + 1}`}><span className="study-test-link-heading"><strong>Practice Test #{index + 1}</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">{questions.length} questions · Shuffled questions & choices <ChevronRight size={19} /></span></Link>)}<div className="study-flow-actions"><Link to="/study/safety"><ArrowLeft size={18} /> Safety</Link></div></section>;
}
export default function SafetyPractice({ testNumber = 1 }) {
  return <MultipleChoicePractice questions={practiceTests[testNumber - 1]} testNumber={testNumber} course="Safety" basePath={basePath} />;
}
