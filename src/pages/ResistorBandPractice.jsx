import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronRight, RotateCcw, XCircle } from "lucide-react";
import { emptyResistorAnswer, gradeResistor, resistanceText, resistanceUnits, resistorColours, resistorFields } from "../data/resistorBands";
import { StudyNotesGuide } from "./CourseStudyNotes";
import ResistorColourChart from "./ResistorColourChart";
import PeerTutoringSupport from "./PeerTutoringSupport";
import { RESET_PRACTICE_EVENT, readPracticeRecord } from "./practiceProgress";
import { loadResistorAttempt, loadResistorBest, newResistorAttempt, recordResistorBest, resistorScore, resistorTestId, restoreResistorAttempt, saveResistorAttempt } from "./resistorPracticeLogic";

const labels = { resistance: "Resistance", tolerance: "Tolerance (±%)", minimum: "Minimum resistance", maximum: "Maximum resistance", temperature: "Temperature coefficient" };
const basePath = "/study/electricity/module-1";
function Drawing({ question }) {
  const positions = question.bands.length === 4 ? [190,235,280,395] : question.bands.length === 5 ? [170,210,250,290,405] : [155,195,235,275,350,410];
  return <figure className="study-resistor-drawing">
    <svg viewBox="0 0 600 150" role="img" aria-label={`${question.bands.length}-band resistor, read left to right: ${question.bands.join(", ")}`}>
      <path d="M20 75H130M470 75H580" stroke="#8b949e" strokeWidth="6" />
      <rect x="130" y="45" width="340" height="60" rx="27" fill="#dfc99c" stroke="#9f8760" strokeWidth="2" />
      {question.bands.map((name, index) => <g key={index}><text x={positions[index] + 10} y="29" textAnchor="middle" fill="#39434e" fontSize="18">{index + 1}</text><rect x={positions[index]} y="45" width="20" height="60" fill={resistorColours.find(colour => colour.name === name).hex} stroke="#0003" /></g>)}
      <text x="300" y="135" textAnchor="middle" fill="#39434e" fontSize="18">Read left → right</text>
    </svg>
    <figcaption>{question.bands.join(" · ")}</figcaption>
  </figure>;
}
function expectedText(question, field) {
  return ["resistance", "minimum", "maximum"].includes(field) ? resistanceText(question.expected[field]) : field === "tolerance" ? `±${question.expected[field]}%` : `${question.expected[field]} ppm/°C`;
}

export function ResistorRecordBadge() {
  const best = loadResistorBest();
  const attempt = restoreResistorAttempt(readPracticeRecord("resistor-progress", resistorTestId));
  if (!best && !attempt) return null;
  return <span className="study-record-badge">{attempt && !attempt.complete && <span>In progress · {attempt.answers.length}/20 answered</span>}{best && <span>Highest score · {best.score}/20 ({best.score * 5}%)</span>}</span>;
}

export default function ResistorBandPractice() {
  const [attempt, setAttempt] = useState(loadResistorAttempt);
  const [best, setBest] = useState(loadResistorBest);
  const [storageError, setStorageError] = useState(false);
  const [inputError, setInputError] = useState("");
  const feedbackRef = useRef(null), headingRef = useRef(null);
  const question = attempt.questions[attempt.position];
  const submitted = attempt.answers[attempt.position];
  const answered = Boolean(submitted);
  const grade = submitted ? gradeResistor(question, submitted) : null;
  const score = resistorScore(attempt);
  const update = useCallback(next => {
    setAttempt(next);
    setStorageError(!saveResistorAttempt(next));
  }, []);
  const restart = useCallback(() => {
    feedbackRef.current?.close();
    update(newResistorAttempt());
    setBest(loadResistorBest());
    setInputError("");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [update]);
  useEffect(() => {
    const reset = event => { if (event.detail?.testId === resistorTestId) restart(); };
    window.addEventListener(RESET_PRACTICE_EVENT, reset);
    return () => window.removeEventListener(RESET_PRACTICE_EVENT, reset);
  }, [restart]);
  useEffect(() => {
    if (!answered || attempt.complete) return;
    const dialog = feedbackRef.current, previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [answered, attempt.complete]);
  function submit(event) {
    event.preventDefault();
    if (answered) return;
    const result = gradeResistor(question, attempt.draft);
    if (!result.valid) { setInputError("Enter a number in every answer box, such as 4.7 or 4700. Use the unit selector for resistance values."); return; }
    setInputError("");
    update({ ...attempt, answers: [...attempt.answers, { ...attempt.draft }] });
  }
  function next() {
    feedbackRef.current?.close();
    if (attempt.position === 19) {
      const result = recordResistorBest(score);
      setBest(result.best);
      update({ ...attempt, complete: true });
      if (!result.saved) setStorageError(true);
    } else update({ ...attempt, position: attempt.position + 1, draft: emptyResistorAnswer() });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  const status = <div className="study-saved-progress"><p>Highest score: {best ? `${best.score}/20 · ${best.score * 5}%` : "No completed attempt yet"}</p><p role="status">{storageError ? "This browser could not save your progress. Your current attempt still works." : "Progress saves on this browser. Reset keeps your highest score."}</p></div>;
  useLayoutEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, [attempt.position, attempt.complete]);
  const references = attempt.questions.map(q => q.studyNote);
  if (attempt.complete) {
    const missed = attempt.questions.filter((q, index) => !gradeResistor(q, attempt.answers[index]).allCorrect);
    return <section className="study-detail study-test">
      <p className="study-eyebrow">ELECTRICITY · RESISTOR BAND CALCULATIONS · COMPLETE</p><h1 ref={headingRef} tabIndex={-1}>Nice work finishing!</h1>{status}
      <div className="study-result"><strong>{score}<span> / 20</span></strong><p>{score * 5}% correct</p><p>One point per resistor when all its fields are correct.</p></div>
      <PeerTutoringSupport score={score} total={20} course="Electricity" />
      <StudyNotesGuide basePath={basePath} questionReferences={references} /><ResistorColourChart />
      {missed.length > 0 && <section className="study-missed"><h2>Review your mistakes</h2>{missed.map(q => {
        const index = attempt.questions.indexOf(q), answer = attempt.answers[index], result = gradeResistor(q, answer);
        return <article key={q.id}><h3>{q.prompt}</h3>{resistorFields(q).map(field => <p key={field}>{result.correct[field] ? "Correct" : "Review"} · {labels[field]}: your answer {answer[field]} {field === "tolerance" ? "%" : field === "temperature" ? "ppm/°C" : answer.unit}; expected <strong>{expectedText(q, field)}</strong></p>)}<p>{q.explanation}</p></article>;
      })}</section>}
      <div className="study-flow-actions"><Link to={basePath}><ArrowLeft size={18} /> Tests</Link><button className="study-primary" onClick={restart}><RotateCcw size={18} /> Try again</button></div>
    </section>;
  }
  return <section className="study-detail study-test study-resistor-test">
    <p className="study-eyebrow">ELECTRICITY · RESISTOR BAND CALCULATIONS</p>
    <div className="study-test-progress"><span>Question {attempt.position + 1} of 20</span><span>{score} correct</span></div>{status}
    <progress max={20} value={attempt.position + Number(answered)} aria-label="Questions answered" />
    <h1 ref={headingRef} tabIndex={-1}>{question.bands.length}-band resistor</h1><Drawing question={question} />
    <StudyNotesGuide basePath={basePath} question={question} questionReferences={references} /><ResistorColourChart />
    <form className="study-resistor-form" onSubmit={submit}>
      <p className="study-question-type">Enter all values below. One point per resistor when all fields are correct.</p>
      <fieldset disabled={answered}><legend className="sr-only">Resistor answers</legend>
        <label className="study-resistor-unit">Resistance units <select value={attempt.draft.unit} onChange={event => update({ ...attempt, draft: { ...attempt.draft, unit: event.target.value } })}>{Object.keys(resistanceUnits).map(unit => <option key={unit}>{unit}</option>)}</select><small>Applies to resistance, minimum and maximum.</small></label>
        <div className="study-resistor-inputs">{resistorFields(question).map(field => <label key={field} htmlFor={`resistor-${field}`}>{labels[field]}<span className="study-resistor-input-wrap"><input id={`resistor-${field}`} type="text" inputMode="decimal" autoComplete="off" required value={attempt.draft[field]} onChange={event => { setInputError(""); update({ ...attempt, draft: { ...attempt.draft, [field]: event.target.value } }); }} /><span>{field === "tolerance" ? "%" : field === "temperature" ? "ppm/°C" : attempt.draft.unit}</span></span></label>)}</div>
      </fieldset>
      {inputError && <p role="alert" className="study-resistor-error">{inputError}</p>}
      <button className="study-primary" type="submit" disabled={answered}>Check answers <ChevronRight size={18} /></button>
    </form>
    <dialog ref={feedbackRef} className="study-answer-dialog" aria-labelledby="resistor-feedback-title" onCancel={event => event.preventDefault()}>
      {grade && <><div className="study-answer-dialog-content"><h2 id="resistor-feedback-title">{grade.allCorrect ? "All correct!" : "Some answers need another look"}</h2><Drawing question={question} />
        {resistorFields(question).map(field => <div className={`study-feedback-choice ${grade.correct[field] ? "correct" : "wrong"}`} key={field}><p>{labels[field]} · {grade.correct[field] ? "Correct" : "Incorrect"}</p><div>{grade.correct[field] ? <CheckCircle2 size={18} /> : <XCircle size={18} />}<strong>{expectedText(question, field)}</strong></div>{!grade.correct[field] && <p>Your answer: {submitted[field]} {field === "tolerance" ? "%" : field === "temperature" ? "ppm/°C" : submitted.unit}</p>}</div>)}
        <p className="study-feedback-explanation">{question.explanation}</p>
      </div><div className="study-answer-dialog-footer"><button className="study-primary" type="button" onClick={next}>{attempt.position === 19 ? "See Results" : "Next Question"}<ChevronRight size={18} /></button></div></>}
    </dialog>
  </section>;
}
