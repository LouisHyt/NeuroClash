import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { roomManager } from '#services/room_manager'

export default class GameMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { id: gameId } = ctx.params as { id: string }
    const room = roomManager.getRoom(gameId)
    if (
      !room ||
      !room?.players.some((player) => player.uuid === ctx.auth.user!.uuid) ||
      room?.players.length !== 2
    ) {
      return ctx.response.redirect().toRoute('dashboard.show')
    }

    const output = await next()
    return output
  }
}
