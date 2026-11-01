// Shared by every quiz engine. Keep learning feedback independent of grading:
// getting an answer right must never hide the explanation.
export default function AnswerExplanation({ question }) {
  return <section className="study-answer-explanation" aria-label="Answer explanation">
    <h3>What it means and why</h3>
    <p className="study-feedback-explanation">{question.explanation}</p>
  </section>;
}
