import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import UserPresenter from '#presenters/user_presenter'

@inject()
export default class AdminController {
  constructor(protected userPresenter: UserPresenter) {}

  async showDashboard({ inertia }: HttpContext) {
    return inertia.render('admin')
  }
}
