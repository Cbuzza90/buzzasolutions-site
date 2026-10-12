import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle2, ChevronRight, RotateCcw, XCircle } from "lucide-react";
import { describeStructuresResponse, gradeStructures, structuresQuestions, structuresReady, unitOptions } from "../data/structuresTest";
import { shuffleQuestions } from "./safetyTestLogic";
import QuestionDiagram from "./QuestionDiagram";

const basePath = "/study/structures/module-1";
const emptyResponse = question => question.kind === "multiple" ? [] : {};

export function StructuresTestList() {
  return <section className="study-detail"><p className="study-eyebrow">BASIC AIRCRAFT STRUCTURES 1</p><h1>Module 1</h1><p className="study-detail-description">Hydraulics practice</p><Link className="study-option-link study-test-link" to={`${basePath}/practice-1`}><span className="study-test-link-heading"><strong>Practice Test #1</strong><span className="study-format-badge">Mixed Format</span></span><span className="study-test-link-description">{structuresQuestions.length} questions · Calculations, matching & more <ChevronRight size={19} /></span></Link><div className="study-detail-panel"><BookOpen size={25} /><h2>Before you start</h2><p>For calculations, use π = 3.14 and keep intermediate values unrounded. Enter a value and choose its units.</p><p>All 35 questions are available, including the four diagram questions. Tap any diagram to enlarge it.</p></div><div className="study-flow-actions"><Link to="/study/structures"><ArrowLeft size={18} /> Structures</Link></div></section>;
}

export default function StructuresPractice() {
  const [order, setOrder] = useState(() => shuffleQuestions(structuresQuestions));
  const [position, setPosition] = useState(0);
  const [response, setResponse] = useState(() => emptyResponse(order[0]));
  const [answers, setAnswers] = useState({});
  const [complete, setComplete] = useState(false);
  const headingRef = useRef(null);
  const dialogRef = useRef(null);
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

  function submitResponse(value) {
    if (result) return;
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    const graded = { ...gradeStructures(question, value), response: value, description: describeStructuresResponse(question, value) };
    setAnswers(current => current[question.id] ? current : { ...current, [question.id]: graded });
  }
  function checkAnswer(event) { event.preventDefault(); if (structuresReady(question, response)) submitResponse(response); }
  function setField(index, part, value) { setResponse(current => ({ ...current, [index]: { ...current[index], [part]: value } })); }
  function nextQuestion() {
    if (!result) return;
    dialogRef.current?.close();
    if (position === order.length - 1) setComplete(true);
    else { setPosition(current => current + 1); setResponse(emptyResponse(order[position + 1])); }
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => headingRef.current?.focus());
  }
  function restart() {
    const next = shuffleQuestions(structuresQuestions);
    setOrder(next); setPosition(0); setResponse(emptyResponse(next[0])); setAnswers({}); setComplete(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  if (complete) {
    const missed = order.filter(item => !answers[item.id].correct);
    return <section className="study-detail study-test"><p className="study-eyebrow">STRUCTURES · PRACTICE TEST #1 · COMPLETE</p><h1 ref={headingRef} tabIndex={-1}>Practice complete!</h1><div className="study-result"><strong>{score}<span> / {order.length}</span></strong><p>{Math.round(score / order.length * 100)}% correct</p><p>All 35 questions, including the diagrams, count toward your score.</p></div>{missed.length > 0 && <section className="study-missed"><h2>Review your mistakes</h2>{missed.map(item => <article key={item.id}><h3>{item.title}</h3><p className="study-missed-answer study-response-text">Your answer: {answers[item.id].description}</p><p><strong>Correct answer: {item.answer}</strong></p></article>)}</section>}<div className="study-flow-actions"><Link to={basePath}><ArrowLeft size={18} /> Tests</Link><button className="study-primary" onClick={restart}><RotateCcw size={18} /> Try again</button></div></section>;
  }

  return <section className="study-detail study-test study-question-screen">
    <p className="study-eyebrow">STRUCTURES · HYDRAULICS · PRACTICE TEST #1</p>
    <div className="study-test-progress"><span>Question {position + 1} of {order.length}</span><span>{score} correct</span></div>
    <progress max={order.length} value={position + (result ? 1 : 0)} aria-label="Questions answered" />
    <p className="study-question-type">{question.title}</p>
    <h1 className="study-question study-response-text" ref={headingRef} tabIndex={-1}>{question.prompt}</h1>
    {question.diagram && <QuestionDiagram key={question.id} diagram={question.diagram} />}
    {question.kind === "choice" ? <div className="study-answer-options" aria-label="Answer choices">{question.options.map(option => <button type="button" className="study-answer" key={option.value} disabled={Boolean(result)} onClick={() => { setResponse(option.value); submitResponse(option.value); }}><span className="study-answer-letter">{option.value}</span><span>{option.label}</span></button>)}</div> : <form className="study-recall-form study-structures-form" onSubmit={checkAnswer}>
      {question.kind === "multiple" ? <fieldset><legend>Select all that apply</legend><div className="study-answer-options">{question.options.map(option => <label className="study-answer study-multi-answer" key={option.value}><input type="checkbox" checked={response.includes(option.value)} disabled={Boolean(result)} onChange={event => setResponse(current => event.target.checked ? [...current, option.value] : current.filter(value => value !== option.value))} /><span>{option.value}. {option.label}</span></label>)}</div></fieldset> : question.fields.map((field, index) => <div className="study-structures-field" key={index}><label htmlFor={`structures-field-${index}`}>{field.label}</label>
        {field.type === "select" ? <select id={`structures-field-${index}`} value={response[index]?.text || ""} disabled={Boolean(result)} onChange={event => setField(index, "text", event.target.value)}><option value="">Choose an answer…</option>{field.options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select> : field.type === "number" ? <div className="study-numeric-answer"><input id={`structures-field-${index}`} type="text" inputMode="decimal" autoComplete="off" placeholder="Value" value={response[index]?.text || ""} disabled={Boolean(result)} onChange={event => setField(index, "text", event.target.value)} /><select aria-label={`${field.label} units`} value={response[index]?.unit || ""} disabled={Boolean(result)} onChange={event => setField(index, "unit", event.target.value)}><option value="">Units…</option>{unitOptions.map(unit => <option key={unit}>{unit}</option>)}</select></div> : <textarea id={`structures-field-${index}`} rows={2} maxLength={500} autoComplete="off" placeholder="Short answer…" value={response[index]?.text || ""} disabled={Boolean(result)} onChange={event => setField(index, "text", event.target.value)} />}
      </div>)}
      <p>{question.title.startsWith("Calculation") || question.id === 24 ? "Use π = 3.14. Keep intermediate values unrounded and choose the correct units." : "Complete every part. Short answers accept listed alternatives and small spelling differences."}</p>
      <button className="study-primary" type="submit" disabled={Boolean(result) || !structuresReady(question, response)}>Check Answer <CheckCircle2 size={18} /></button>
    </form>}
    <dialog ref={dialogRef} className="study-answer-dialog" aria-labelledby="structures-feedback-title" onCancel={event => event.preventDefault()}>{result && <><div className="study-answer-dialog-content"><span className={`study-feedback-symbol ${result.correct ? "correct" : "wrong"}`}>{result.correct ? <CheckCircle2 size={30} /> : <XCircle size={30} />}</span><h2 id="structures-feedback-title">{result.correct ? "Correct!" : "Not quite."}</h2><p className="study-feedback-question">{question.title}</p><div className={`study-feedback-choice ${result.correct ? "correct" : "wrong"}`}><p>{result.correct ? "Your answer" : "Your answer · Incorrect"}</p><strong className="study-response-text">{result.description}</strong></div>{result.parts && <p className="study-feedback-explanation">{result.parts.filter(part => part.correct).length} of {result.parts.length} parts correct. All parts are required for a correct question.</p>}{result.close && <p className="study-feedback-explanation">Small spelling difference accepted.</p>}{(!result.correct || question.title.startsWith("Calculation") || result.close) && <div className="study-feedback-choice correct"><p>Correct answer & explanation</p><strong>{question.answer}</strong></div>}</div><div className="study-answer-dialog-footer"><button className="study-primary" onClick={nextQuestion}>{position === order.length - 1 ? "See Results" : "Next Question"}<ChevronRight size={18} /></button></div></>}</dialog>
  </section>;
}
