import { useLayoutEffect, useRef, useState } from "react";

export default function ChartPracticeWorkspace({ children, reference, className = "", questionKey, compactTorqueLayout = false, compactToolbar }) {
  const workspaceRef = useRef(null), questionRef = useRef(null);
  const [largeChart, setLargeChart] = useState(false);
  const hasReference = Boolean(reference);
  useLayoutEffect(() => {
    if (!hasReference) return;
    const app = workspaceRef.current.closest(".study-app");
    let frame;
    const keepFieldVisible = () => {
      const active = document.activeElement, panel = questionRef.current;
      if (!active?.matches("input,textarea,select") || !panel?.contains(active)) return;
      const field = active.getBoundingClientRect(), bounds = panel.getBoundingClientRect();
      if (field.bottom > bounds.bottom - 12 || field.top < bounds.top + 12) panel.scrollTop += field.top - bounds.top - Math.max(12, (panel.clientHeight - field.height) / 2);
    };
    const scheduleVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(keepFieldVisible);
    };
    const update = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      app.style.setProperty("--practice-viewport-height", `${height}px`);
      app.dataset.practiceCompact = String(height < 560);
      scheduleVisibility();
    };
    update();
    // Follow the visible viewport when a phone keyboard or browser bar changes its height.
    window.visualViewport?.addEventListener("resize", update);
    window.addEventListener("resize", update);
    const panel = questionRef.current;
    const observer = new ResizeObserver(scheduleVisibility);
    observer.observe(panel);
    panel.addEventListener("focusin", scheduleVisibility);
    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
      observer.disconnect();
      panel.removeEventListener("focusin", scheduleVisibility);
      app.style.removeProperty("--practice-viewport-height");
      delete app.dataset.practiceCompact;
    };
  }, [hasReference]);
  useLayoutEffect(() => { if (questionRef.current) questionRef.current.scrollTop = 0; }, [questionKey]);
  return <section ref={workspaceRef} className={`study-detail study-test study-question-screen ${className}${compactTorqueLayout ? " study-torque-workspace" : ""}${reference ? " study-with-reference study-chart-workspace" : ""}`} style={{ "--chart-share": compactTorqueLayout ? (largeChart ? "46%" : "65%") : (largeChart ? "62%" : "46%") }}>
    {reference ? <>
      <div className="study-practice-reference">{reference}</div>
      <div className="study-workspace-controls">{compactTorqueLayout ? compactToolbar : <span>Chart stays open · scroll answers below</span>}{!compactTorqueLayout && <button type="button" aria-pressed={largeChart} onClick={() => setLargeChart(value => !value)}>{largeChart ? "More answer space" : "More chart space"}</button>}</div>
      <div className="study-practice-question" ref={questionRef} role="region" aria-label="Question and answers" tabIndex={0}>{children}</div>
    </> : children}
  </section>;
}
