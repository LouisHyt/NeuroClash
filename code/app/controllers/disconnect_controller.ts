import FlashKeys from '#enums/Flashes'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class DisconnectController {
  async handlePlayerDisconnected(ctx: HttpContext) {
    return ctx.response.redirect().toRoute('dashboard.show')
  }

  async handleGameDisconnected(ctx: HttpContext) {
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
