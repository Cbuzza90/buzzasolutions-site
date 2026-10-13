import source from "./systems-hydraulics-test1.json" with { type: "json" };
import { gradeTextResponse } from "../pages/recallLogic.js";

const aliases = {
  2: ["Pascal's law", "Pascal law", "Pascal", "Pascal's principle"],
  3: ["height", "depth", "vertical height", "vertical depth"],
  4: ["larger", "bigger", "greater"],
  6: ["increases", "increase", "rises", "gets thicker"],
  8: ["chemical stability", "stability"],
  12: ["natural rubber", "natural rubber seals"],
  15: ["light purple", "purple"],
  17: ["butyl", "butyl rubber"],
  18: ["5606", "MIL-H-5606"],
  19: ["open centre", "open center", "open-centre system", "open-center system"],
  21: ["closed centre", "closed center", "closed-centre system", "closed-center system"],
  24: ["power pack", "powerpack", "hydraulic power pack"],
  25: ["integral", "integral reservoir"],
  26: ["in-line", "inline", "in-line reservoir", "inline reservoir"],
  27: ["filter", "hydraulic filter"],
  28: ["pump", "hydraulic pump"],
  29: ["bleed air", "engine bleed air", "APU bleed air"],
  30: ["bootstrap", "bootstrapping"],
  31: ["pressure regulator", "hydraulic pressure regulator"],
  32: ["system relief valve", "pressure relief valve", "system pressure relief valve", "relief valve"],
  33: ["thermal relief valve"],
  34: ["pressure reducer", "pressure-reducing valve", "pressure reducing valve"],
  35: ["unloading valve", "unloader valve"],
  36: ["debooster", "deboost valve", "de-boost valve"],
  38: ["closed", "closed hydraulic system"],
  39: ["disc", "disk", "disc brakes", "disk brakes"],
  40: ["single-acting", "single acting actuator"],
  41: ["double-acting", "double acting actuator"],
};

const calculations = {
  37: { value: 1500, unit: "psi", explanation: "1,000 × 1.5 = 1,500 psi. This is the presentation's example, not a universal aircraft relief setting." },
  42: { value: 800, unit: "psi", explanation: "P = F / A = 4,800 / 6 = 800 psi." },
  43: { value: 3600, unit: "lb", explanation: "F = P × A = 1,200 × 3 = 3,600 lb." },
  44: { value: 72, unit: "in3", explanation: "V = A × D = 6 × 12 = 72 in³." },
  45: { value: 3000, unit: "lb", explanation: "F = W / D = 84,000 / 28 = 3,000 lb. This is towing force, not aircraft weight." },
  46: { value: 960, unit: "lb", explanation: "Fout = 60 × (8 / 2)² = 960 lb. Use π = 3.14 and keep intermediate areas unrounded." },
  47: { value: 1, unit: "in", explanation: "Output travel = 16 × (2 / 8)² = 1 inch." },
  48: { value: 660000, unit: "ftlb", explanation: "W = F × D = 1,650 × 400 = 660,000 ft-lb." },
  49: { value: 330000, unit: "ftlbmin", explanation: "Power = (1,650 × 400) / 2 = 330,000 ft-lb/min." },
  50: { value: 10, unit: "hp", explanation: "hp = (1,650 × 400) / (33,000 × 2) = 10 hp." },
};

export const systemsHydraulicsQuestions = source.map(question => ({ ...question, explanation: calculations[question.id]?.explanation }));

const units = {
  psi: ["psi", "lb/in2", "lbf/in2", "pounds per square inch"],
  lb: ["lb", "lbs", "lbf", "pound", "pounds", "pounds force"],
  in3: ["in3", "cubic inches", "cubic inch", "cu in", "in cubed", "inches cubed"],
  in: ["in", "inch", "inches"],
  ftlb: ["ftlb", "ft lb", "ft lbs", "ft lbf", "foot pounds", "foot pound", "feet pounds"],
  ftlbmin: ["ftlb/min", "ft lb/min", "ft lbs/min", "ft lbf/min", "ft lb per min", "ft lb per minute", "foot pounds per minute"],
  hp: ["hp", "horsepower", "horse power"],
};

export function gradeSystemsHydraulics(questionId, response) {
  const calculation = calculations[questionId];
  if (!calculation) return gradeTextResponse(response, { aliases: aliases[questionId] || [source.find(question => question.id === questionId)?.answer || ""], reject: questionId === 6 ? ["decreases", "decrease", "falls", "gets thinner"] : questionId === 3 ? ["weight", "volume", "shape", "width"] : undefined });
  const clean = response.normalize("NFKC").toLowerCase().trim().replace(/,/g, "").replace(/\^([23])/g, "$1");
  const match = clean.match(/^(\d+(?:\.\d+)?)\s*(.*?)\.?$/);
  if (!match) return { correct: false, close: false };
  const unit = match[2].replace(/[–—-]/g, " ").replace(/\s+/g, " ").trim();
  const correctUnit = !unit || units[calculation.unit].includes(unit);
  return { correct: Math.abs(Number(match[1]) - calculation.value) <= 0.001 && correctUnit, close: false };
}
