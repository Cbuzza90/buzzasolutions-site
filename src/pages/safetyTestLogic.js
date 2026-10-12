export function shuffleQuestions(questions, random = Math.random) {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function scoreAnswers(questions, answers) {
  return questions.reduce((total, question) => total + (answers[question.id] === question.correctIndex ? 1 : 0), 0);
}
