import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { BookOpen, Minus, Plus, X } from "lucide-react";
import { CHART_WIDTH, MAX_CHART_ZOOM, startPinch, updatePinch } from "./chartZoom";



export default function TorqueChart({ question, practiceInline = false }) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const inline = practiceInline;
  const [zoom, setZoom] = useState(practiceInline ? null : 100);
  const dialogRef = useRef(null);
  const scrollRef = useRef(null);
  const imageRef = useRef(null);
  const mouseDragRef = useRef(null);
  const touchesRef = useRef(new Map());
  const pinchRef = useRef(null);
  const pendingScrollRef = useRef(null);
  useLayoutEffect(() => {
    const pending = pendingScrollRef.current;
    if (!pending || !scrollRef.current) return;
    scrollRef.current.scrollLeft = pending.scrollLeft;
    scrollRef.current.scrollTop = pending.scrollTop;
    pendingScrollRef.current = null;
  }, [zoom]);
  useEffect(() => {
    if (!open || inline) return;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    const touches = touchesRef.current;
    return () => { dialog.close(); document.body.style.overflow = previous; touches.clear(); mouseDragRef.current = null; pinchRef.current = null; pendingScrollRef.current = null; };
  }, [open, inline]);
  function changeZoom(amount) { setZoom(current => current === null ? 100 : Math.max(50, Math.min(MAX_CHART_ZOOM, current + amount))); }
  function localPoints() {
    const area = scrollRef.current;
    const bounds = area.getBoundingClientRect();
    return [...touchesRef.current.values()].slice(0, 2).map(point => ({ x: point.x - bounds.left - area.clientLeft, y: point.y - bounds.top - area.clientTop }));
  }
  function beginPinch() {
    const area = scrollRef.current;
    pinchRef.current = startPinch(localPoints(), { width: imageRef.current.getBoundingClientRect().width, scrollLeft: area.scrollLeft, scrollTop: area.scrollTop });
  }
  function pointerDown(event) {
    if (event.pointerType === "mouse") {
      if (event.button !== 0) return;
      const area = event.currentTarget;
      const bounds = area.getBoundingClientRect();
      // Leave scrollbar thumb dragging to the browser.
      if (event.clientX >= bounds.left + area.clientLeft + area.clientWidth || event.clientY >= bounds.top + area.clientTop + area.clientHeight) return;
      event.preventDefault();
      area.focus({ preventScroll: true });
      area.setPointerCapture(event.pointerId);
      mouseDragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
      return;
    }
    if (event.pointerType !== "touch") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    touchesRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (touchesRef.current.size === 2) beginPinch();
  }
  function pointerMove(event) {
    const mouse = mouseDragRef.current;
    if (mouse?.id === event.pointerId) {
      event.preventDefault();
      const area = scrollRef.current;
      area.scrollLeft += mouse.x - event.clientX;
      area.scrollTop += mouse.y - event.clientY;
      mouseDragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
      return;
    }
    const touches = touchesRef.current;
    const previous = touches.get(event.pointerId);
    if (!previous) return;
    event.preventDefault();
    touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const area = scrollRef.current;
    if (touches.size === 1) {
      area.scrollLeft += previous.x - event.clientX;
      area.scrollTop += previous.y - event.clientY;
      return;
    }
    if (!pinchRef.current) { beginPinch(); return; }
    const next = updatePinch(pinchRef.current, localPoints(), area.clientWidth);
    // Scroll after React resizes the image, keeping the chart point beneath the fingers.
    if (Math.abs(imageRef.current.getBoundingClientRect().width - next.width) < 0.01) {
      pendingScrollRef.current = null;
      area.scrollLeft = next.scrollLeft;
      area.scrollTop = next.scrollTop;
    } else pendingScrollRef.current = next;
    setZoom(next.zoom);
  }
  function pointerEnd(event) {
    if (mouseDragRef.current?.id === event.pointerId) mouseDragRef.current = null;
    if (!touchesRef.current.has(event.pointerId)) return;
    touchesRef.current.delete(event.pointerId);
    pinchRef.current = null;
    if (touchesRef.current.size >= 2) beginPinch();
  }
  const content = <>
      <h2 id={titleId}>Bolt & nut torque chart</h2>
      {question?.diameter && <dl className="study-torque-question-reference" aria-label="Current question fasteners">
        <div><dt>Diameter</dt><dd>{question.diameter}″{question.chartThread && <span className="study-torque-thread-label">Chart row: {question.chartThread}</span>}</dd></div>
        <div><dt>Bolt</dt><dd>{question.bolt === "NAS" ? "NAS583–NAS590" : question.bolt}</dd></div>
        <div><dt>Nut</dt><dd>{question.nut}</dd></div>
      </dl>}
      <p>Full reference chart · All values in in-lb. Use the fine-thread section. Click and drag with a mouse to move around. On touch screens, pinch to zoom and drag with one finger.</p>
      <span className="study-chart-mobile-hint">Pinch to zoom · drag to move</span>
      <div className="study-chart-zoom" aria-label="Chart zoom controls">
        <button type="button" aria-label="Zoom out" disabled={zoom === null || zoom <= 50} onClick={() => changeZoom(-25)}><Minus size={16} /></button>
        <output aria-label="Zoom level">{zoom === null ? "Fit" : `${Math.round(zoom)}%`}</output>
        <button type="button" aria-label="Zoom in" disabled={zoom >= MAX_CHART_ZOOM} onClick={() => changeZoom(25)}><Plus size={16} /></button>
        <button type="button" onClick={() => setZoom(null)}>Fit screen</button>
      </div>
      <div ref={scrollRef} className="study-diagram-scroll study-torque-full-scroll" tabIndex={0} aria-label="Full torque chart; click and drag with a mouse, or pinch to zoom and drag to pan" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onLostPointerCapture={pointerEnd}><img ref={imageRef} draggable={false} className="study-torque-full-image" src="/structures/torque-chart.svg" alt="Complete unmarked torque chart with bolt and nut classifications, twelve minimum/maximum columns, and fine- and coarse-thread sections. All torque values are in-lb." style={{ width: zoom === null ? "100%" : `${CHART_WIDTH * zoom / 100}px` }} /></div>
      {!inline && <div className="study-diagram-footer"><button type="button" className="study-primary" onClick={() => dialogRef.current?.close()}><X size={18} /> Close torque chart</button></div>}
  </>;
  return inline ? <aside className="study-torque-inline" aria-labelledby={titleId}>{content}</aside> : <>
    <button type="button" className="study-torque-chart-button" aria-haspopup="dialog" onClick={() => setOpen(true)}><BookOpen size={18} /> View torque chart</button>
    <dialog ref={dialogRef} className="study-diagram-dialog study-torque-dialog" aria-labelledby={titleId} onClose={() => setOpen(false)}>{content}</dialog>
  </>;
}
