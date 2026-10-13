import { useEffect, useRef, useState } from "react";
import { BookOpen, X } from "lucide-react";
import { fineThreadTorqueRows, formatTorqueRange, torqueGroups } from "../data/torqueTest";

export default function TorqueChart() {
  const [open, setOpen] = useState(false);
  const [group, setGroup] = useState(0);
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => { dialog.close(); document.body.style.overflow = previous; };
  }, [open]);
  return <>
    <button type="button" className="study-torque-chart-button" aria-haspopup="dialog" onClick={() => setOpen(true)}><BookOpen size={18} /> View torque chart</button>
    <dialog ref={dialogRef} className="study-diagram-dialog study-torque-dialog" aria-labelledby="torque-chart-title" onClose={() => setOpen(false)}>
      <h2 id="torque-chart-title">Fine-thread torque chart</h2>
      <p>Choose the bolt group, then match the diameter and nut column. Every range is minimum–maximum in-lb. Scroll to see more rows or columns.</p>
      <div className="study-torque-groups" aria-label="Bolt group">{torqueGroups.map((item, index) => <button type="button" key={item.name} aria-pressed={group === index} onClick={() => setGroup(index)}>{item.name}</button>)}</div>
      <div className="study-diagram-scroll">
        <table className="study-torque-table"><caption>{torqueGroups[group].name} · Fine threads · in-lb</caption><thead><tr><th scope="col">Diameter / thread</th><th scope="col">Tension nuts<br />{torqueGroups[group].tension}</th><th scope="col">Shear nuts<br />{torqueGroups[group].shear}</th></tr></thead><tbody>{fineThreadTorqueRows.map(row => <tr key={row.diameter}><th scope="row">{row.diameter}″<small>{row.thread}</small></th><td>{formatTorqueRange(row.ranges[group * 2]).replace(" in-lb", "")}</td><td>{formatTorqueRange(row.ranges[group * 2 + 1]).replace(" in-lb", "")}</td></tr>)}</tbody></table>
        <details className="study-torque-source"><summary>Original course chart photo</summary><img src="/structures/torque-chart.jpg" alt="Original supplied torque chart with fine- and coarse-thread sections, AN and NAS steel bolt columns, and aluminum bolt columns." /></details>
      </div>
      <div className="study-diagram-footer"><button type="button" className="study-primary" onClick={() => dialogRef.current?.close()}><X size={18} /> Close torque chart</button></div>
    </dialog>
  </>;
}
