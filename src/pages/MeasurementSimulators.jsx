import { ExternalLink } from "lucide-react";
import { measurementSimulators } from "../data/measurementSimulators.js";
import "./MeasurementSimulators.css";

export default function MeasurementSimulators() {
  return <section className="study-measurement-tests" aria-labelledby="measurement-tests-title">
    <header className="study-measurement-heading"><h2 id="measurement-tests-title">Calibration Tool Measurement Tests</h2><strong className="study-measurement-warning">MAKE SURE YOU CAN READ ALL FOUR</strong></header>
    <p>Test yourself! Practise reading measurements with these course simulators.</p>
    <div>{measurementSimulators.map(simulator => <a key={simulator.href} className="study-option-link" href={simulator.href} target="_blank" rel="noopener noreferrer">
      <strong>{simulator.title}</strong><ExternalLink size={17} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
    </a>)}</div>
    <small>Prof. Eduardo J. Stefanelli · Links from your course slides · Opens in a new tab</small>
  </section>;
}
