import FlashKeys from '#enums/Flashes'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { DateTime } from 'luxon'

export default class SanctionMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const user = ctx.auth.user!
    if (user.bannedUntil) {
      if (user.bannedUntil < DateTime.now()) {
        user.bannedUntil = null
        await user.save()
        return next()
      }

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
