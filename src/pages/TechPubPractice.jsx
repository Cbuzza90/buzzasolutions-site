import { Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ModuleStudyOverview } from "./StudentDashboard";
import MultipleChoicePractice from "./MultipleChoicePractice";
import PracticeRecordBadge from "./PracticeRecordBadge";
import { ataChapters, ataCodeQuestions, ataModulePath, ataPracticePath, ataProgressKey, ataStudySheetPath } from "../data/ataCodePractice.js";
import { techPubWorksheetQuestions, techPubWorksheetPath, techPubMediumQuestions, techPubMediumPath, techPubMediumProgressKey } from "../data/techPubWorksheetPractice.js";

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
    <Link className="study-option-link study-test-link" to={techPubMediumPath}>
      <span className="study-test-link-heading"><strong>Study Notes Practice</strong><span className="study-test-badges"><span className="study-difficulty" data-difficulty="medium">Medium difficulty</span><span className="study-format-badge">Multiple Choice</span></span></span>
      <span className="study-test-link-description">{techPubMediumQuestions.length} project and worksheet questions · Manuals, stations, zones &amp; IPC · Random order <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={techPubMediumQuestions} testId={techPubMediumProgressKey} />
    </Link>
    <p className="study-detail-description">Boeing dimension and exact station lookups need the matching manual pages. Source issues are listed in Study notes.</p>
    <Link className="study-option-link study-test-link" to={ataStudySheetPath}>
      <span className="study-test-link-heading"><strong>ATA Review Study Sheet</strong></span>
      <span className="study-test-link-description">Search the {ataChapters.length} chapters named on the Test 2 worksheet <ChevronRight size={19} /></span>
    </Link>
    <Link className="study-option-link study-test-link" to={ataPracticePath}>
      <span className="study-test-link-heading"><strong>ATA Review Chapters</strong><span className="study-format-badge">Multiple Choice</span></span>
      <span className="study-test-link-description">{ataCodeQuestions.length} questions · {ataChapters.length} worksheet chapters · Random order · Code to name and name to code <ChevronRight size={19} /></span>
      <PracticeRecordBadge questions={ataCodeQuestions} testId={ataProgressKey} />
    </Link>
    <div className="study-flow-actions"><Link to="/study/publications"><ArrowLeft size={18} /> Technical Publications</Link></div>
  </section>;
}
export function TechPubWorksheetPractice() {
  return <MultipleChoicePractice questions={techPubWorksheetQuestions} testNumber={1} testTitle="Test 2 Worksheet Practice · Easy difficulty" course="Technical Publications" basePath={ataModulePath} />;
}
export function TechPubMediumPractice() {
  return <MultipleChoicePractice questions={techPubMediumQuestions} progressKey={techPubMediumProgressKey} testNumber={2} testTitle="Project & Worksheet Practice · Medium difficulty" course="Technical Publications" basePath={ataModulePath} />;
}
export default function TechPubPractice() {
  return <MultipleChoicePractice questions={ataCodeQuestions} progressKey={ataProgressKey} testNumber={1} testTitle="ATA Review Chapters" course="Technical Publications" basePath={ataModulePath} />;
}
