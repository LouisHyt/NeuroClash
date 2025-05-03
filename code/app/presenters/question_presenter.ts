import Question from '#models/question'

export default class QuestionPresenter {
  toJSON(questions: Question[]) {
    return questions.map((question) => ({
      id: question.id,
      name: question.name,
      image: question.image,
      createdAt: question.createdAt.toFormat('MM/dd/yyyy'),
      isApproved: question.isApproved,
      theme: {
        id: question.theme.id,
        name: question.theme.name,
      },
      answers: question.answers.map((answer) => ({
        id: answer.id,
        name: answer.name,
        isCorrect: answer.isCorrect,
        slot: answer.slot,
      })),
      difficulty: {
        id: question.difficulty.id,
        name: question.difficulty.name,
      },
      author: {
        username: question.author.username,
        avatarUrl: question.author.avatarUrl,
        suggestedQuestions: question.author.suggestedQuestions.length,
      },
    }))
  }
}
