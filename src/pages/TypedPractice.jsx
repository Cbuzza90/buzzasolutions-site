import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronRight, RotateCcw, XCircle } from "lucide-react";
import { shuffleQuestions } from "./safetyTestLogic";


export default function TypedPractice({ questions, title, eyebrow, basePath, gradeAnswer, helpText }) {
  const [order, setOrder] = useState(() => shuffleQuestions(questions));
  const [position, setPosition] = useState(0);
  const [response, setResponse] = useState("");
  const [answers, setAnswers] = useState({});
  const [complete, setComplete] = useState(false);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  const headingRef = useRef(null);
  const question = order[position];
  const result = answers[question.id];
  const score = Object.values(answers).filter(answer => answer.correct).length;

  useEffect(() => {
    if (!result || complete) return;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [result, complete]);

  function checkAnswer(event) {
    event.preventDefault();
    if (!response.trim() || result) return;
    inputRef.current?.blur();
    const graded = { ...gradeAnswer(question.id, response), response: response.trim() };
    setAnswers(current => current[question.id] ? current : { ...current, [question.id]: graded });
  }
  function nextQuestion() {
    if (!result) return;
    dialogRef.current?.close();
    setResponse("");
    if (position === order.length - 1) setComplete(true);
    else setPosition(current => current + 1);
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => headingRef.current?.focus());
  }
  function restart() {
    setOrder(shuffleQuestions(questions)); setPosition(0); setResponse(""); setAnswers({}); setComplete(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  if (complete) {
    const missed = order.filter(item => !answers[item.id].correct);
    return <section className="study-detail study-test"><p className="study-eyebrow">{title.toUpperCase()} · COMPLETE</p><h1 ref={headingRef} tabIndex={-1}>Challenge complete!</h1><div className="study-result"><strong>{score}<span> / {order.length}</span></strong><p>{Math.round(score / order.length * 100)}% correct</p><p>{missed.length ? `${missed.length} answers to review below.` : "You recalled every answer correctly."}</p></div>{missed.length > 0 && <section className="study-missed"><h2>Review your answers</h2>{missed.map(item => <article key={item.id}><h3>{item.prompt}</h3><p className="study-missed-answer">Your answer: {answers[item.id].response}</p><p><strong>Correct answer: {item.answer}</strong></p></article>)}</section>}<div className="study-flow-actions"><Link to={basePath}><ArrowLeft size={18} /> Tests</Link><button className="study-primary" onClick={restart}><RotateCcw size={18} /> Try again</button></div></section>;
  }

  return <section className="study-detail study-test study-question-screen study-recall-screen">
    <p className="study-eyebrow">{eyebrow}</p>
    <div className="study-test-progress"><span>Question {position + 1} of {order.length}</span><span>{score} correct</span></div>
    <progress max={order.length} value={position + (result ? 1 : 0)} aria-label="Questions answered" />
    <h1 className="study-question" ref={headingRef} tabIndex={-1}>{question.prompt}</h1>
    <form className="study-recall-form" onSubmit={checkAnswer}>
      <label htmlFor="study-recall-answer">Your answer</label>
      <textarea id="study-recall-answer" ref={inputRef} value={response} onChange={event => setResponse(event.target.value)} placeholder="Type the missing word or short answer…" rows={3} maxLength={500} disabled={Boolean(result)} autoComplete="off" spellCheck={false} autoCapitalize="none" enterKeyHint="done" aria-describedby="study-recall-help" onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) checkAnswer(event); }} />
      <p id="study-recall-help">{helpText}</p>
      <button type="submit" className="study-primary" disabled={!response.trim() || Boolean(result)}>Check Answer <CheckCircle2 size={18} /></button>
    </form>
    <dialog ref={dialogRef} className="study-answer-dialog" aria-labelledby="study-recall-feedback-title" onCancel={event => event.preventDefault()}>
      {result && <><div className="study-answer-dialog-content">
        <span className={`study-feedback-symbol ${result.correct ? "correct" : "wrong"}`}>{result.correct ? <CheckCircle2 size={30} /> : <XCircle size={30} />}</span>
        <h2 id="study-recall-feedback-title">{result.correct ? "Correct!" : "Not quite."}</h2>
        <p className="study-feedback-question">{question.prompt}</p>
        <div className={`study-feedback-choice ${result.correct ? "correct" : "wrong"}`}><p>{result.correct ? "Your answer" : "Your answer · Incorrect"}</p><div><strong>{result.response}</strong></div></div>
        {result.close && <p className="study-feedback-explanation">Small spelling difference accepted.</p>}
        {question.explanation && <p className="study-feedback-explanation">{question.explanation}</p>}
        {(!result.correct || result.close) && <div className="study-feedback-choice correct"><p>{result.correct ? "Accepted wording" : "Correct answer"}</p><div><strong>{question.answer}</strong></div></div>}
      </div><div className="study-answer-dialog-footer"><button className="study-primary" onClick={nextQuestion}>{position === order.length - 1 ? "See Results" : "Next Question"}<ChevronRight size={18} /></button></div></>}
    </dialog>
  </section>;
}
