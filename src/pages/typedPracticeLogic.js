import { readPracticeRecord, writePracticeRecord } from "./practiceProgress.js";

export const normalizeTypedAnswer = value => String(value ?? "").normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
export function gradeTypedAnswer(question, value) {
  const answer = normalizeTypedAnswer(value);
  return Boolean(answer) && question.acceptedAnswers.some(candidate => normalizeTypedAnswer(candidate) === answer);
}
export function typedSignature(questions) {
  const text = JSON.stringify(questions.map(q => [String(q.id), q.prompt, q.answer, q.acceptedAnswers]).sort((a, b) => a[0].localeCompare(b[0])));
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return `${questions.length}:${hash >>> 0}`;
}
export function newTypedAttempt(questions, random = Math.random) {
  const order = [...questions];
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  return { order, position: 0, answers: {}, draft: "", complete: false };
}
export function restoreTypedAttempt(questions, record) {
  try {
    if (record?.version !== 1 || record.signature !== typedSignature(questions) || !Array.isArray(record.order) || record.order.length !== questions.length || new Set(record.order).size !== questions.length) return null;
    const source = new Map(questions.map(q => [String(q.id), q]));
    const order = record.order.map(id => source.get(id));
    if (order.some(q => !q)) return null;
    const { position, answers, draft, complete } = record;
    if (!Number.isInteger(position) || position < 0 || position >= order.length || typeof complete !== "boolean" || typeof draft !== "string" || draft.length > 200 || !answers || typeof answers !== "object" || Array.isArray(answers)) return null;
    for (const [id, answer] of Object.entries(answers)) {
      const offset = order.findIndex(q => String(q.id) === id);
      if (offset < 0 || offset > position || typeof answer !== "string" || !normalizeTypedAnswer(answer) || answer.length > 200) return null;
    }
    if (order.slice(0, position).some(q => answers[q.id] === undefined)) return null;
    if (complete && (position !== order.length - 1 || Object.keys(answers).length !== order.length)) return null;
    return { order, position, answers, draft, complete };
  } catch { return null; }
}
export const loadTypedAttempt = (questions, testId, storage) => restoreTypedAttempt(questions, readPracticeRecord("typed-progress", testId, storage)) ?? newTypedAttempt(questions);
export const saveTypedAttempt = (questions, testId, attempt, storage) => writePracticeRecord("typed-progress", testId, { version: 1, signature: typedSignature(questions), order: attempt.order.map(q => String(q.id)), position: attempt.position, answers: attempt.answers, draft: attempt.draft, complete: attempt.complete }, storage);
export const typedScore = attempt => attempt.order.reduce((score, q) => score + Number(gradeTypedAnswer(q, attempt.answers[q.id])), 0);
export function loadTypedBest(questions, testId, storage) {
  const best = readPracticeRecord("typed-best", testId, storage);
  return best?.signature === typedSignature(questions) && best.total === questions.length && Number.isInteger(best.score) && best.score >= 0 && best.score <= best.total ? best : null;
}
export function recordTypedBest(questions, testId, score, storage) {
  const previous = loadTypedBest(questions, testId, storage);
  if (!Number.isInteger(score) || score < 0 || score > questions.length) return { best: previous, saved: false };
  if (previous && previous.score >= score) return { best: previous, saved: true };
  const best = { signature: typedSignature(questions), score, total: questions.length };
  return { best, saved: writePracticeRecord("typed-best", testId, best, storage) };
}
