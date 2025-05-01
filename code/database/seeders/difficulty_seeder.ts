import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Difficulty from '#models/difficulty'
import Difficulties from '#enums/Difficulties'

export default class extends BaseSeeder {
  async run() {
    await Difficulty.createMany([
      {
        id: Difficulties.EASY,
        name: 'easy',
      },
      {
        id: Difficulties.MEDIUM,
        name: 'medium',
      },
      {
        id: Difficulties.HARD,
        name: 'hard',
      },
    ])
  }
}
