import StatisticPresenter from '#presenters/statistic_presenter'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class DashboardController {
  constructor(protected statisticsPresenter: StatisticPresenter) {}

  async showDashboard({ inertia, auth }: HttpContext) {
    await auth.user?.load('statistic')

    return inertia.render('dashboard', {
      progression: {},
      statistics: this.statisticsPresenter.toJSON(auth.user!.statistic),
    })
  }
}
