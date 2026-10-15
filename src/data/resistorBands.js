// Transcribed from the user's Resistor Colour chart.ppt. Blank cells are not generated.
export const resistorColours = [
  { name: "Black", hex: "#171717", digit: 0, exponent: 0 },
  { name: "Brown", hex: "#854321", digit: 1, exponent: 1, tolerance: 1 },
  { name: "Red", hex: "#e32636", digit: 2, exponent: 2, tolerance: 2 },
  { name: "Orange", hex: "#f58220", digit: 3, exponent: 3 },
  { name: "Yellow", hex: "#ffe135", digit: 4, exponent: 4 },
  { name: "Green", hex: "#17a447", digit: 5, exponent: 5, tolerance: 0.5 },
  { name: "Blue", hex: "#2463dc", digit: 6, exponent: 6, tolerance: 0.25 },
  { name: "Purple", hex: "#a43bc4", digit: 7, exponent: 7, tolerance: 0.1 },
  { name: "Grey", hex: "#969696", digit: 8 },
  { name: "White", hex: "#ffffff", digit: 9 },
  { name: "Gold", hex: "#c7a331", exponent: -1, tolerance: 5 },
  { name: "Silver", hex: "#bdc5cf", exponent: -2, tolerance: 10 },
];
const byName = new Map(resistorColours.map(colour => [colour.name, colour]));
export const resistanceUnits = { "Ω": 1, "kΩ": 1000, "MΩ": 1000000 };
export const numberText = number => new Intl.NumberFormat("en-US", { maximumFractionDigits: 12 }).format(number);
export function resistanceText(ohms) {
  return `${numberText(ohms)} Ω`;
}

export function decodeResistor(bands) {
  if (!Array.isArray(bands) || ![4,5].includes(bands.length)) throw new Error("Invalid band count");
  const colours = bands.map(name => byName.get(name));
  if (colours.some(colour => !colour)) throw new Error("Unknown colour");
  const digitCount = bands.length === 4 ? 2 : 3;
  if (colours.slice(0, digitCount).some(colour => colour.digit === undefined) || colours[0].digit === 0) throw new Error("Invalid significant digits");
  const significant = Number(colours.slice(0, digitCount).map(colour => colour.digit).join(""));
  const exponent = colours[digitCount].exponent;
  const tolerance = colours[digitCount + 1].tolerance;
  if (exponent === undefined || tolerance === undefined) throw new Error("Blank cell in course chart");
  const resistance = significant * 10 ** exponent;
  const numeratorScale = 10 ** Math.max(exponent, 0);
  const denominator = 10000 * 10 ** Math.max(-exponent, 0);
  // Integer percentage arithmetic avoids displaying 100099.99999999999 for 100100.
  const minimum = significant * (10000 - tolerance * 100) * numeratorScale / denominator;
  const maximum = significant * (10000 + tolerance * 100) * numeratorScale / denominator;
  return { significant, exponent, multiplier: 10 ** exponent, resistance, tolerance, minimum, maximum };
}

export function resistorQuestion(bands, index = 0) {
  const expected = decodeResistor(bands);
  const prompt = `${bands.length}-band resistor: ${bands.join(" · ")}`;
  const explanation = `${expected.significant} × ${numberText(expected.multiplier)} = ${resistanceText(expected.resistance)}. Tolerance: ±${expected.tolerance}%. Minimum = R × (1 − tolerance/100) = ${resistanceText(expected.minimum)}; maximum = R × (1 + tolerance/100) = ${resistanceText(expected.maximum)}.`;
  return { id: `resistor-${index}`, bands, expected, prompt, explanation, studyNote: [prompt, explanation] };
}

const preferred = [10,11,12,13,15,16,18,20,22,24,27,30,33,36,39,43,47,51,56,62,68,75,82,91];
export function generateResistorQuestions(random = Math.random) {
  const pick = values => values[Math.floor(random() * values.length)];
  const counts = [...Array(10).fill(4), ...Array(10).fill(5)];
  const used = new Set();
  const questions = counts.map((count, index) => {
    let bands;
    for (let tries = 0; tries < 100; tries++) {
      const significant = count === 4 ? pick(preferred) : pick(preferred) * 10;
      bands = String(significant).split("").map(digit => resistorColours[Number(digit)].name);
      const multiplier = pick(resistorColours.filter(colour => colour.exponent !== undefined && colour.exponent <= (count === 4 ? 6 : 5)));
      bands.push(multiplier.name, pick(resistorColours.filter(colour => colour.tolerance !== undefined)).name);
      if (!used.has(bands.join("|"))) break;
      // A deterministic fallback also makes constant random sources safe in tests.
      if (tries === 99) {
        const digitCount = count === 4 ? 2 : 3;
        const variants = resistorColours.filter(colour => colour.exponent !== undefined && colour.exponent <= (count === 4 ? 6 : 5)).flatMap(multiplier => resistorColours.filter(colour => colour.tolerance !== undefined).map(tolerance => [...bands.slice(0, digitCount), multiplier.name, tolerance.name]));
        bands = variants.find(variant => !used.has(variant.join("|"))) ?? bands;
      }
    }
    used.add(bands.join("|"));
    return resistorQuestion(bands, index);
  });
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions.map((question, index) => resistorQuestion(question.bands, index));
}

export const emptyResistorAnswer = () => ({ unit: "Ω", resistance: "", tolerance: "", minimum: "", maximum: "" });
export function resistorFields() {
  return ["resistance", "tolerance", "minimum", "maximum"];
}
export function gradeResistor(question, answer) {
  const factor = resistanceUnits[answer?.unit];
  const correct = {};
  if (!factor) return { valid: false, correct, allCorrect: false };
  for (const field of resistorFields(question)) {
    let text = String(answer[field] ?? "").trim();
    if (/^\d{1,3}(?:,\d{3})+(?:\.\d*)?$/.test(text)) text = text.replaceAll(",", "");
    if (!/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text)) return { valid: false, correct: {}, allCorrect: false };
    const value = Number(text) * (["resistance", "minimum", "maximum"].includes(field) ? factor : 1);
    if (!Number.isFinite(value) || value < 0) return { valid: false, correct: {}, allCorrect: false };
    const expected = question.expected[field];
    correct[field] = Math.abs(value - expected) <= Math.max(1e-10, Math.abs(expected) * 1e-8);
  }
  return { valid: true, correct, allCorrect: Object.values(correct).every(Boolean) };
}

export const resistorNoteSections = [
  { id: "resistor-reading", title: "Resistor band calculations · reading order", items: [
    ["Four bands", "Two significant digits, multiplier, tolerance. Read from left to right in the practice drawing."],
    ["Five bands", "Three significant digits, multiplier, tolerance."],
    ["Resistance", "Join the significant digits into one number, then multiply by the multiplier. Enter resistance, minimum and maximum in ohms (Ω)."],
    ["Minimum and maximum", "Minimum = R × (1 − tolerance/100). Maximum = R × (1 + tolerance/100). Example: 22 Ω ±5% is 20.9–23.1 Ω."],
  ] },
  { id: "resistor-colours", title: "Resistor colour chart · digits, multipliers & tolerance", items: resistorColours.map(colour => [colour.name,
    [colour.digit !== undefined ? `Digit ${colour.digit}` : "Not a digit band", colour.exponent !== undefined ? `multiplier ×${numberText(10 ** colour.exponent)}` : "no multiplier listed in your chart", colour.tolerance !== undefined ? `tolerance ±${colour.tolerance}%` : "no tolerance listed in your chart"].filter(Boolean).join("; ") + "."])
  },
];
