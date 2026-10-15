import { Link } from "react-router-dom";
import { ArrowRight, Clock3 } from "lucide-react";
import { dashboardTests, loadDashboard } from "../data/studyDashboard.js";
import { ModuleStudyNotesLink } from "./CourseStudyNotes";
import "./StudentDashboard.css";

function activityText(value) {
  return value ? new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value)) : "Date unavailable · older save";
}

export default function StudentDashboard() {
  return <div className="study-local-banner"><span><strong>Study without an account</strong><span>Progress saves in this browser. It isn't synced between devices or separated by student. Account sync isn't available yet.</span></span></div>;
}

export function ModuleStudyOverview({ basePath }) {
  const resume = loadDashboard().find(item => item.unfinished && item.test.basePath === basePath);
  const hasRecall = dashboardTests.some(test => test.basePath === basePath && test.kind === "typed");
  return <div className="study-module-overview">
    <section className="study-module-guide" aria-label="Study Guide">
      <h2>Study Guide</h2>
      <p>Start with multiple-choice tests, then practise memory recall with one-word tests.</p>
      <p>{hasRecall ? "One-word tests keep study notes hidden while you answer. Review the module notes beforehand or after finishing." : "This module currently has multiple-choice practice only; one-word tests aren't available yet."}</p>
    </section>
    <ModuleStudyNotesLink basePath={basePath} />
    {resume && <section className="study-dashboard-card study-module-resume" aria-label="Continue studying">
      <div className="study-dashboard-card-heading"><Clock3 size={20} /><h2>Continue studying</h2></div>
      <h3>{resume.test.title}</h3><p>{resume.answered}/{resume.total} answered · {resume.total - resume.answered} remaining</p>
      <progress max={resume.total} value={resume.answered} aria-label="Saved attempt progress" />
      <p className="study-dashboard-meta">Last activity: {activityText(resume.updatedAt)}</p>
      <Link className="study-primary" to={resume.test.path}>Continue attempt <ArrowRight size={17} /></Link>
    </section>}
  </div>;
}

export function CourseActivity({ summaries, courseSlug }) {
  const saved = summaries.filter(s => s.test.courseSlug === courseSlug && (s.answered || s.unfinished));
  if (!saved.length) return null;
  const latest = saved[0];
  return <div className="study-course-activity"><span>{latest.unfinished ? `In progress · ${latest.answered}/${latest.total} answered` : `Latest saved attempt · ${latest.answered}/${latest.total} answered`}</span><span>{latest.test.title}</span><span>{activityText(latest.updatedAt)}</span>{latest.best && <span>Best for this test · {latest.best.score}/{latest.best.total}</span>}</div>;
}
