import source from "./structures-practice1.json" with { type: "json" };
import { gradeTextResponse } from "../pages/recallLogic.js";

const select = (label, correct, options) => ({ label, type: "select", correct, options });
const text = (label, rule, example) => ({ label, type: "text", rule, example });
const number = (label, correct, unit) => ({ label, type: "number", correct, unit });
const choices = labels => labels.map((label, index) => ({ value: String.fromCharCode(65 + index), label }));
const tf = [{ value: "T", label: "True" }, { value: "F", label: "False" }];
const fluidTypes = [{ value: "V", label: "Vegetable-base" }, { value: "M", label: "Mineral-base MIL-H-5606" }, { value: "P", label: "Phosphate ester (Skydrol/HyJet)" }];
const centreTypes = [{ value: "O", label: "Open centre" }, { value: "C", label: "Closed centre" }];
const pressureFunctions = choices(["Protects isolated fluid against pressure from heating", "Reduces pressure and increases brake-fluid volume", "Maintains a lower pressure for a component", "Controls system pressure within a preset range", "Protects against pressure above the normal limit", "Returns excess pump flow when required pressure is reached"]);
const formulas = choices(["W = F × D", "V = A × D", "P = F / A", "F = P × A", "hp = (F × D) / (33,000 × t), with feet and minutes", "A = π × r²", "Power = (F × D) / t", "A = F / P"]);

const configuration = {
  2: [text("Explain the pressure change", { groups: [["equally", "equal", "all directions"], ["undiminished", "without loss", "unchanged", "same pressure"], ["throughout the fluid", "throughout fluid", "all the fluid", "entire fluid", "container walls"]] }, "Transmitted equally and undiminished throughout the fluid and to its container walls.")],
  5: ["Viscosity is internal resistance to flow.", "Slow-flowing liquids generally have high viscosity.", "Liquid viscosity increases as temperature decreases.", "Every fluid has the same viscosity at 30°F.", "Viscosity is another name for pressure.", "A Saybolt universal viscosimeter measures viscosity."].map((label, i) => select(label, ["T", "T", "T", "F", "F", "T"][i], tf)),
  6: ["Fire point", "Chemical stability", "Flash point"].map((label, i) => select(label, ["C", "A", "B"][i], choices(["Resistance to oxidation and deterioration", "Momentary ignition of released vapour", "Ignition with sustained burning"]))),
  7: ["Blue colour", "Red colour", "Typically light purple", "Castor oil and alcohol base", "Kerosene/petroleum base", "Skydrol", "Natural rubber seals", "Neoprene seals", "Butyl or ethylene-propylene seals", "Fire-resistant for high-performance aircraft", "Additives prevent foaming and corrosion", "MIL-H-7644"].map((label, i) => select(label, ["V", "M", "P", "V", "M", "P", "V", "M", "P", "P", "M", "V"][i], fluidTypes)),
  8: [text("Missing specification number", { aliases: ["5606", "MIL H 5606", "MIL-H-5606"] }, "5606")],
  11: [text("Give two reasons to keep systems and containers sealed", { minimum: 2, groups: [["contamination", "contaminants", "dirt"], ["air"], ["moisture", "water"]] }, "Exclude contamination and moisture."), text("What can happen when incompatible fluids are mixed?", { minimum: 1, groups: [["swell seals", "seals swell", "seal swelling", "damage seals", "seal damage", "seal breakdown", "damaged seals"], ["block the system", "blockage", "blocked system"]] }, "Seal damage and system blockage.")],
  13: ["Selector valves in series", "Selector valves in parallel", "Fewer components and simpler troubleshooting", "Stores energy with an accumulator and check valves", "Neutral selectors circulate fluid to the reservoir", "Several systems can operate at once"].map((label, i) => select(label, ["O", "C", "O", "C", "O", "C"][i], centreTypes)),
  14: [text("Fluid flows to actuators when…", { aliases: ["required", "needed", "an actuator is commanded", "commanded", "the actuator is commanded", "actuator commanded"] }, "Required"), text("Hydraulic ___ remains available", { aliases: ["pressure", "hydraulic pressure"] }, "Pressure")],
  16: [text("What is a hydraulic power pack?", { groups: [["self contained", "selfcontained"], ["hydraulic", "power system"]] }, "A self-contained hydraulic power system."), text("Name all four listed components", { groups: [["electric pump", "electrical pump"], ["pressure control valves", "pressure control valve"], ["selector valves", "selector valve"], ["reservoir"]] }, "Electric pump, pressure control valves, selector valves, reservoir.")],
  18: [text("Name two reservoir functions besides storage", { minimum: 2, groups: [["purging air", "purge air", "removing air", "remove air", "air removal"], ["separating contamination", "separate contamination", "remove contamination", "contamination separation"], ["thermal expansion", "expansion"], ["volume changes", "changes in fluid volume", "fluid volume requirements", "volume requirements"]] }, "Purging air and allowing thermal expansion.")],
  19: [text("Why use a pressurized reservoir?", { groups: [["positive fluid supply", "positive supply", "pump inlet", "pump supply"], ["prevent foaming", "prevents foaming", "prevention of foaming", "reduce foaming", "prevent foam", "avoid foaming"]] }, "Positive fluid supply at the pump inlet and prevention of foaming."), text("Name the three pressurizing methods", { groups: [["aspirator"], ["bleed air"], ["hydraulic system pressure", "hydraulic pressure", "bootstrap"]] }, "Aspirator, bleed air, and hydraulic system pressure/bootstrap.")],
  22: [select("Single-acting actuator", "B", choices(["Fluid acts on both sides of the piston", "Fluid acts on one side; spring and/or nitrogen opposes it"])), select("Double-acting actuator", "A", choices(["Fluid acts on both sides of the piston", "Fluid acts on one side; spring and/or nitrogen opposes it"]))],
  23: ["Pressure regulator", "System pressure relief valve", "Thermal relief valve", "Pressure reducer", "Debooster", "Unloading valve"].map((label, i) => select(label, ["D", "E", "A", "C", "B", "F"][i], pressureFunctions)),
  24: [text("Which component provides overpressure protection?", { aliases: ["system pressure relief valve", "system relief valve", "pressure relief valve", "relief valve"] }, "System pressure relief valve"), number("150% of 1,000 psi", 1500, "psi")],
  28: ["Hydraulic pressure", "Hydraulic force", "Piston area from force and pressure", "Circular piston area from radius", "Fluid volume displaced", "Work", "Power", "Horsepower"].map((label, i) => select(label, ["C", "D", "H", "F", "B", "A", "G", "E"][i], formulas)),
  29: [number("Hydraulic pressure", 800, "psi")], 30: [number("Piston force", 3600, "lb")], 31: [number("Fluid volume displaced", 72, "in³")],
  32: [number("Towing force", 3000, "lb")], 33: [number("Output force", 960, "lb")], 34: [number("Output piston travel", 1, "in")],
  35: [number("Work", 660000, "ft-lb"), number("Power", 330000, "ft-lb/min"), number("Horsepower", 10, "hp")],
};

export const unitOptions = ["psi", "lb", "in³", "in", "ft-lb", "ft-lb/min", "hp"];
export const diagramQuestions = source.filter(question => question.needsDiagram);
export const structuresQuestions = source.filter(question => !question.needsDiagram).map(question => {
  const options = [...question.prompt.matchAll(/^- ([A-F])\. (.+)$/gm)].map(match => ({ value: match[1], label: match[2].trim() }));
  if (question.title.startsWith("Multiple choice")) return { ...question, kind: "choice", prompt: question.prompt.split("\n- A.")[0].trim(), options, correct: question.answer[0] };
  if (question.id === 10) return { ...question, kind: "multiple", prompt: "Select all desirable hydraulic-fluid properties.", options, correct: ["A", "B", "C", "D"] };
  return { ...question, kind: "fields", fields: configuration[question.id], prompt: question.title.startsWith("Calculation") ? question.prompt : question.prompt.split("\n")[0] };
});

export function gradeStructures(question, response) {
  if (question.kind === "choice") return { correct: response === question.correct, close: false };
  if (question.kind === "multiple") return { correct: response.length === question.correct.length && question.correct.every(value => response.includes(value)), close: false };
  const parts = question.fields.map((field, index) => {
    const value = response[index];
    if (field.type === "text") return gradeTextResponse(value?.text || "", field.rule);
    if (field.type === "select") return { correct: value?.text === field.correct, close: false };
    const clean = (value?.text || "").replace(/,/g, "").trim();
    return { correct: /^\d+(\.\d+)?$/.test(clean) && Math.abs(Number(clean) - field.correct) <= 0.01 && value?.unit === field.unit, close: false };
  });
  return { correct: parts.every(part => part.correct), close: parts.some(part => part.close), parts };
}

export function structuresReady(question, response) {
  if (question.kind === "multiple") return response.length > 0;
  if (question.kind === "choice") return Boolean(response);
  return question.fields.every((field, i) => response[i]?.text?.trim() && (field.type !== "number" || response[i]?.unit));
}

export function describeStructuresResponse(question, response) {
  if (question.kind === "choice" || question.kind === "multiple") return (question.kind === "choice" ? [response] : response).map(value => `${value}. ${question.options.find(option => option.value === value)?.label || ""}`).join("; ");
  return question.fields.map((field, i) => `${field.label}: ${field.type === "select" ? field.options.find(option => option.value === response[i]?.text)?.label : `${response[i]?.text || ""}${response[i]?.unit ? ` ${response[i].unit}` : ""}`}`).join("\n");
}
