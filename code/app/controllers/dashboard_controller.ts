import StatisticPresenter from '#presenters/statistic_presenter'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import progressionPresenter from '#presenters/progression_presenter'

@inject()
export default class DashboardController {
  constructor(
    protected statisticsPresenter: StatisticPresenter,
    protected progressionPresenter: progressionPresenter
  ) {}

  async showDashboard({ inertia, auth }: HttpContext) {
    await auth.user?.load('statistic')

    return inertia.render('dashboard', {
      progression: await this.progressionPresenter.toJSON(auth.user!.statistic),
      statistics: this.statisticsPresenter.toJSON(auth.user!.statistic),
    })
  }
}
