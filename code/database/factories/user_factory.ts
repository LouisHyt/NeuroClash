import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { StatisticFactory } from './statistic_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.internet.username(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
  })
  .relation('statistic', () => StatisticFactory)
  .build()
