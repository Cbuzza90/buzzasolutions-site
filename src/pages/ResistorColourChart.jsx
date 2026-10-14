import { useEffect, useId, useRef, useState } from "react";
import { BookOpen, X } from "lucide-react";
import { numberText, resistorColours } from "../data/resistorBands.js";

export default function ResistorColourChart() {
  const [open, setOpen] = useState(false);
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
        <div className="study-resistor-chart-scroll" tabIndex={0} aria-label="Resistor colour-code table; scroll horizontally for all columns">
          <table className="study-resistor-chart-table"><thead><tr><th>Colour</th><th>Digit</th><th>Multiplier</th><th>Tolerance</th><th>ppm/°C</th></tr></thead><tbody>
            {[...resistorColours.slice(10), ...resistorColours.slice(0,10)].map(colour => <tr key={colour.name}>
              <th scope="row"><span className="study-fluid-swatch" style={{ backgroundColor: colour.hex }} />{colour.name}</th>
              <td>{colour.digit ?? "—"}</td><td>{colour.exponent !== undefined ? `×${numberText(10 ** colour.exponent)}` : "—"}</td>
              <td>{colour.tolerance !== undefined ? `±${colour.tolerance}%` : "—"}</td><td>{colour.temperature ?? "—"}</td>
            </tr>)}
          </tbody></table>
        </div>
        <p className="study-feedback-explanation">A dash means that position is blank in your supplied chart. The quiz uses only its listed values.</p>
        <p className="study-feedback-explanation">Minimum = R × (1 − tolerance/100)<br />Maximum = R × (1 + tolerance/100)<br />1 kΩ = 1,000 Ω · 1 MΩ = 1,000,000 Ω</p>
        <a className="study-fire-source" href="/electricity/resistor-colour-chart.png" target="_blank" rel="noreferrer">Open original course chart image</a>
      </div>
      <div className="study-answer-dialog-footer"><button className="study-primary" type="button" onClick={() => ref.current?.close()}><X size={18} /> Close chart</button></div>
    </dialog>
  </>;
}
