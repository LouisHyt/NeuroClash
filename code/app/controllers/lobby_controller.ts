import type { HttpContext } from '@adonisjs/core/http'

export default class LobbyController {
  showPublic(ctx: HttpContext) {
    return ctx.inertia.render('game/lobby/public')
  }

  showCreatePrivate(ctx: HttpContext) {
    return ctx.inertia.render('game/lobby/createPrivate')
  }

  showJoinPrivate(ctx: HttpContext) {
    return ctx.inertia.render('game/lobby/joinPrivate')
  }
}
