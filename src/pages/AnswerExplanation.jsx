import { BookOpen } from "lucide-react";

// Available after every answer, independently of grading. Key the disclosure
// to the question so advancing starts the next question's notes collapsed.
export default function AnswerExplanation({ question }) {
  return <details key={question.id} className="study-answer-explanation">
    <summary className="study-primary"><BookOpen size={18} aria-hidden="true" /> See notes</summary>
    <p className="study-feedback-explanation">{question.explanation}</p>
  </details>;
}
