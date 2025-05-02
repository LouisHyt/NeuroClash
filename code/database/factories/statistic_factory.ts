import factory from '@adonisjs/lucid/factories'
import { UserFactory } from './user_factory.js'
import Statistic from '#models/statistic'

export const StatisticFactory = factory
  .define(Statistic, async ({ faker }) => {
    return {
      elo: faker.number.int({ min: 500, max: 2300 }),
    }
  })
  .relation('user', () => UserFactory)
  .build()
