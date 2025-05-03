import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import UserPresenter from '#presenters/user_presenter'
import User from '#models/user'

@inject()
export default class AdminController {
  constructor(protected userPresenter: UserPresenter) {}

  async showDashboard({ inertia }: HttpContext) {
    const totalUsers = await User.query().count('*', 'total')
    return inertia.render('admin', {
      usersCount: Number(totalUsers[0].$extras.total),
    })
  }
}
