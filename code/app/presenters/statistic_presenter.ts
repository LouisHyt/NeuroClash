import Statistic from '#models/statistic'

export default class StatisticPresenter {
  private getWinRatio(statistic: Statistic) {
    if (statistic.totalGames === 0) {
      return '0'
    }
    return Math.round((statistic.victories / statistic.totalGames) * 100)
  }

  private getAveragePerformance(statistic: Statistic) {
    if (
      statistic.totalGames === 0 ||
      statistic.questionsCorrect + statistic.questionsFailed === 0
    ) {
      return '0'
    }

    return Math.round(
      (statistic.questionsCorrect / (statistic.questionsCorrect + statistic.questionsFailed)) * 100
    )
  }

  toJSON(statistic: Statistic) {
    return {
      gamesPlayed: statistic.totalGames,
      winRatio: this.getWinRatio(statistic),
      correctQuestions: statistic.questionsCorrect,
      wrongQuestions: statistic.questionsFailed,
      averagePerformance: this.getAveragePerformance(statistic),
      winStreak: statistic.streak,
    }
  }
}
