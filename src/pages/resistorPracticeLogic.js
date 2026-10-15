import { emptyResistorAnswer, generateResistorQuestions, gradeResistor, resistanceUnits, resistorQuestion } from "../data/resistorBands.js";
import { readPracticeRecord, writePracticeRecord } from "./practiceProgress.js";

export const resistorTestId = "/study/electricity/module-1/resistor-band-calculations";
const version = 1;
export function newResistorAttempt(random = Math.random) {
  return { questions: generateResistorQuestions(random), position: 0, answers: [], draft: emptyResistorAnswer(), complete: false };
}
// Convert older saved unit selections while preserving their numerical meaning.
export function normalizeOhmAnswer(answer) {
  const result = { ...answer, unit: "Ω" };
  const factor = resistanceUnits[answer.unit];
  if (factor !== 1) for (const field of ["resistance", "minimum", "maximum"]) {
    let text = answer[field].trim();
    if (/^\d{1,3}(?:,\d{3})+(?:\.\d*)?$/.test(text)) text = text.replaceAll(",", "");
    if (/^(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(text) && Number.isFinite(Number(text) * factor)) result[field] = String(Number(text) * factor);
  }
  delete result.temperature;
  return result;
}
export function restoreResistorAttempt(record) {
  try {
    if (record?.version !== version || !Array.isArray(record.bands) || record.bands.length !== 20) return null;
    // Older attempts included a sixth coefficient band. Keep their order and answers,
    // but remove that band; migrated questions can now share the same five colours.
    const questions = record.bands.map((bands, index) => {
      if (bands.length === 6 && !["Brown", "Red", "Orange", "Yellow"].includes(bands[5])) throw new Error("Invalid legacy sixth band");
      return resistorQuestion(bands.length === 6 ? bands.slice(0, 5) : bands, index);
    });
    const { position, answers, draft, complete } = record;
    if (!Number.isInteger(position) || position < 0 || position >= 20 || !Array.isArray(answers) || ![position, position + 1].includes(answers.length) || typeof complete !== "boolean") return null;
    if (answers.some((answer, index) => !gradeResistor(questions[index], answer).valid)) return null;
    if (!draft || !["Ω", "kΩ", "MΩ"].includes(draft.unit) || Object.keys(emptyResistorAnswer()).some(key => typeof draft[key] !== "string")) return null;
    if (complete && (position !== 19 || answers.length !== 20)) return null;
    return { questions, position, answers: answers.map(normalizeOhmAnswer), draft: normalizeOhmAnswer(draft), complete };
  } catch { return null; }
}
export function loadResistorAttempt(storage) {
  return restoreResistorAttempt(readPracticeRecord("resistor-progress", resistorTestId, storage)) ?? newResistorAttempt();
}
export function saveResistorAttempt(attempt, storage) {
  return writePracticeRecord("resistor-progress", resistorTestId, { version, bands: attempt.questions.map(q => q.bands), position: attempt.position, answers: attempt.answers, draft: attempt.draft, complete: attempt.complete }, storage);
}
export function resistorScore(attempt) {
  return attempt.answers.reduce((score, answer, index) => score + Number(gradeResistor(attempt.questions[index], answer).allCorrect), 0);
}
export function loadResistorBest(storage) {
  const best = readPracticeRecord("resistor-best", resistorTestId, storage);
  return best?.version === version && best.total === 20 && Number.isInteger(best.score) && best.score >= 0 && best.score <= 20 ? best : null;
}
export function recordResistorBest(score, storage) {
  const previous = loadResistorBest(storage);
  if (!Number.isInteger(score) || score < 0 || score > 20) return { best: previous, saved: false };
  if (previous && previous.score >= score) return { best: previous, saved: true };
  const best = { version, score, total: 20 };
  return { best, saved: writePracticeRecord("resistor-best", resistorTestId, best, storage) };
}
