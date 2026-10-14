import { shufflePractice } from "./safetyTestLogic.js";

export const RESET_PRACTICE_EVENT = "study:reset-practice";
const key = (type, testId) => `study-practice:${type}:${testId}`;
const storageForBrowser = () => { try { return globalThis.localStorage; } catch { return undefined; } };
function read(storage, name) { try { return JSON.parse(storage?.getItem(name) ?? "null"); } catch { return null; } }
function write(storage, name, value) { try { if (!storage) return false; storage.setItem(name, JSON.stringify(value)); return true; } catch { return false; } }

export function bankSignature(questions) {
  const text = JSON.stringify(questions.map(q => ({ id: String(q.id), prompt: q.prompt, options: [...q.options].sort(), correct: q.options[q.correctIndex] })).sort((a, b) => a.id.localeCompare(b.id)));
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return `${questions.length}:${hash >>> 0}`;
}

export function newPracticeAttempt(questions, random = Math.random) {
  return { order: shufflePractice(questions, random), position: 0, answers: {}, complete: false };
}

export function restorePracticeAttempt(questions, record) {
  try {
    if (!record || record.version !== 1 || record.signature !== bankSignature(questions) || !Array.isArray(record.order) || record.order.length !== questions.length) return null;
    const source = new Map(questions.map(q => [String(q.id), q]));
    if (new Set(record.order.map(q => q.id)).size !== source.size) return null;
    const order = record.order.map(saved => {
      const q = source.get(saved.id);
      if (!q || !Array.isArray(saved.options) || saved.options.length !== q.options.length || new Set(saved.options).size !== q.options.length || saved.options.some(option => !q.options.includes(option))) throw new Error("Invalid choices");
      return { ...q, options: saved.options, correctIndex: saved.options.indexOf(q.options[q.correctIndex]), ...(q.optionImages ? { optionImages: saved.options.map(option => q.optionImages[q.options.indexOf(option)]) } : {}) };
    });
    const { position, answers, complete } = record;
    if (!Number.isInteger(position) || position < 0 || position >= order.length || typeof complete !== "boolean" || !answers || typeof answers !== "object" || Array.isArray(answers)) return null;
    for (const [id, index] of Object.entries(answers)) {
      const offset = order.findIndex(q => String(q.id) === id);
      if (offset < 0 || offset > position || !Number.isInteger(index) || index < 0 || index >= order[offset].options.length) return null;
    }
    if (order.slice(0, position).some(q => answers[q.id] === undefined)) return null;
    if (complete && (position !== order.length - 1 || Object.keys(answers).length !== order.length)) return null;
    return { order, position, answers, complete };
  } catch { return null; }
}

export function loadPracticeAttempt(questions, testId, storage = storageForBrowser()) {
  return restorePracticeAttempt(questions, read(storage, key("progress", testId))) ?? newPracticeAttempt(questions);
}

export function savePracticeAttempt(questions, testId, attempt, storage = storageForBrowser()) {
  return write(storage, key("progress", testId), { version: 1, signature: bankSignature(questions), order: attempt.order.map(q => ({ id: String(q.id), options: q.options })), position: attempt.position, answers: attempt.answers, complete: attempt.complete });
}

export function loadHighestScore(questions, testId, storage = storageForBrowser()) {
  const record = read(storage, key("best", testId));
  return record?.signature === bankSignature(questions) && record.total === questions.length && Number.isInteger(record.score) && record.score >= 0 && record.score <= record.total ? record : null;
}

export function recordHighestScore(questions, testId, score, storage = storageForBrowser()) {
  const previous = loadHighestScore(questions, testId, storage);
  if (!Number.isInteger(score) || score < 0 || score > questions.length) return { best: previous, saved: false };
  if (previous && previous.score >= score) return { best: previous, saved: true };
  const best = { signature: bankSignature(questions), score, total: questions.length };
  return { best, saved: write(storage, key("best", testId), best) };
}

export function practiceSummary(questions, testId, storage = storageForBrowser()) {
  const attempt = restorePracticeAttempt(questions, read(storage, key("progress", testId)));
  return { best: loadHighestScore(questions, testId, storage), answered: attempt ? Object.keys(attempt.answers).length : 0, complete: attempt?.complete ?? false };
}
