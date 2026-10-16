import { Link } from "react-router-dom";
import { ArrowRight, Clock3 } from "lucide-react";
import { dashboardTests, loadDashboard } from "../data/studyDashboard.js";
import { ModuleStudyNotesLink } from "./CourseStudyNotes";
import "./StudentDashboard.css";

function activityText(value) {
  return value ? new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(value)) : "Date unavailable · older save";
}

export function ModuleStudyOverview({ basePath }) {
  const resume = loadDashboard().find(item => item.unfinished && item.test.basePath === basePath);
  const hasRecall = dashboardTests.some(test => test.basePath === basePath && test.kind === "typed");
  return <div className="study-module-overview">
    <p className="study-module-guide"><strong>Study guide:</strong> {basePath === "/study/electricity/module-1" ? "Start with Easy review, move to Medium multiple choice, then Hard one-word recall." : hasRecall ? "Start with multiple choice, then practise one-word recall." : "Review the notes, then practise with multiple choice."}</p>
    <ModuleStudyNotesLink basePath={basePath} />
    {resume && <Link className="study-module-continue" to={resume.test.path} aria-label={`Continue studying ${resume.test.title}`}>
      <Clock3 size={17} aria-hidden="true" /><span><strong>Continue studying</strong><small>{resume.test.title} · {resume.answered}/{resume.total} answered</small></span><ArrowRight size={17} aria-hidden="true" />
    </Link>}
  </div>;
}

export function CourseActivity({ summaries, courseSlug }) {
  const saved = summaries.filter(s => s.test.courseSlug === courseSlug && (s.answered || s.unfinished));
  if (!saved.length) return null;
  const latest = saved[0];
  return <div className="study-course-activity"><span>{latest.unfinished ? `In progress · ${latest.answered}/${latest.total} answered` : `Latest saved attempt · ${latest.answered}/${latest.total} answered`}</span><span>{latest.test.title}</span><span>{activityText(latest.updatedAt)}</span>{latest.best && <span>Best for this test · {latest.best.score}/{latest.best.total}</span>}</div>;
}
