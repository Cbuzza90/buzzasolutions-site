import safety1 from "./safety-module1-test1.json" with { type: "json" };
import safety2 from "./safety-module1-test2.json" with { type: "json" };
import safety3 from "./safety-module1-recall.json" with { type: "json" };

// Reuse the supplied Safety review/key questions, keeping their verified answers.
// Explicit topic selection excludes shop safety, PPE and fire questions.
const targets = new Set([
  "anthropometry", "cognitive-science", "organizational-psychology",
  "complacency-identification", "pear-people", "heinrich-first-domino",
  "distraction-identification", "pressure-identification", "pear-environment", "fishbone-evidence",
  "human-computer-discipline", "human-factors-benefits", "fatigue-identification",
  "stress-definition", "latent-failure", "communication-identification",
  "teamwork-identification", "assertiveness-identification", "pear-actions", "distraction-recovery",
  "slide-human-factors-percentage", "human-error-risk", "safety-engineering",
  "awareness-identification", "active-error", "fishbone-name",
  "knowledge-identification", "resources-identification", "norms-identification",
  "pear-resources", "swiss-cheese-alignment", "safe-assertive-response",
]);

export const humanFactorsQuestions = [safety1, safety2, safety3].flatMap((bank, index) =>
  bank.filter(question => targets.has(question.learningTarget)).map(question => ({
    ...question,
    id: `hf-${question.learningTarget}`,
    source: { bank: index + 1, questionId: question.id },
  }))
);
