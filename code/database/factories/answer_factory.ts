import factory from '@adonisjs/lucid/factories'
import Answer from '#models/answer'

export const AnswerFactory = factory
  .define(Answer, async ({ faker }) => {
    return {
      name: faker.lorem.words({
        min: 1,
        max: 3,
      }),
      isCorrect: false,
      slot: 0,
    }
  })
  .state('correct', (state) => {
    state.isCorrect = true
    state.name = 'Correct'
  })
  .build()
