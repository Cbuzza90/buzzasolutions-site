import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen, Search, X } from "lucide-react";
import { findNoteSections, studyNotesByModule } from "../data/courseStudyNotes";
import QuestionDiagram from "./QuestionDiagram";
import TorqueChart from "./TorqueChart";

function NotesContent({ notes, question }) {
  const [query, setQuery] = useState("");
  const searchId = useId();
  const term = query.trim();
  const sections = findNoteSections(notes.sections, query);
  return <div className="study-course-notes">
    <p className="study-feedback-explanation">{notes.intro} Expand a topic or search for a term.</p>
    <label className="study-search" htmlFor={searchId}><Search size={18} /><span className="sr-only">Search {notes.course} study notes</span><input id={searchId} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search a topic, term or component…" /></label>
    <p className="study-notes-count" role="status">{sections.length} {sections.length === 1 ? "topic" : "topics"}</p>
    {sections.map(section => <details className="study-notes-topic" key={`${section.id}-${Boolean(term)}`} open={term ? true : section.id === notes.defaultOpenId ? true : undefined}>
      <summary>{section.title}</summary>
      <dl>{section.items.map(([label, text, image]) => <div key={label}>
        <dt>{section.id === "fluids" && /^(Blue|Red|Purple) ·/.test(label) && <span className="study-fluid-swatch" aria-hidden="true" style={{ backgroundColor: label.startsWith("Blue") ? "#3b82f6" : label.startsWith("Red") ? "#ef4444" : "#a78bfa" }} />}{label}</dt>
        {image && <img className="study-note-symbol" src={image} alt={label} />}
        <dd>{text}</dd>
      </div>)}</dl>
      {(section.diagramKeys ?? (section.diagramKey ? [section.diagramKey] : [])).map(key => <QuestionDiagram key={key} diagram={notes.diagrams[key]} />)}
    </details>)}
    {sections.length === 0 && <p>No matching topic. Try another word or clear the search.</p>}
    {notes.torqueChart && <TorqueChart question={question} />}
    <p className="study-feedback-explanation">{notes.basis}</p>
    {notes.sources && <div className="study-notes-sources">{notes.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title}</a>)}</div>}
  </div>;
}

export function StudyNotesGuide({ basePath, question }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const titleId = useId();
  const notes = studyNotesByModule[basePath];
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.querySelector(".study-answer-dialog-content").scrollTop = 0;
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [open]);
  if (!notes) return null;
  return <><button className="study-torque-chart-button" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}><BookOpen size={18} /> {notes.course} study notes</button>
    <dialog ref={dialogRef} className="study-answer-dialog" aria-labelledby={titleId} onClose={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="study-answer-dialog-content"><h2 id={titleId}>{notes.course} study notes</h2>{open && <NotesContent notes={notes} question={question} />}</div>
      <div className="study-answer-dialog-footer"><button className="study-primary" type="button" onClick={() => dialogRef.current?.close()}><X size={18} /> Close notes</button></div>
    </dialog></>;
}

export default function CourseStudyNotes({ basePath: suppliedBasePath }) {
  const { pathname } = useLocation();
  const basePath = suppliedBasePath ?? pathname.replace(/\/notes\/?$/, "");
  const notes = studyNotesByModule[basePath];
  if (!notes) return <section className="study-detail"><h1>Study notes not available yet</h1><p>This module needs its course review material before notes can be added.</p><Link className="study-primary" to="/">Courses</Link></section>;
  return <section className="study-detail"><p className="study-eyebrow">{notes.course.toUpperCase()} · STUDY REFERENCE</p><h1>Study notes</h1><NotesContent notes={notes} /><div className="study-flow-actions"><Link to={basePath}><ArrowLeft size={18} /> {notes.course} tests</Link></div></section>;
}
