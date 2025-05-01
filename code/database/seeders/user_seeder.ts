import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Roles from '#enums/Roles'
import Statistic from '#models/statistic'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      roleId: Roles.ADMIN,
      username: 'Louis',
      email: 'louis@neuroclash.com',
      password: '123456789',
      bio: "Watch out! I'm the admin of this website",
    }).then(async (user) => {
      await Statistic.create({ userUuid: user.uuid })
    })
  }
}
