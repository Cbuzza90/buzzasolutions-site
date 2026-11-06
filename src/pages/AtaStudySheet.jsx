import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import { ataChapters, ataModulePath, ataPracticePath } from "../data/ataCodePractice.js";

const groupNames = {
  general: "Aircraft general",
  systems: "Airframe systems",
  structures: "Structures",
  powerplant: "Powerplant",
};

export default function AtaStudySheet() {
  const [query, setQuery] = useState("");
  const match = query.trim().toLowerCase().replace(/^ata\s*/, "");
  const chapters = ataChapters.filter(chapter => !match || chapter.code.includes(match) || chapter.title.toLowerCase().includes(match));

  return <section className="study-detail study-ata-sheet">
    <p className="study-eyebrow">TECHNICAL PUBLICATIONS / MODULE 2</p>
    <h1>ATA review study sheet</h1>
    <p className="study-detail-description">Only the chapters asked on your Test 2 Material Worksheet: 01 and 02, plus the ten codes in its chapter-list question. Names follow the supplied ATA course slides.</p>
    <div className="study-ata-tip"><BookOpen size={20} aria-hidden="true" /><p><strong>Read both ways:</strong> given a chapter number, name the subject; given the subject, recall its number. In an XX-XX-XX manual reference, the pairs mean <strong>chapter → section → subject</strong>.</p></div>
    <label className="study-search study-ata-search"><Search size={19} aria-hidden="true" /><input type="search" aria-label="Search ATA chapter number or name" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search chapter number or name" /></label>
    <p className="study-ata-count" aria-live="polite">{chapters.length} of {ataChapters.length} review chapters</p>
    {Object.entries(groupNames).map(([group, name]) => {
      const items = chapters.filter(chapter => chapter.group === group);
      return items.length ? <section key={group} className="study-ata-group"><h2>{name}</h2><div className="study-ata-grid">{items.map(chapter => <div className="study-ata-entry" key={chapter.code}><strong>ATA {chapter.code}</strong><span>{chapter.title}</span></div>)}</div></section> : null;
    })}
    {!chapters.length && <p className="study-detail-description">No review chapter matches that search.</p>}
    <p className="study-ata-source">Scope: Test 2 Material Worksheet. Chapter names: ATA A3.01, A3.08, AB.02 course slides 8–13.</p>
    <div className="study-flow-actions"><Link to={ataModulePath}><ArrowLeft size={18} /> Tests</Link><Link to={ataPracticePath}>Practice these chapters</Link></div>
  </section>;
}
