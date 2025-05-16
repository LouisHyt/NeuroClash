import User from '#models/user'

class StatisticManager {
  public async addVictory(userUuid: string): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    user.statistic.victories += 1
    await user.save()
  }

  public async addLoss(userUuid: string): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    user.statistic.losses += 1
    await user.save()
  }

  public async addQuestionCorrect(userUuid: string): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    user.statistic.questionsCorrect += 1
    await user.save()
  }

  public async addQuestionFailed(userUuid: string): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    user.statistic.questionsFailed += 1
    await user.save()
  }

  public async updateStreak(userUuid: string, isWinner: boolean): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    if (isWinner) {
      user.statistic.streak += 1
    } else {
      user.statistic.streak = 0
    }
    await user.save()
  }

  public async updateTotalGames(userUuid: string): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    user.statistic.totalGames += 1
    await user.save()
  }

  public async updateElo(winnerUuid: string, loserUuid: string): Promise<void> {
    const winnerUser = await User.findOrFail(winnerUuid)
    const loserUser = await User.findOrFail(loserUuid)
    await winnerUser.load('statistic')
    await loserUser.load('statistic')

    const winnerElo = winnerUser.statistic.elo
    const loserElo = loserUser.statistic.elo
  }
}

export default new StatisticManager()
