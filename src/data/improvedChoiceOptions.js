// The key and source-backed explanation stay unchanged. Keep the former choices
// so an existing shuffled attempt can finish honestly, without changing what
// the learner selected. Reset/new attempts use the revised choices.
export function improveChoiceOptions(question, distractors) {
  if (!distractors) return question;
  const answer = question.options[question.correctIndex];
  const options = [answer, ...distractors];
  if (options.length !== 4 || new Set(options.map(s => s.toLowerCase().trim())).size !== 4) throw new Error(`Invalid distractors: ${question.id}`);
  if (JSON.stringify(options) === JSON.stringify(question.options)) return question;
  return { ...question, options, correctIndex: 0, previousOptions: question.previousOptions ?? [...question.options] };
}
