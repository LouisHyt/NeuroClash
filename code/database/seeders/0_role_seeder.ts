import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import Roles from '#enums/Roles'

export default class extends BaseSeeder {
  async run() {
    await Role.createMany([
      {
        id: Roles.USER,
        name: 'User',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])
  }
}
