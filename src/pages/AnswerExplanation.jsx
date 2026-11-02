import { useEffect, useId, useRef, useState } from "react";
import { BookOpen, X } from "lucide-react";

function AnswerNotes({ question }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    dialog.showModal();
    titleRef.current.focus();
    return () => dialog.close();
  }, [open]);
  const answer = question.answer ?? question.options?.[question.correctIndex];
  return <div className="study-answer-explanation">
    <button type="button" className="study-primary" aria-haspopup="dialog" onClick={() => setOpen(true)}><BookOpen size={18} aria-hidden="true" /> See notes</button>
    <dialog ref={dialogRef} className="study-answer-dialog study-learning-dialog" aria-labelledby={titleId}
      onCancel={event => event.stopPropagation()}
      onClose={event => { event.stopPropagation(); if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="study-answer-dialog-content">
        <div className="study-learning-heading">
          <h2 id={titleId} ref={titleRef} tabIndex={-1}>Learn this answer</h2>
          <button type="button" className="study-primary" aria-label="Close answer notes" onClick={() => setOpen(false)}><X size={18} aria-hidden="true" /></button>
        </div>
        <p className="study-feedback-question">{question.prompt}</p>
        {answer && <div className="study-learning-answer"><h3>Correct answer</h3><p>{answer}</p></div>}
        <section className="study-learning-section"><h3>Why this fits</h3><p>{question.explanation}</p></section>
        {question.learningNotes?.map(([title, text]) => <section className="study-learning-section" key={title}><h3>{title}</h3><p>{text}</p></section>)}
      </div>
      <div className="study-answer-dialog-footer"><button type="button" className="study-primary" onClick={() => setOpen(false)}>Back to my answer</button></div>
    </dialog>
  </div>;
}

// Remount only the notes UI when advancing, without touching the saved attempt.
export default function AnswerExplanation({ question }) {
  return <AnswerNotes key={question.id} question={question} />;
}
