import { useEffect, useRef, useState } from "react";
import { BookOpen, X } from "lucide-react";

const classes = [
  { letter: "A", symbol: "Green triangle", fuel: "Ordinary combustibles: wood, paper, cloth", agent: "Water extinguisher rated for Class A" },
  { letter: "B", symbol: "Red square", fuel: "Flammable liquids: gasoline, solvent, oil", agent: "Foam extinguisher rated for Class B" },
  { letter: "C", symbol: "Blue circle", fuel: "Energized electrical equipment", agent: "CO₂ extinguisher rated for Class C" },
  { letter: "D", symbol: "Yellow five-pointed star", fuel: "Combustible metals, such as magnesium", agent: "Class D dry powder compatible with the metal" },
];

export default function FireClassGuide() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [open]);
  return <><button type="button" className="study-torque-chart-button" aria-haspopup="dialog" onClick={() => setOpen(true)}><BookOpen size={18} /> Fire classes, symbols & extinguishers</button><dialog ref={dialogRef} className="study-answer-dialog" aria-labelledby="fire-guide-title" onClose={() => setOpen(false)}><div className="study-answer-dialog-content"><h2 id="fire-guide-title">Know the four fire symbols</h2><p className="study-feedback-explanation">Traditional A–D colour and shape markings. These are fire-class symbols, not cylinder paint colours.</p><div className="study-fire-guide-grid">{classes.map(item => <article key={item.letter}><img src={`/safety/fire-class-${item.letter.toLowerCase()}.svg`} alt={`Class ${item.letter}: ${item.symbol}`} /><h3>Class {item.letter}</h3><strong>{item.symbol}</strong><p>{item.fuel}</p><p><b>Example agent:</b> {item.agent}</p></article>)}</div><p className="study-feedback-explanation">An ABC dry-chemical extinguisher can cover A, B, and C when marked accordingly. Class D requires an agent suited to the burning metal.</p><a className="study-fire-source" href="https://www.ccohs.ca/oshanswers/safety_haz/fire_extinguishers.html" target="_blank" rel="noreferrer">Reference: CCOHS fire extinguishers</a></div><div className="study-answer-dialog-footer"><button type="button" className="study-primary" onClick={() => dialogRef.current?.close()}><X size={18} /> Close guide</button></div></dialog></>;
}
