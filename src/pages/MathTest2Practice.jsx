import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import MultipleChoicePractice from "./MultipleChoicePractice";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { ModuleStudyOverview } from "./StudentDashboard";
import { mathTest2, mathTest2Breakdown, mathTest2Path } from "../data/mathTest2.js";
import { mathTest2Extended } from "../data/mathTest2Extended.js";
import "./MathTest2Practice.css";

export function MathTest2List() {
  return <section className="study-detail">
    <p className="study-eyebrow">MATH · BLOCK 2</p><h1>Test 2</h1>
    <p className="study-detail-description">Ratios, percentages, averages, probability, compression ratios, geometry, physics and engine calculations.</p>
    <ModuleStudyOverview basePath={mathTest2Path} />
    {[mathTest2, mathTest2Extended].map(test => <Link key={test.path} className="study-option-link study-test-link" to={test.path}>
      <span className="study-test-link-heading"><strong>{test.title}</strong><span className="study-format-badge">Multiple Choice</span></span>
      <span className="study-test-link-description">{test.questions.length} questions · Shuffled questions &amp; choices · Saves your place <ChevronRight size={19} /></span>
      {test === mathTest2Extended && <span className="study-test-link-description">Original 30 + 30 additional questions · Separate progress &amp; highest score</span>}
      <PracticeRecordBadge questions={test.questions} testId={test.storageId} />
    </Link>)}
    <p className="study-detail-description">Have a calculator and paper ready. Use calculator π, g = 9.81 m/s² and the rounding stated in each question. Study notes include the supplied formula sheet and worked solutions.</p>
    <section className="study-math-breakdown" aria-labelledby="math-test2-breakdown">
      <h2 id="math-test2-breakdown">Your 30-question Test 2 breakdown</h2>
      <p>The first test matches this breakdown. Extended practice doubles each topic count for 60 questions.</p>
      <table><caption className="sr-only">Question allocation for Math Test 2</caption>
        <thead><tr><th scope="col">Topic</th><th scope="col">Questions</th></tr></thead>
        <tbody>{mathTest2Breakdown.map(topic => <tr key={topic.id}><th scope="row">{topic.title}</th><td>{topic.count}</td></tr>)}</tbody>
        <tfoot><tr><th scope="row">Total</th><td>30</td></tr></tfoot>
      </table>
    </section>
    <p className="study-detail-description">The notes’ Source checks explain the older 25-question table, corrected lecture typos and clarified PCR/PLANK wording.</p>
    <div className="study-flow-actions"><Link to="/study/math"><ArrowLeft size={18} /> Math</Link></div>
  </section>;
}

export default function MathTest2Practice({ extended = false }) {
  const test = extended ? mathTest2Extended : mathTest2;
  return <MultipleChoicePractice key={test.storageId} questions={test.questions} testNumber={2} course="Math" basePath={mathTest2Path} progressKey={test.storageId} testTitle={test.title} />;
}
