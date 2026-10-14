import { practiceSummary } from "./practiceProgress";

export default function PracticeRecordBadge({ questions, testId, label, questionCount = questions.length }) {
  const { best, answered, complete } = practiceSummary(questions, testId, undefined, questionCount);
  if ((label && !best) || (!best && !answered)) return null;
  return <span className="study-record-badge">{label && <span>{label}</span>}{!label && answered > 0 && !complete && <span>In progress · {answered}/{questionCount} answered</span>}{best && <span>Highest score · {best.score}/{best.total} ({Math.round(best.score / best.total * 100)}%)</span>}{complete && !best && <span>Completed · Results saved</span>}</span>;
}
