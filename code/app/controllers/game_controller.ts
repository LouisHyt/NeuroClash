import type { HttpContext } from '@adonisjs/core/http'
import { roomManager } from '#services/room_manager'
import User from '#models/user'
import UserPresenter from '#presenters/user_presenter'
import { inject } from '@adonisjs/core'

@inject()
export default class GameController {
  constructor(protected userPresenter: UserPresenter) {}

  public async showStartGame({ inertia, params, auth }: HttpContext) {
    const { id: gameId } = params as { id: string }
    // room can't be undefined because of game_middleware
    const room = roomManager.getRoom(gameId)!

    // room can't be undefined because of auth_middleware
    await auth.user!.load('statistic')

    const opponentUserUuid = room.players.find((player) => player.uuid !== auth.user!.uuid)!.uuid
    const opponent = await User.findOrFail(opponentUserUuid)
    await opponent.load('statistic')

    return inertia.render('game/start', {
      gameId,
      players: {
        currentPlayer: this.userPresenter.oneToJSON(auth.user!),
        opponentPlayer: this.userPresenter.oneToJSON(opponent),
      },
    })
  }
}
