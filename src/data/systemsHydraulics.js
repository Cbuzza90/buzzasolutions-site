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

export const systemsHydraulicsQuestions = source;

export function gradeSystemsHydraulics(questionId, response) {
  const question = source.find(question => question.id === questionId);
  if (!question) return { correct: false, close: false };
  return gradeTextResponse(response, { aliases: aliases[questionId] || [question.answer], reject: questionId === 6 ? ["decreases", "decrease", "falls", "gets thinner"] : questionId === 3 ? ["weight", "volume", "shape", "width"] : undefined });
}
