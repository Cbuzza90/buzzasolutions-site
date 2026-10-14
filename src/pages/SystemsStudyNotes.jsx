import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Search, X } from "lucide-react";
import { systemsNoteSections } from "../data/systemsStudyNotes";
import { systemsDiagrams } from "../data/systemsMixedTest";
import QuestionDiagram from "./QuestionDiagram";

function NotesContent() {
  const [query, setQuery] = useState("");
  const searchId = useId();
  const term = query.trim().toLowerCase();
  const sections = systemsNoteSections.filter(section => `${section.title} ${section.items.flat().join(" ")}`.toLowerCase().includes(term));
  return <div className="study-systems-notes">
    <p className="study-feedback-explanation">Condensed from your Hydraulics practice review. Expand a topic or search for a term. Tap diagrams to enlarge them.</p>
    <label className="study-search" htmlFor={searchId}><Search size={18} /><span className="sr-only">Search Systems study notes</span><input id={searchId} type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search fluids, valves, actuators…" /></label>
    <p className="study-notes-count" role="status">{sections.length} topics</p>
    {sections.map(section => <details className="study-notes-topic" key={`${section.id}-${Boolean(term)}`} open={term ? true : section.id === "fluids" ? true : undefined}>
      <summary>{section.title}</summary>
      <dl>{section.items.map(([label, text]) => <div key={label}><dt>{section.id === "fluids" && /^(Blue|Red|Purple) ·/.test(label) && <span className="study-fluid-swatch" aria-hidden="true" style={{ backgroundColor: label.startsWith("Blue") ? "#3b82f6" : label.startsWith("Red") ? "#ef4444" : "#a78bfa" }} />}{label}</dt><dd>{text}</dd></div>)}</dl>
      {(section.diagramKeys ?? (section.diagramKey ? [section.diagramKey] : [])).map(key => <QuestionDiagram key={key} diagram={systemsDiagrams[key]} />)}
    </details>)}
    {sections.length === 0 && <p>No matching topic. Try “pressure”, “seal” or “reservoir”.</p>}
    <p className="study-feedback-explanation">Course basis: AMEM 10004 Review Test #1, the Hydraulics answer key and supplied quiz screenshots. Fluid and valve descriptions are study summaries; approved aircraft specifications govern actual component and fluid selection.</p>
    <div className="study-notes-sources"><a href="https://www.faa.gov/documentLibrary/media/Advisory_Circular/AC_65-15A.pdf" target="_blank" rel="noreferrer">FAA reference · hydraulic fundamentals</a><a href="https://www.eastman.com/content/dam/eastman/corporate/en/literature/e/eas11170.pdf" target="_blank" rel="noreferrer">Eastman · phosphate-ester compatibility</a><a href="https://www1.grc.nasa.gov/beginners-guide-to-aeronautics/equation-of-state/" target="_blank" rel="noreferrer">NASA · gas-law relationships</a></div>
  </div>;
}

export function SystemsStudyGuide() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.querySelector(".study-answer-dialog-content").scrollTop = 0;
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [open]);
  return <><button className="study-torque-chart-button" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}><BookOpen size={18} /> Systems study notes</button>
    <dialog ref={dialogRef} className="study-answer-dialog" aria-labelledby={titleId} onClose={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="study-answer-dialog-content"><h2 id={titleId}>Systems study notes</h2>{open && <NotesContent />}</div>
      <div className="study-answer-dialog-footer"><button className="study-primary" type="button" onClick={() => dialogRef.current?.close()}><X size={18} /> Close notes</button></div>
    </dialog></>;
}

export default function SystemsStudyNotes() {
  return <section className="study-detail"><p className="study-eyebrow">SYSTEMS · MODULE 1</p><h1>Study notes</h1><NotesContent /><div className="study-flow-actions"><Link to="/study/systems/module-1"><ArrowLeft size={18} /> Systems tests</Link></div></section>;
}
