import factory from '@adonisjs/lucid/factories'
import { AnswerFactory } from './answer_factory.js'
import Question from '#models/question'
import Theme from '#models/theme'
import Difficulty from '#models/difficulty'
import User from '#models/user'

export const QuestionFactory = factory
  .define(Question, async ({ faker }) => {
    const themes = await Theme.all()
    const difficulties = await Difficulty.all()
    const users = await User.all()

    return {
      name: faker.lorem.words({
        min: 2,
        max: 5,
      }),
      isApproved: false,
      themeId: themes[Math.floor(Math.random() * themes.length)].id,
      difficultyId: difficulties[Math.floor(Math.random() * difficulties.length)].id,
      userUuid: users[Math.floor(Math.random() * users.length)].uuid,
    }
  })
  .state('approved', (state) => {
    state.isApproved = true
  })
  .relation('answers', () => AnswerFactory)
  .build()
