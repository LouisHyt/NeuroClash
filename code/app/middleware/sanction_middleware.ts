import FlashKeys from '#enums/Flashes'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class SanctionMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const user = ctx.auth.user!
    if (user.bannedUntil) {
      return ctx.response.redirect().toRoute('ban.show')
    }

    if (user.hasPenalty) {
      ctx.session.flash(FlashKeys.WARNING, {
        W_PENALTY: `You have lost 40 ELO points for disconnecting from an ongoing game`,
      })
      user.hasPenalty = false
      await user.save()
    }

    return next()
  }
}
