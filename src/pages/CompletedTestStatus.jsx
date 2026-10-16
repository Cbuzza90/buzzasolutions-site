import { nextCourseTest, upcomingTests } from "../data/studySchedule";

export default function CompletedTestStatus({ courseSlug, moduleSlug, label, today, showCompletedLabel = true }) {
  const completed = upcomingTests.find(test => test.completed && test.courseSlug === courseSlug && (!moduleSlug || test.moduleSlug === moduleSlug));
  if (!completed) return null;
  const nextTest = nextCourseTest(courseSlug, upcomingTests, today);
  if (!showCompletedLabel && nextTest) return null;
  return <span className="study-completed-status">
    {showCompletedLabel && <span className="study-completed-badge">{label ?? `${completed.course} test`} · Done</span>}
    {!nextTest && <span className="study-next-date-pending">Next date pending</span>}
  </span>;
}
