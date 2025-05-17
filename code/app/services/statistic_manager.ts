import User from '#models/user'
import RankElo from '#enums/RankElo'

class StatisticManager {
  public async addVictory(userUuid: string): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    user.statistic.victories += 1
    await user.statistic.save()
  }

  public async addLoss(userUuid: string): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    user.statistic.losses += 1
    await user.statistic.save()
  }

  public async addQuestionCorrect(userUuid: string): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    user.statistic.questionsCorrect += 1
    await user.statistic.save()
  }

  public async addQuestionFailed(userUuid: string): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    user.statistic.questionsFailed += 1
    await user.statistic.save()
  }

  public async updateStreak(userUuid: string, isWinner: boolean): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    if (isWinner) {
      user.statistic.streak += 1
    } else {
      user.statistic.streak = 0
    }
    await user.statistic.save()
  }

  public async updateTotalGames(userUuid: string): Promise<void> {
    const user = await User.findOrFail(userUuid)
    await user.load('statistic')
    user.statistic.totalGames += 1
    await user.statistic.save()
  }

  public async updateElo(winnerUuid: string, loserUuid: string) {
    const winnerUser = await User.findOrFail(winnerUuid)
    const loserUser = await User.findOrFail(loserUuid)
    await winnerUser.load('statistic')
    await loserUser.load('statistic')

    const K = 40
    const MIN_CHANGE = 3

    const initialWinnerElo = winnerUser.statistic.elo
    const initialLoserElo = loserUser.statistic.elo

    const expectedWinner = this.getExpectedResult(initialWinnerElo, initialLoserElo)
    const expectedLoser = this.getExpectedResult(initialLoserElo, initialWinnerElo)

    let eloPointsWinner = Math.round(K * (1 - expectedWinner))
    let eloPointsLoser = Math.round(K * (0 - expectedLoser))

    if (eloPointsWinner === 0) {
      eloPointsWinner = MIN_CHANGE
    }

    if (eloPointsLoser === 0) {
      eloPointsLoser = -MIN_CHANGE
    }

    let newWinnerElo = initialWinnerElo + eloPointsWinner
    let newLoserElo = initialLoserElo + eloPointsLoser

    if (newLoserElo < RankElo.BRONZE) newLoserElo = RankElo.BRONZE

    winnerUser.statistic.elo = newWinnerElo
    loserUser.statistic.elo = newLoserElo

    await winnerUser.statistic.save()
    await loserUser.statistic.save()

    return {
      winnerUser: {
        uuid: winnerUser.uuid,
        previousElo: initialWinnerElo,
        updatedElo: newWinnerElo,
      },
      loserUser: {
        uuid: loserUser.uuid,
        previousElo: initialLoserElo,
        updatedElo: newLoserElo,
      },
    }
  }

  private getExpectedResult(elo1: number, elo2: number) {
    return 1 / (1 + Math.pow(10, (elo2 - elo1) / 400))
  }
}

export default new StatisticManager()
