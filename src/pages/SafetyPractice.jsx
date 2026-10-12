import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronRight, RotateCcw, XCircle } from "lucide-react";
import questions from "../data/safety-module1-test1.json";
import { scoreAnswers, shuffleQuestions } from "./safetyTestLogic";

const basePath = "/study/safety/module-1";
const letters = ["A", "B", "C", "D"];

export function SafetyTestList() {
  return <section className="study-detail"><p className="study-eyebrow">AVIATION HEALTH AND SAFETY</p><h1>Module 1</h1><p className="study-detail-description">Choose a practice test.</p><Link className="study-option-link study-test-link" to={`${basePath}/practice-1`}><span className="study-test-link-heading"><strong>Practice Test #1</strong><span className="study-format-badge">Multiple Choice</span></span><span className="study-test-link-description">{questions.length} questions · Random order · Learn as you go <ChevronRight size={19} /></span></Link><div className="study-flow-actions"><Link to="/study/safety"><ArrowLeft size={18} /> Safety</Link></div></section>;
}

export default function SafetyPractice() {
  const [order, setOrder] = useState(() => shuffleQuestions(questions));
  const [position, setPosition] = useState(0);
  const [answers, setAnswers] = useState({});
  const [complete, setComplete] = useState(false);
  const headingRef = useRef(null);
  const feedbackRef = useRef(null);
  const question = order[position];
  const selected = answers[question.id];
  const answered = selected !== undefined;
  const correct = selected === question.correctIndex;
  const score = scoreAnswers(order, answers);

  useEffect(() => {
    if (!answered || complete) return;
    const dialog = feedbackRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.scrollTop = 0;
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, [answered, complete]);

  function chooseAnswer(index) {
    if (answered) return;
    setAnswers(current => current[question.id] !== undefined ? current : { ...current, [question.id]: index });
  }
  function nextQuestion() {
    if (!answered) return;
    feedbackRef.current?.close();
    if (position === order.length - 1) setComplete(true);
    else setPosition(current => current + 1);
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => headingRef.current?.focus());
  }
  function restart() {
    setOrder(shuffleQuestions(questions)); setPosition(0); setAnswers({}); setComplete(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  if (complete) {
    const missed = order.filter(item => answers[item.id] !== item.correctIndex);
    return <section className="study-detail study-test"><p className="study-eyebrow">PRACTICE TEST #1 · COMPLETE</p><h1 ref={headingRef} tabIndex={-1}>Nice work finishing!</h1><div className="study-result"><strong>{score}<span> / {order.length}</span></strong><p>{Math.round(score / order.length * 100)}% correct</p><p>{missed.length === 0 ? "You answered every question correctly." : `${missed.length} question${missed.length === 1 ? "" : "s"} to review below.`}</p></div>{missed.length > 0 && <section className="study-missed"><h2>Review your mistakes</h2>{missed.map(item => <article key={item.id}><h3>{item.prompt}</h3><p className="study-missed-answer">Your answer: {letters[answers[item.id]]}. {item.options[answers[item.id]]}</p><p><strong>Correct: {letters[item.correctIndex]}. {item.options[item.correctIndex]}</strong></p><p>{item.explanation}</p></article>)}</section>}<div className="study-flow-actions"><Link to={basePath}><ArrowLeft size={18} /> Tests</Link><button className="study-primary" onClick={restart}><RotateCcw size={18} /> Try again</button></div></section>;
  }

  return <section className="study-detail study-test study-question-screen"><p className="study-eyebrow">SAFETY · MODULE 1 · PRACTICE TEST #1</p><div className="study-test-progress"><span>Question {position + 1} of {order.length}</span><span>{score} correct</span></div><progress max={order.length} value={position + (answered ? 1 : 0)} aria-label="Questions answered" /><h1 className="study-question" ref={headingRef} tabIndex={-1}>{question.prompt}</h1><div className="study-answer-options" aria-label="Answer choices">{question.options.map((option, index) => {
    const state = answered ? index === question.correctIndex ? "correct" : index === selected ? "wrong" : "" : "";
    return <button type="button" key={index} className={`study-answer ${state}`} disabled={answered} aria-pressed={selected === index} onClick={() => chooseAnswer(index)}><span className="study-answer-letter">{letters[index]}</span><span>{option}</span>{state === "correct" && <CheckCircle2 size={20} aria-label="Correct answer" />}{state === "wrong" && <XCircle size={20} aria-label="Incorrect answer" />}</button>;
  })}</div>
    <dialog ref={feedbackRef} className="study-answer-dialog" aria-labelledby="study-answer-feedback-title" onCancel={event => event.preventDefault()}>
      {answered && <>
        <div className="study-answer-dialog-content">
          <span className={`study-feedback-symbol ${correct ? "correct" : "wrong"}`}>{correct ? <CheckCircle2 size={30} /> : <XCircle size={30} />}</span>
          <h2 id="study-answer-feedback-title">{correct ? "Correct!" : "Not quite."}</h2>
          <p className="study-feedback-question">{question.prompt}</p>
          <div className={`study-feedback-choice ${correct ? "correct" : "wrong"}`}>
            <p>{correct ? "Your answer" : "Your answer · Incorrect"}</p>
            <div><span className="study-answer-letter">{letters[selected]}</span><strong>{question.options[selected]}</strong>{correct ? <CheckCircle2 size={20} /> : <XCircle size={20} />}</div>
          </div>
          {!correct && <><div className="study-feedback-choice correct"><p>Correct answer</p><div><span className="study-answer-letter">{letters[question.correctIndex]}</span><strong>{question.options[question.correctIndex]}</strong><CheckCircle2 size={20} /></div></div><p className="study-feedback-explanation">{question.explanation}</p></>}
        </div>
        <div className="study-answer-dialog-footer"><button type="button" className="study-primary" onClick={nextQuestion}>{position === order.length - 1 ? "See Results" : "Next Question"}<ChevronRight size={18} /></button></div>
      </>}
    </dialog>
  </section>;
}
