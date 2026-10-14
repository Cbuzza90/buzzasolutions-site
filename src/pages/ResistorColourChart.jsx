import { useEffect, useId, useRef, useState } from "react";
import { BookOpen, Minus, Plus, X } from "lucide-react";

export default function ResistorColourChart() {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const dialog = ref.current, previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [open]);
  return <>
    <button className="study-torque-chart-button" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}><BookOpen size={18} /> View resistor colour chart</button>
    <dialog ref={ref} className="study-answer-dialog" aria-labelledby={titleId} onClose={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="study-answer-dialog-content">
        <h2 id={titleId}>Resistor colour chart</h2>
        <p className="study-feedback-explanation">From your course chart. Four bands: 2 digits + multiplier + tolerance. Five bands: 3 digits + multiplier + tolerance. Six bands: add temperature coefficient.</p>
        <div className="study-chart-zoom" aria-label="Chart zoom controls">
          <button type="button" aria-label="Zoom out chart" disabled={zoom <= 100} onClick={() => setZoom(value => Math.max(100, value - 50))}><Minus size={16} /></button>
          <output aria-label="Zoom level">{zoom}%</output>
          <button type="button" aria-label="Zoom in chart" disabled={zoom >= 300} onClick={() => setZoom(value => Math.min(300, value + 50))}><Plus size={16} /></button>
          <button type="button" onClick={() => setZoom(100)}>Fit screen</button>
        </div>
        <div className="study-resistor-chart-scroll" tabIndex={0} aria-label="Original resistor colour chart; scroll to view enlarged image">
          <img className="study-resistor-original-chart" src="/electricity/resistor-colour-chart.png" alt="Original course resistor colour chart showing four-, five- and six-band examples, digit colours, multipliers, tolerances and temperature coefficients" style={{ width: `${zoom}%` }} />
        </div>
        <p className="study-feedback-explanation">Enter all resistance answers in ohms (Ω). Minimum = R × (1 − tolerance/100); maximum = R × (1 + tolerance/100).</p>
        <a className="study-fire-source" href="/electricity/resistor-colour-chart.png" target="_blank" rel="noreferrer">Open original course chart image</a>
      </div>
      <div className="study-answer-dialog-footer"><button className="study-primary" type="button" onClick={() => ref.current?.close()}><X size={18} /> Close chart</button></div>
    </dialog>
  </>;
}
