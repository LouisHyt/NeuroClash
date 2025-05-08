import User from '#models/user'
import { RankManager } from '#services/rank_manager'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export default class UserPresenter {
  constructor(protected rankManager: RankManager) {}

  async oneToJSON(user: User) {
    return {
      uuid: user.uuid,
      username: user.username,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      statistic: {
        elo: user.statistic.elo,
      },
      rank: await this.rankManager.getPlayerRank(user.statistic.elo),
    }
  }

  manyToJSON(users: ModelPaginatorContract<User>) {
    return users.all().map((user) => ({
      username: user.username,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      statistic: {
        elo: user.statistic.elo,
      },
    }))
  }
}
