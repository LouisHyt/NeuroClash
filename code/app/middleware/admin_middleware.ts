import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.user!
    if (!user.isAdmin) {
      return ctx.response.redirect().toRoute('home')
    }
    return next()
  }
}
