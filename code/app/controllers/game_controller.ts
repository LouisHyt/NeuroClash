import type { HttpContext } from '@adonisjs/core/http'
import { roomManager } from '#services/room_manager'
import User from '#models/user'
import UserPresenter from '#presenters/user_presenter'
import { inject } from '@adonisjs/core'
import Theme from '#models/theme'
import ThemesPresenter from '#presenters/themes_presenter'

@inject()
export default class GameController {
  constructor(
    protected userPresenter: UserPresenter,
    protected themePresenter: ThemesPresenter
  ) {}

  private async getGlobalProps(ctx: HttpContext) {
    const { auth, params } = ctx
    const { id: gameId } = params as { id: string }
    const room = roomManager.getRoom(gameId)!

    // room can't be undefined because of auth_middleware
    await auth.user!.load('statistic')

    const opponentUserUuid = room.players.find((player) => player.uuid !== auth.user!.uuid)!.uuid
    const opponent = await User.findOrFail(opponentUserUuid)
    await opponent.load('statistic')
    return {
      gameId,
      players: {
        currentPlayer: await this.userPresenter.oneToJSON(auth.user!),
        opponentPlayer: await this.userPresenter.oneToJSON(opponent),
      },
    }
  }

  public async showStartGame(ctx: HttpContext) {
    const props = await this.getGlobalProps(ctx)

    return ctx.inertia.render('game/start', {
      ...props,
    })
  }

  public async showDraftGame(ctx: HttpContext) {
    const props = await this.getGlobalProps(ctx)
    const themes = await Theme.all()
    return ctx.inertia.render('game/draft', {
      ...props,
      themes: this.themePresenter.toJSON(themes),
    })
  }

  public async showPlayGame(ctx: HttpContext) {
    const props = await this.getGlobalProps(ctx)
    roomManager.startPlayPhase(props.gameId)
    return ctx.inertia.render('game/draft')
  }

  public showEndGame(ctx: HttpContext) {
    return ctx.inertia.render('game/draft')
  }
}
