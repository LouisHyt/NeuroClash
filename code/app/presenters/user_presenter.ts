import User from "#models/user";

export default class UserPresenter {
  
    toJSON(user: User) {
      return {
        username: user.username,
        avatarUrl: user.avatarUrl,
        statistic: {
          elo: user.statistic.elo
        }
      }
    }
}