import User from '#models/user'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class UserPresenter {
  oneToJSON(user: User) {
    return {
      username: user.username,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      statistic: {
        elo: user.statistic.elo,
      },
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
