import StatisticPresenter from '#presenters/statistic_presenter'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import progressionPresenter from '#presenters/progression_presenter'
import User from '#models/user'
import FlashKeys from '#enums/Flashes'

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

  async handleDashboardDisconnected(ctx: HttpContext) {
    const userUuid = ctx.request.input('userUuid')
    const isPrivateGame = ctx.request.input('isPrivateGame')
    if (!userUuid) return ctx.response.redirect().toRoute('dashboard.show')
    const user = await User.find(userUuid)
    if (!user) return ctx.response.redirect().toRoute('dashboard.show')

    if (isPrivateGame) {
      ctx.session.flash(FlashKeys.ERROR, {
        W_USER_DISCONNECTED: `${user.username} disconnected. The game has been stopped`,
      })
    } else {
      ctx.session.flash(FlashKeys.ERROR, {
        W_USER_DISCONNECTED: `${user.username} disconnected. The game has been stopped. ${user.username} has lost points as a warning`,
      })
    }

    return ctx.response.redirect().toRoute('dashboard.show')
  }
}
