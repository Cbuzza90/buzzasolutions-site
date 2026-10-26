import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronRight, RotateCcw, XCircle } from "lucide-react";
import QuestionDiagram from "./QuestionDiagram";
import PeerTutoringSupport from "./PeerTutoringSupport";
import { StudyNotesGuide } from "./CourseStudyNotes";
import { loadHighestScore, readPracticeRecord, RESET_PRACTICE_EVENT } from "./practiceProgress.js";
import { gradeTypedAnswer, loadTypedAttempt, loadTypedBest, newTypedAttempt, normalizeTypedAnswer, recordTypedBest, restoreTypedAttempt, saveTypedAttempt, typedScore } from "./typedPracticeLogic.js";

export function TypedRecordBadge({ questions, legacyQuestions, testId, label }) {
  const attempt = restoreTypedAttempt(questions, readPracticeRecord("typed-progress", testId));
  const best = loadTypedBest(questions, testId);
  const previous = legacyQuestions ? loadHighestScore(legacyQuestions, testId) : null;
  const answered = Object.keys(attempt?.answers ?? {}).length;
  if (label) return best ? <span className="study-record-badge"><span>{label}</span><span>Highest typed score · {best.score}/{best.total} ({Math.round(best.score / best.total * 100)}%)</span></span> : null;
  if (!answered && !best && !previous) return null;
  return <span className="study-record-badge">{answered > 0 && !attempt?.complete && <span>In progress · {answered}/{questions.length} answered</span>}{best && <span>Highest typed score · {best.score}/{best.total} ({Math.round(best.score / best.total * 100)}%)</span>}{previous && <span>Multiple-choice best · {previous.score}/{previous.total}</span>}{attempt?.complete && !best && <span>Completed · Results saved</span>}</span>;
}

export default function TypedAnswerPractice({ questions, legacyQuestions, testNumber, course, basePath, progressKey, testTitle = `One-Word Test #${testNumber}` }) {
  const { pathname } = useLocation();
  const testId = progressKey ?? pathname;
  const [attempt, setAttempt] = useState(() => loadTypedAttempt(questions, testId));
  const [best, setBest] = useState(() => loadTypedBest(questions, testId));
  const [storageError, setStorageError] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [inputError, setInputError] = useState("");
  const feedbackRef = useRef(null), headingRef = useRef(null), inputRef = useRef(null);
  const { order, position, answers, draft, complete } = attempt;
  const question = order[position], submitted = answers[question.id], answered = submitted !== undefined;
  const correct = answered && gradeTypedAnswer(question, submitted), score = typedScore(attempt);
  const previous = legacyQuestions ? loadHighestScore(legacyQuestions, testId) : null;
  const commit = useCallback(next => { setAttempt(next); setStorageError(!saveTypedAttempt(questions, testId, next)); }, [questions, testId]);
  useLayoutEffect(() => { headingRef.current?.focus({ preventScroll: true }); }, [position, complete]);
  useEffect(() => {
    if (!answered || complete) return;
    const dialog = feedbackRef.current, previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previousOverflow; };
  }, [answered, complete]);
  const restart = useCallback(() => {
    setJustCompleted(false);
    feedbackRef.current?.close(); commit(newTypedAttempt(questions)); setBest(loadTypedBest(questions, testId)); setInputError(""); window.scrollTo({ top: 0, behavior: "instant" });
  }, [commit, questions, testId]);
  useEffect(() => {
    const reset = event => { if (event.detail?.testId === pathname) restart(); };
    window.addEventListener(RESET_PRACTICE_EVENT, reset);
    return () => window.removeEventListener(RESET_PRACTICE_EVENT, reset);
  }, [restart, pathname]);
  function submit(event) {
    event.preventDefault(); if (answered) return;
    if (!normalizeTypedAnswer(draft)) { setInputError("Type your answer before checking it."); inputRef.current?.focus(); return; }
    setInputError(""); inputRef.current?.blur(); commit({ ...attempt, answers: { ...answers, [question.id]: draft.trim() } });
  }
  function next() {
    if (!answered) return;
    feedbackRef.current?.close();
    if (position === order.length - 1) {
      setJustCompleted(true);
      const result = recordTypedBest(questions, testId, score); setBest(result.best); commit({ ...attempt, complete: true }); if (!result.saved) setStorageError(true);
    } else commit({ ...attempt, position: position + 1, draft: "" });
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  const status = <div className="study-saved-progress"><p>Highest typed score: {best ? `${best.score}/${best.total} · ${Math.round(best.score / best.total * 100)}%` : "No completed attempt yet"}</p>{previous && <p>Multiple-choice best: {previous.score}/{previous.total}</p>}<p role="status">{storageError ? "This browser could not save your progress. Your current attempt still works." : "Answers and progress save on this browser. Reset keeps your highest scores."}</p></div>;
  if (complete) {
    const missed = order.filter(q => !gradeTypedAnswer(q, answers[q.id]));
    return <section className="study-detail study-test"><p className="study-eyebrow">{course.toUpperCase()} · {testTitle.toUpperCase()} · COMPLETE</p><h1 ref={headingRef} tabIndex={-1}>Test complete</h1>{status}<div className="study-result"><strong>{score}<span> / {order.length}</span></strong><p>{Math.round(score / order.length * 100)}% correct</p><p>{missed.length} question{missed.length === 1 ? "" : "s"} to review.</p></div><PeerTutoringSupport justCompleted={justCompleted} score={score} total={order.length} course={course} /><StudyNotesGuide basePath={basePath} />{missed.length > 0 && <section className="study-missed"><h2>Review your mistakes</h2>{missed.map(q => <article key={q.id}><h3>{q.prompt}</h3><p>Your answer: {answers[q.id]}</p><p><strong>Correct answer: {q.answer}</strong></p><p>{q.explanation}</p></article>)}</section>}<div className="study-flow-actions"><Link to={basePath}><ArrowLeft size={18} /> Tests</Link><button className="study-primary" onClick={restart}><RotateCcw size={18} /> Try again</button></div></section>;
  }
  return <section className="study-detail study-test study-question-screen study-typed-workspace"><div className="study-question-stem"><p className="study-eyebrow">{course.toUpperCase()} · {testTitle.toUpperCase()} · TYPED ANSWERS</p><div className="study-test-progress"><span>Question {position + 1} of {order.length}</span><span>{score} correct</span></div>{status}<progress max={order.length} value={position + Number(answered)} aria-label="Questions answered" /><h1 ref={headingRef} className="study-question" tabIndex={-1}>{question.prompt}</h1>{question.diagram && <QuestionDiagram key={question.id} diagram={question.diagram} />}</div><form className="study-typed-form" onSubmit={submit}><label htmlFor="study-typed-answer">Type one word</label><p id="study-typed-hint">Capital letters, spaces and hyphens do not affect marking. Common equivalent terms are accepted.</p><input ref={inputRef} id="study-typed-answer" aria-describedby="study-typed-hint" type="text" autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={200} disabled={answered} value={draft} onChange={event => { setInputError(""); commit({ ...attempt, draft: event.target.value }); }} />{inputError && <p role="alert" className="study-resistor-error">{inputError}</p>}<button className="study-primary" type="submit" disabled={answered}>Check answer <ChevronRight size={18} /></button></form>
    <dialog ref={feedbackRef} className="study-answer-dialog" aria-labelledby="study-typed-feedback-title" onCancel={event => event.preventDefault()}>{answered && <><div className="study-answer-dialog-content"><h2 id="study-typed-feedback-title">{correct ? "Correct!" : "Not quite."}</h2><p className="study-feedback-question">{question.prompt}</p><div className={`study-feedback-choice ${correct ? "correct" : "wrong"}`}><p>Your answer{correct ? "" : " · Incorrect"}</p><div><strong>{submitted}</strong>{correct ? <CheckCircle2 size={20} /> : <XCircle size={20} />}</div></div>{!correct && <div className="study-feedback-choice correct"><p>Correct answer</p><strong>{question.answer}</strong></div>}<p className="study-feedback-explanation">{question.explanation}</p></div><div className="study-answer-dialog-footer"><button className="study-primary" type="button" onClick={next}>{position === order.length - 1 ? "See Results" : "Next Question"}<ChevronRight size={18} /></button></div></>}</dialog>
  </section>;
}
