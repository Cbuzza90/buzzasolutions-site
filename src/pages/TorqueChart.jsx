import { useEffect, useRef, useState } from "react";
import { BookOpen, Minus, Plus, X } from "lucide-react";

export default function TorqueChart() {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [open]);
  function changeZoom(amount) { setZoom(current => current === null ? 100 : Math.max(50, Math.min(200, current + amount))); }
  return <>
    <button type="button" className="study-torque-chart-button" aria-haspopup="dialog" onClick={() => setOpen(true)}><BookOpen size={18} /> View torque chart</button>
    <dialog ref={dialogRef} className="study-diagram-dialog study-torque-dialog" aria-labelledby="torque-chart-title" onClose={() => setOpen(false)}>
      <h2 id="torque-chart-title">Bolt & nut torque chart</h2>
      <p>Full reference chart · All values in in-lb. Use the fine-thread section for this test. Scroll sideways and down to inspect the chart.</p>
      <div className="study-torque-zoom" aria-label="Chart zoom controls"><button type="button" onClick={() => setZoom(null)}>Fit chart</button><button type="button" aria-label="Zoom out" disabled={zoom === null || zoom === 50} onClick={() => changeZoom(-25)}><Minus size={18} /></button><output aria-live="polite">{zoom === null ? "Fit" : `${zoom}%`}</output><button type="button" aria-label="Zoom in" disabled={zoom === 200} onClick={() => changeZoom(25)}><Plus size={18} /></button></div>
      <div className="study-diagram-scroll study-torque-full-scroll" tabIndex={0} aria-label="Full torque chart; scroll horizontally and vertically"><img className="study-torque-full-image" src="/structures/torque-chart.svg" alt="Complete unmarked torque chart with bolt and nut classifications, twelve minimum/maximum columns, and fine- and coarse-thread sections. All torque values are in-lb." style={{ width: zoom === null ? "100%" : `${1280 * zoom / 100}px` }} /></div>
      <div className="study-diagram-footer"><button type="button" className="study-primary" onClick={() => dialogRef.current?.close()}><X size={18} /> Close torque chart</button></div>
    </dialog>
  </>;
}
