import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ModuleStudyOverview } from "./StudentDashboard";
import MultipleChoicePractice from "./MultipleChoicePractice";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { ataChapters, ataCodeQuestions, ataModulePath, ataPracticePath, ataProgressKey } from "../data/ataCodePractice.js";
import { techPubWorksheetQuestions, techPubWorksheetPath } from "../data/techPubWorksheetPractice.js";

export function TechPubTestList() {
  return <section className="study-detail">
    <p className="study-eyebrow">TECHNICAL PUBLICATIONS / DOCUMENTS</p><h1>Module 2</h1>
    <p className="study-detail-description">Manuals, stations, parts catalogues &amp; ATA codes</p>
    <ModuleStudyOverview basePath={ataModulePath} />
    <Link className="study-option-link study-test-link" to={techPubWorksheetPath}>
      <span className="study-test-link-heading"><strong>Test 2 Worksheet Practice</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="easy">Easy difficulty</span><span className="study-format-badge">Multiple Choice</span></span></span>
      <span className="study-test-link-description">{techPubWorksheetQuestions.length} questions · Test 2 review worksheet only · Random order <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={techPubWorksheetQuestions} testId={techPubWorksheetPath} />
    </Link>
    <p className="study-detail-description">Boeing dimension and exact station lookups need the matching manual pages. Source issues are listed in Study notes.</p>
    <Link className="study-option-link study-test-link" to={ataPracticePath}>
      <span className="study-test-link-heading"><strong>ATA Codes 05–79</strong><span className="study-format-badge">Multiple Choice</span></span>
      <span className="study-test-link-description">{ataCodeQuestions.length} questions · All {ataChapters.length} listed chapters · Random order · Code to name and name to code <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={ataCodeQuestions} testId={ataProgressKey} />
    </Link>
    <div className="study-flow-actions"><Link to="/study/publications"><ArrowLeft size={18} /> Technical Publications</Link></div>
  </section>;
}
export function TechPubWorksheetPractice() {
  return <MultipleChoicePractice questions={techPubWorksheetQuestions} testNumber={1} testTitle="Test 2 Worksheet Practice · Easy difficulty" course="Technical Publications" basePath={ataModulePath} />;
}
export default function TechPubPractice() {
  return <MultipleChoicePractice questions={ataCodeQuestions} progressKey={ataProgressKey} testNumber={1} testTitle="ATA Codes 05–79" course="Technical Publications" basePath={ataModulePath} />;
}
