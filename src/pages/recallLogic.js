export function normalizeAnswer(value) {
  return value.normalize("NFKC").toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}

// Damerau-Levenshtein also catches swapped letters such as "hosuekeeping".
function distance(a, b) {
  const rows = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) rows[i][0] = i;
  for (let j = 0; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) rows[i][j] = Math.min(rows[i][j], rows[i - 2][j - 2] + 1);
  }
  return rows[a.length][b.length];
}

function matchWords(actual, expected) {
  if (actual.length !== expected.length) return null;
  let edits = 0;
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] === expected[i]) continue;
    // Numbers and short terms (especially fire classes A–D) must be exact.
    if (/\d/.test(actual[i] + expected[i]) || Math.min(actual[i].length, expected[i].length) < 4) return null;
    const allowed = expected[i].length >= 8 ? 2 : 1;
    const difference = distance(actual[i], expected[i]);
    if (difference > allowed) return null;
    edits += difference;
  }
  return edits <= 3 ? { close: edits > 0 } : null;
}

function matchPhrase(input, phrase, within = false) {
  const actual = input.split(" ");
  const expected = normalizeAnswer(phrase).split(" ");
  if (!within) return matchWords(actual, expected);
  let closeMatch = null;
  for (let i = 0; i <= actual.length - expected.length; i++) {
    if (i > 0 && ["not", "no", "never", "dont", "without"].includes(actual[i - 1])) continue;
    const result = matchWords(actual.slice(i, i + expected.length), expected);
    if (result && !result.close) return result;
    if (result) closeMatch = result;
  }
  return closeMatch;
}

const aliases = {
  1: ["housekeeping", "good housekeeping"],
  2: ["designated storage location", "designated storage", "storage location", "proper place", "designated location", "designated place"],
  3: ["everyone", "everybody", "all personnel", "everyone in the workplace", "all workers"],
  4: ["pedestrians", "pedestrian", "people walking", "pedestrian traffic"],
  6: ["person", "wearer", "body", "the person"],
  7: ["clear", "unobstructed", "unblocked"],
  8: ["flammable liquid", "flammable liquids", "flammable material", "flammable materials"],
  10: ["pressure", "hydraulic pressure", "stored pressure"],
  12: ["a", "class a"], 13: ["b", "class b"], 14: ["c", "class c"], 15: ["d", "class d"],
  16: ["disconnect", "shut off", "isolate", "disconnect power", "disconnect the power", "disconnect electrical power", "disconnect the electrical power", "shut off power", "shut off electrical power", "shut off the electrical power", "isolate power", "isolate electrical power", "isolate the electrical power", "turn off the power", "turn off electricity", "turn it off", "switch it off", "switch off power", "isolate electrical supply", "disconnect electrical supply"],
  17: ["water", "water type"], 18: ["oxygen"], 21: ["80", "80 percent", "eighty", "eighty percent"],
  22: ["anthropometry", "anthropometrics"], 23: ["computer science"],
  24: ["risk", "risks", "human error", "risks associated with human error", "risk associated with human error", "risk of human error"],
  25: ["cognitive science"], 26: ["cognitive science"], 29: ["organizational psychology", "organisational psychology"],
  30: ["fatigue"], 31: ["lack of awareness", "unawareness"], 32: ["complacency"], 33: ["stress"],
  35: ["people"], 36: ["latent", "latent failure"],
  37: ["cause and effect", "cause and effect diagram", "ishikawa", "ishikawa diagram"], 38: ["social environment"],
};

const concepts = {
  5: { groups: [["upright", "vertical", "vertically"], ["secured", "secure", "restrained", "chained", "strapped", "tied"], ["valve closed", "closed valve", "valve shut"], ["cap fitted", "cap on", "protective cap", "cap installed"]], reject: ["unsecured", "horizontal", "valve open", "not secured", "cap removed"] },
  9: { minimum: 1, groups: [["entanglement", "caught in machinery", "catch in machinery", "caught in moving machinery", "caught in rotating machinery", "get caught", "snagged", "snag"], ["electrical short", "short circuit", "electrical burns", "burn hazard"]] },
  11: { groups: [["heat"], ["fuel"], ["oxygen"]], reject: ["nitrogen", "water", "electricity"] },
  19: { groups: [["red"], ["square"]], reject: ["blue", "green", "yellow", "circle", "triangle", "star"] },
  20: { minimum: 1, groups: [["loss of extinguishing agent", "lost extinguishing agent", "lost agent", "agent loss", "loss of agent", "leak", "leaks", "leakage"], ["correct charge", "charge remains", "check charge", "check the charge", "remaining agent"]] },
  27: { minimum: 2, groups: [
    ["fewer errors", "less errors", "reduced errors", "fewer mistakes", "less mistakes", "reduced mistakes"],
    ["improved work quality", "better quality", "improved quality", "higher quality"],
    ["worker safety", "workers safety", "employee safety", "improved safety", "better safety", "safer workers"],
    ["aircraft safety", "safer aircraft"],
    ["fewer injuries", "less injuries", "reduced injuries"],
    ["reduced costs", "lower costs", "less cost", "save money"],
    ["fewer missed deadlines", "meet deadlines", "less missed deadlines"],
    ["involved workforce", "responsible workforce", "worker involvement", "more involved workers", "more responsible workers"],
  ] },
  28: { minimum: 1, groups: [["keep the system safe", "keep system safe", "system remains safe", "remain safe", "safe and functioning", "safe despite failure", "fail safely"], ["prevent harm", "prevent injury", "prevent injuries", "prevent failure from causing harm", "prevent a failure from causing harm", "avoid harm", "avoid injury", "protect people"]] },
  34: { minimum: 1, groups: [["incorrectly tightening a fitting", "incorrectly tightened fitting", "wrong torque", "over tightening", "overtightening", "under tightening", "loose fitting"], ["crossing electrical connections", "crossed wires", "crossing wires", "wrong terminals", "wrong electrical connections", "incorrect wiring"], ["installing the wrong part", "install wrong part", "wrong part installed"], ["forgetting to secure an access panel", "unsecured access panel", "forget to secure a panel", "forgot to secure an access panel"]] },
};

export function gradeRecall(questionId, response) {
  let input = normalizeAnswer(response);
  if (questionId === 16) input = input.replace(/\s+if (it is )?safe( to do so)?$/, "");
  if (!input || input.length > 500) return { correct: false, close: false };
  const alternatives = aliases[questionId];
  if (alternatives) {
    const matches = alternatives.map(phrase => matchPhrase(input, phrase)).filter(Boolean);
    return { correct: matches.length > 0, close: matches.length > 0 && matches.every(match => match.close) };
  }
  const rule = concepts[questionId];
  if (!rule || rule.reject?.some(phrase => ` ${input} `.includes(` ${normalizeAnswer(phrase)} `))) return { correct: false, close: false };
  const matches = rule.groups.map(group => group.map(phrase => matchPhrase(input, phrase, true)).filter(Boolean)).filter(group => group.length);
  const correct = matches.length >= (rule.minimum ?? rule.groups.length);
  return { correct, close: correct && matches.some(group => group.every(match => match.close)) };
}
