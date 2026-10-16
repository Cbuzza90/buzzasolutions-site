import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, Search, X } from "lucide-react";
import { findNoteSections, studyNotesByModule } from "../data/courseStudyNotes";
import QuestionDiagram from "./QuestionDiagram";
import ResistorColourChart from "./ResistorColourChart";
import TorqueChart from "./TorqueChart";

export function ModuleStudyNotesLink({ basePath }) {
  return <Link className="study-notes-open study-module-notes" to={`${basePath}/notes`}>
    <span className="study-notes-open-icon"><BookOpen size={24} aria-hidden="true" /></span>
    <span className="study-notes-open-label"><strong>Study notes</strong><span>Search topics, diagrams & explanations</span></span>
    <ChevronRight size={22} aria-hidden="true" />
  </Link>;
}

function NotesContent({ notes, question, questionReferences }) {
  const [query, setQuery] = useState("");
  const [expandedReferences, setExpandedReferences] = useState({});
  const searchId = useId();
  const term = query.trim();
  const references = questionReferences ?? (question?.studyNote ? [question.studyNote] : []);
  const availableSections = references.length ? [...notes.sections, { id: "resistor-attempt-reference", title: "This resistor test · Worked question references", questionReference: true, items: references }] : notes.sections;
  const sections = findNoteSections(availableSections, query);
  return <div className="study-course-notes">
    <p className="study-feedback-explanation">{notes.intro} Expand a topic or search by term or question wording. Question references cover every practice test.</p>
    <div className="study-notes-tools">
      {question && <button type="button" className="study-torque-chart-button" onClick={() => setQuery(question.prompt)}><Search size={18} /> Find notes for this question</button>}
      <label className="study-search" htmlFor={searchId}><Search size={18} /><span className="sr-only">Search {notes.course} study notes</span><input id={searchId} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search a topic, term or component…" /></label>
    </div>
    <p className="study-notes-count" role="status">{sections.length} {sections.length === 1 ? "topic" : "topics"}</p>
    {sections.map(section => <details className="study-notes-topic" key={`${section.id}-${Boolean(term)}`} open={term ? true : section.id === notes.defaultOpenId ? true : undefined} onToggle={event => {
        if (section.questionReference && !term) {
          const expanded = event.currentTarget.open;
          setExpandedReferences(current => ({ ...current, [section.id]: expanded }));
        }
      }}>
      <summary>{section.title}</summary>
      {(!section.questionReference || term || expandedReferences[section.id]) && <dl>{section.items.map(([label, text, image, diagram]) => <div key={label}>
        <dt>{section.id === "fluids" && /^(Blue|Red|Purple) ·/.test(label) && <span className="study-fluid-swatch" aria-hidden="true" style={{ backgroundColor: label.startsWith("Blue") ? "#3b82f6" : label.startsWith("Red") ? "#ef4444" : "#a78bfa" }} />}{label}</dt>
        {image && <img className="study-note-symbol" src={image} alt={label} />}
        <dd>{text}</dd>
        {diagram && <QuestionDiagram diagram={diagram} />}
      </div>)}</dl>}
      {(section.diagramKeys ?? (section.diagramKey ? [section.diagramKey] : [])).map(key => <QuestionDiagram key={key} diagram={notes.diagrams[key]} />)}
    </details>)}
    {sections.length === 0 && <p>No matching topic. Try another word or clear the search.</p>}
    {notes.resistorChart && <ResistorColourChart />}
    {notes.torqueChart && <TorqueChart question={question} />}
    <p className="study-feedback-explanation">{notes.basis}</p>
    {notes.sources && <div className="study-notes-sources">{notes.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.title}</a>)}</div>}
  </div>;
}

export function StudyNotesGuide({ basePath, question, questionReferences }) {
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
  return <><button className="study-notes-open" type="button" aria-label={`Open ${notes.course} study notes`} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
      <span className="study-notes-open-icon"><BookOpen size={24} aria-hidden="true" /></span>
      <span className="study-notes-open-label"><strong>Open study notes</strong><span>Search topics & explanations</span></span>
      <ChevronRight size={22} aria-hidden="true" />
    </button>
    <dialog ref={dialogRef} className="study-answer-dialog study-notes-dialog" aria-labelledby={titleId} onClose={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="study-answer-dialog-content"><h2 id={titleId}>{notes.course} study notes</h2>{open && <NotesContent notes={notes} question={question} questionReferences={questionReferences} />}</div>
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
