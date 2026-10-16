import ChartPracticeWorkspace from "./ChartPracticeWorkspace";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronRight, RotateCcw, XCircle } from "lucide-react";
import { scoreAnswers } from "./safetyTestLogic";
import QuestionDiagram from "./QuestionDiagram";
import PeerTutoringSupport from "./PeerTutoringSupport";
import { StudyNotesGuide } from "./CourseStudyNotes";

import { loadHighestScore, loadPracticeAttempt, newPracticeAttempt, nextEndlessRound, recordHighestScore, RESET_PRACTICE_EVENT, savePracticeAttempt } from "./practiceProgress";

const letters = ["A", "B", "C", "D"];

function focusQuestion(ref) {
  const heading = ref.current;
  const target = heading?.getClientRects().length ? heading : heading?.closest(".study-practice-question");
  target?.focus();
}

export default function MultipleChoicePractice({ questions, testNumber, course, basePath, testTitle = `Practice Test #${testNumber}`, reference, endless = false, questionCount = questions.length, progressKey, sampleQuestions, compactTorqueLayout = false }) {
  const { pathname } = useLocation();
  const testId = progressKey ?? (endless ? `${pathname}:endless` : questionCount !== questions.length ? `${pathname}:${questionCount}` : pathname);
  const [attempt, setAttempt] = useState(() => loadPracticeAttempt(questions, testId, undefined, questionCount, sampleQuestions));
  const [best, setBest] = useState(() => loadHighestScore(questions, testId, undefined, questionCount));
  const [storageError, setStorageError] = useState(false);
  const { order, position, answers, complete } = attempt;
  const commitAttempt = useCallback(next => {
    setAttempt(next);
    setStorageError(!savePracticeAttempt(questions, testId, next));
  }, [questions, testId]);
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
    commitAttempt({ ...attempt, answers: { ...answers, [question.id]: index } });
  }
  function nextQuestion() {
    if (!answered) return;
    feedbackRef.current?.close();
    if (position === order.length - 1) {
      const result = recordHighestScore(questions, testId, score, undefined, questionCount);
      setBest(result.best);
      commitAttempt(endless ? nextEndlessRound(questions, attempt) : { ...attempt, complete: true });
      if (!result.saved) setStorageError(true);
    } else commitAttempt({ ...attempt, position: position + 1 });
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => focusQuestion(headingRef));
  }
  const restart = useCallback(() => {
    feedbackRef.current?.close();
    commitAttempt(newPracticeAttempt(questions, Math.random, questionCount, sampleQuestions));
    setBest(loadHighestScore(questions, testId, undefined, questionCount));
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => focusQuestion(headingRef));
  }, [commitAttempt, questions, testId, questionCount, sampleQuestions]);
  useEffect(() => {
    const reset = event => { if (event.detail?.testId === pathname) restart(); };
    window.addEventListener(RESET_PRACTICE_EVENT, reset);
    return () => window.removeEventListener(RESET_PRACTICE_EVENT, reset);
  }, [restart, pathname]);
  const savedStatus = <div className="study-saved-progress"><p>{endless ? "Best completed round" : "Highest score"}: {best ? `${best.score}/${best.total} · ${Math.round(best.score / best.total * 100)}%` : "No completed attempt yet"}</p><p role="status">{storageError ? "This browser could not save your progress. Your current attempt still works." : endless ? "Endless practice saves here. Reset keeps your best completed round." : "Progress saves on this browser. Reset keeps your highest score."}</p></div>;

  if (complete) {
    const missed = order.filter(item => answers[item.id] !== item.correctIndex);
    return <section className="study-detail study-test"><p className="study-eyebrow">{course.toUpperCase()} · {testTitle.toUpperCase()} · COMPLETE</p><h1 ref={headingRef} tabIndex={-1}>Nice work finishing!</h1>{savedStatus}<div className="study-result"><strong>{score}<span> / {order.length}</span></strong><p>{Math.round(score / order.length * 100)}% correct</p><p>{missed.length === 0 ? "You answered every question correctly." : `${missed.length} question${missed.length === 1 ? "" : "s"} to review below.`}</p></div><PeerTutoringSupport score={score} total={order.length} course={course} /><StudyNotesGuide basePath={basePath} />{missed.length > 0 && <section className="study-missed"><h2>Review your mistakes</h2>{missed.map(item => <article key={item.id}><h3>{item.prompt}</h3><p className="study-missed-answer">Your answer: {letters[answers[item.id]]}. {item.options[answers[item.id]]}</p><p><strong>Correct: {letters[item.correctIndex]}. {item.options[item.correctIndex]}</strong></p><p>{item.explanation}</p></article>)}</section>}<div className="study-flow-actions"><Link to={basePath}><ArrowLeft size={18} /> Tests</Link><button className="study-primary" onClick={restart}><RotateCcw size={18} /> Try again</button></div></section>;
  }

  const compactToolbar = compactTorqueLayout && <span className="study-torque-count">{position + 1}/{order.length} &middot; {score} correct</span>;
  return <ChartPracticeWorkspace className="study-choice-workspace" compactToolbar={compactToolbar} compactTorqueLayout={compactTorqueLayout} questionKey={question.id} reference={typeof reference === "function" ? reference(question) : reference}>{compactTorqueLayout && <p className="study-torque-lookup-prompt">Choose the fine-thread torque range (in-lb).</p>}<div id={compactTorqueLayout ? "torque-question-details" : undefined} className={compactTorqueLayout ? "study-torque-question-details" : "study-question-stem"}><p className="study-eyebrow">{course.toUpperCase()} · {testTitle.toUpperCase()}</p><div className="study-test-progress"><span>Question {endless ? (attempt.completedRounds ?? 0) * order.length + position + 1 : position + 1}{endless ? " · Endless" : ` of ${order.length}`}</span><span>{endless ? (attempt.previousCorrect ?? 0) + score : score} correct</span></div>{savedStatus}{endless && <p className="study-question-type">Round {(attempt.completedRounds ?? 0) + 1} · {position + 1}/{order.length} chart combinations. A new shuffled round starts automatically.</p>}<progress max={order.length} value={position + (answered ? 1 : 0)} aria-label="Questions answered" /><h1 className="study-question" ref={headingRef} tabIndex={-1}>{question.prompt}</h1>{question.visual && <figure className="study-question-visual"><img src={question.visual.src} alt={question.visual.alt} /></figure>}{question.diagram && <QuestionDiagram key={question.id} diagram={question.diagram} />}</div><div className="study-answer-options" aria-label={compactTorqueLayout ? question.prompt : "Answer choices"}>{question.options.map((option, index) => {
    const state = answered ? index === question.correctIndex ? "correct" : index === selected ? "wrong" : "" : "";
    return <button type="button" key={index} className={`study-answer ${state}`} disabled={answered} aria-pressed={selected === index} onClick={() => chooseAnswer(index)}><span className="study-answer-letter">{letters[index]}</span>{question.optionImages?.[index] && <img className="study-answer-image" src={question.optionImages[index]} alt="" />}<span>{option}</span>{state === "correct" && <CheckCircle2 size={20} aria-label="Correct answer" />}{state === "wrong" && <XCircle size={20} aria-label="Incorrect answer" />}</button>;
  })}</div>
    {compactTorqueLayout ? <div className="study-torque-notes-footer"><StudyNotesGuide basePath={basePath} question={question} /></div> : <StudyNotesGuide basePath={basePath} question={question} />}
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
          {question.feedbackVisual && <figure className="study-question-visual"><img src={question.feedbackVisual.src} alt={question.feedbackVisual.alt} /></figure>}
          {!correct && <><div className="study-feedback-choice correct"><p>Correct answer</p><div><span className="study-answer-letter">{letters[question.correctIndex]}</span><strong>{question.options[question.correctIndex]}</strong><CheckCircle2 size={20} /></div></div><p className="study-feedback-explanation">{question.explanation}</p></>}
        </div>
        <div className="study-answer-dialog-footer"><button type="button" className="study-primary" onClick={nextQuestion}>{!endless && position === order.length - 1 ? "See Results" : "Next Question"}<ChevronRight size={18} /></button></div>
      </>}
    </dialog>
  </ChartPracticeWorkspace>;
}
