import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { QuestionFactory } from '#database/factories/question_factory'

export default class extends BaseSeeder {
  async run() {
    // Récupérer les IDs des thèmes et difficultés existants
    const randomAnswersArray = () => {
      const correctIndex = Math.floor(Math.random() * 4)
      let answers = []
      for (let i = 0; i < 4; i++) {
        answers.push({
          isCorrect: i === correctIndex,
          name: i === correctIndex ? 'Correct' : 'blablabla',
          slot: i,
        })
      }
      return answers
    }

    await QuestionFactory.with('answers', 4, (answer) => {
      answer.merge(randomAnswersArray())
    }).createMany(20)

    await QuestionFactory.with('answers', 4, (answer) => {
      answer.merge(randomAnswersArray())
    })
      .apply('approved')
      .createMany(20)
  }
}
