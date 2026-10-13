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

export function shufflePractice(questions, random = Math.random) {
  return shuffleQuestions(questions, random).map(question => {
    const options = shuffleQuestions(question.options.map((text, index) => ({ text, image: question.optionImages?.[index], correct: index === question.correctIndex })), random);
    return { ...question, options: options.map(option => option.text), ...(question.optionImages ? { optionImages: options.map(option => option.image) } : {}), correctIndex: options.findIndex(option => option.correct) };
  });
}
