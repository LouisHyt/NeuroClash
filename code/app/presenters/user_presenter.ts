import User from '#models/user'

export default class UserPresenter {
  oneToJSON(user: User) {
    return {
      username: user.username,
      avatarUrl: user.avatarUrl,
      statistic: {
        elo: user.statistic.elo,
      },
    }
  }

  manyToJSON(users: User[]) {
    return users.map((user) => {
      return this.oneToJSON(user)
    })
  }
}
