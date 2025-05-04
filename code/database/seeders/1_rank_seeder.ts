import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Rank from '#models/rank'

export default class extends BaseSeeder {
  async run() {
    await Rank.createMany([
      {
        name: 'Bronze',
        eloRequired: 500,
        iconUrl: '/assets/images/ranks/bronze.png',
      },
      {
        name: 'Silver',
        eloRequired: 900,
        iconUrl: '/assets/images/ranks/silver.png',
      },
      {
        name: 'Gold',
        eloRequired: 1200,
        iconUrl: '/assets/images/ranks/gold.png',
      },
      {
        name: 'Platinium',
        eloRequired: 1500,
        iconUrl: '/assets/images/ranks/platinium.png',
      },
      {
        name: 'Diamond',
        eloRequired: 1800,
        iconUrl: '/assets/images/ranks/diamond.png',
      },
      {
        name: 'Master',
        eloRequired: 2100,
        iconUrl: '/assets/images/ranks/master.png',
      },
    ])
  }
}
