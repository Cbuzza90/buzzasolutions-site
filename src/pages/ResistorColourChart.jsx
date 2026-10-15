import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { BookOpen, Minus, Plus, X } from "lucide-react";
import { startPinch, updatePinch } from "./chartZoom";

export default function ResistorColourChart({ practiceInline = false }) {
  const [open, setOpen] = useState(false);
  const inline = practiceInline;
  const [zoom, setZoom] = useState(100);
  const ref = useRef(null);
  const dragRef = useRef(null);
  const scrollRef = useRef(null), imageRef = useRef(null), pendingRef = useRef(null), pinchRef = useRef(null), touchesRef = useRef(new Map());
  const titleId = useId();
  useLayoutEffect(() => {
    if (!pendingRef.current || !scrollRef.current) return;
    scrollRef.current.scrollLeft = pendingRef.current.scrollLeft;
    scrollRef.current.scrollTop = pendingRef.current.scrollTop;
    pendingRef.current = null;
  }, [zoom]);
  useEffect(() => {
    if (!open || inline) return;
    const dialog = ref.current, previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const touches = touchesRef.current;
    return () => { dialog.close(); document.body.style.overflow = previous; touches.clear(); dragRef.current = null; pinchRef.current = null; pendingRef.current = null; };
  }, [open, inline]);
  function localPoints() {
    const area = scrollRef.current, bounds = area.getBoundingClientRect();
    return [...touchesRef.current.values()].slice(0, 2).map(point => ({ x: point.x - bounds.left - area.clientLeft, y: point.y - bounds.top - area.clientTop }));
  }
  function beginPinch() {
    const area = scrollRef.current;
    pinchRef.current = startPinch(localPoints(), { width: imageRef.current.getBoundingClientRect().width, scrollLeft: area.scrollLeft, scrollTop: area.scrollTop });
  }
  function pointerDown(event) {
    if (event.pointerType === "touch") {
      event.currentTarget.setPointerCapture(event.pointerId);
      touchesRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (touchesRef.current.size === 2) beginPinch();
      return;
    }
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
    const area = scrollRef.current;
    if (drag?.id === event.pointerId) {
      area.scrollLeft += drag.x - event.clientX;
      area.scrollTop += drag.y - event.clientY;
      dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
      return;
    }
    const touches = touchesRef.current, previous = touches.get(event.pointerId);
    if (!previous) return;
    event.preventDefault();
    touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (touches.size === 1) { area.scrollLeft += previous.x - event.clientX; area.scrollTop += previous.y - event.clientY; return; }
    if (!pinchRef.current) { beginPinch(); return; }
    const next = updatePinch(pinchRef.current, localPoints(), area.clientWidth, { baseWidth: area.clientWidth, minZoom: 100, maxZoom: 300 });
    if (Math.abs(imageRef.current.getBoundingClientRect().width - next.width) < 0.01) { pendingRef.current = null; area.scrollLeft = next.scrollLeft; area.scrollTop = next.scrollTop; }
    else pendingRef.current = next;
    setZoom(next.zoom);
  }
  function pointerEnd(event) {
    if (dragRef.current?.id === event.pointerId) dragRef.current = null;
    touchesRef.current.delete(event.pointerId);
    pinchRef.current = null;
    if (touchesRef.current.size >= 2) beginPinch();
  }
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
        <span className="study-chart-mobile-hint">Pinch to zoom · drag to move</span>
        <div ref={scrollRef} className="study-resistor-chart-scroll" tabIndex={0} aria-label="Original resistor colour chart; pinch to zoom or drag to move" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onLostPointerCapture={pointerEnd}>
          <img ref={imageRef} draggable={false} className="study-resistor-original-chart" src="/electricity/resistor-colour-chart.png" alt="Original course resistor colour chart showing four-, five- and six-band examples, digit colours, multipliers, tolerances and temperature coefficients" style={{ width: `${zoom}%` }} />
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
