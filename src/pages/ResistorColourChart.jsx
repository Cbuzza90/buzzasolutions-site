import { useEffect, useId, useRef, useState } from "react";
import { BookOpen, Minus, Plus, X } from "lucide-react";

const desktopQuery = "(min-width: 1200px) and (hover: hover) and (pointer: fine)";

export default function ResistorColourChart({ desktopInline = false }) {
  const [open, setOpen] = useState(false);
  const [desktop, setDesktop] = useState(() => desktopInline && window.matchMedia(desktopQuery).matches);
  const inline = desktopInline && desktop;
  const [zoom, setZoom] = useState(100);
  const ref = useRef(null);
  const dragRef = useRef(null);
  const titleId = useId();
  useEffect(() => {
    if (!desktopInline) return;
    const media = window.matchMedia(desktopQuery);
    const change = event => { setDesktop(event.matches); setOpen(false); dragRef.current = null; };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, [desktopInline]);
  useEffect(() => {
    if (!open || inline) return;
    const dialog = ref.current, previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [open, inline]);
  function pointerDown(event) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const area = event.currentTarget, bounds = area.getBoundingClientRect();
    if (event.clientX >= bounds.left + area.clientLeft + area.clientWidth || event.clientY >= bounds.top + area.clientTop + area.clientHeight) return;
    event.preventDefault();
    area.focus({ preventScroll: true });
    area.setPointerCapture(event.pointerId);
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }
  function pointerMove(event) {
    const drag = dragRef.current;
    if (drag?.id !== event.pointerId) return;
    event.currentTarget.scrollLeft += drag.x - event.clientX;
    event.currentTarget.scrollTop += drag.y - event.clientY;
    dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }
  function pointerEnd() { dragRef.current = null; }
  const content = <>
      <div className="study-answer-dialog-content">
        <h2 id={titleId}>Resistor colour chart</h2>
        <p className="study-feedback-explanation">From your course chart. Four bands: 2 digits + multiplier + tolerance. Five bands: 3 digits + multiplier + tolerance. Six bands: add temperature coefficient.</p>
        <div className="study-chart-zoom" aria-label="Chart zoom controls">
          <button type="button" aria-label="Zoom out chart" disabled={zoom <= 100} onClick={() => setZoom(value => Math.max(100, value - 50))}><Minus size={16} /></button>
          <output aria-label="Zoom level">{zoom}%</output>
          <button type="button" aria-label="Zoom in chart" disabled={zoom >= 300} onClick={() => setZoom(value => Math.min(300, value + 50))}><Plus size={16} /></button>
          <button type="button" onClick={() => setZoom(100)}>Fit screen</button>
        </div>
        <div className="study-resistor-chart-scroll" tabIndex={0} aria-label="Original resistor colour chart; scroll or drag with a mouse to view enlarged image" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onLostPointerCapture={pointerEnd}>
          <img draggable={false} className="study-resistor-original-chart" src="/electricity/resistor-colour-chart.png" alt="Original course resistor colour chart showing four-, five- and six-band examples, digit colours, multipliers, tolerances and temperature coefficients" style={{ width: `${zoom}%` }} />
        </div>
        <p className="study-feedback-explanation">Enter all resistance answers in ohms (Ω). Minimum = R × (1 − tolerance/100); maximum = R × (1 + tolerance/100).</p>
        <a className="study-fire-source" href="/electricity/resistor-colour-chart.png" target="_blank" rel="noreferrer">Open original course chart image</a>
      </div>
      {!inline && <div className="study-answer-dialog-footer"><button className="study-primary" type="button" onClick={() => ref.current?.close()}><X size={18} /> Close chart</button></div>}
  </>;
  return inline ? <aside className="study-resistor-inline" aria-labelledby={titleId}>{content}</aside> : <>
    <button className="study-torque-chart-button" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}><BookOpen size={18} /> View resistor colour chart</button>
    <dialog ref={ref} className="study-answer-dialog" aria-labelledby={titleId} onClose={event => { if (event.target === event.currentTarget) setOpen(false); }}>{content}</dialog>
  </>;
}
