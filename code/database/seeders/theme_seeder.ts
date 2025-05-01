import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Theme from '#models/theme'

export default class extends BaseSeeder {
  async run() {
    await Theme.createMany([
      {
        name: 'Science',
      },
      {
        name: 'History',
      },
      {
        name: 'Literature',
      },
      {
        name: 'Art',
      },
      {
        name: 'Sports',
      },
      {
        name: 'Technology',
      },
      {
        name: 'Video Games',
      },
      {
        name: 'Manga & Anime',
      },
      {
        name: 'Cinema',
      },
      {
        name: 'TV Shows & Series',
      },
    ])
  }
}
