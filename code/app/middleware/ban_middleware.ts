import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class BanMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const user = ctx.auth.user!
    if (user.bannedUntil) {
      return ctx.response.redirect().toRoute('ban.show')
    }

    return next()
  }
}
