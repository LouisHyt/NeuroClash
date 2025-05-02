import User from '#models/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import UserPresenter from '#presenters/user_presenter'

@inject()
export default class AdminController {
  constructor(protected userPresenter: UserPresenter) {}

  async showDashboard({ inertia }: HttpContext) {
    const users = await User.query().limit(5).orderBy('createdAt', 'desc').preload('statistic')
    const totalUsers = await User.query().count('*', 'total')
    return inertia.render('admin', {
      users: this.userPresenter.manyToJSON(users),
      usersCount: Number(totalUsers[0].$extras.total),
    })
  }
}
