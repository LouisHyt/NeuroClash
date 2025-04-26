import { RankManager } from '#services/rank_manager'
import Statistic from '#models/statistic'

export default class progressionPresenter {
  private rankManager = new RankManager()

  async toJSON(statistic: Statistic) {
    return {
      elo: statistic.elo,
      currentRank: await this.rankManager.getPlayerRank(statistic.elo),
      nextRank: await this.rankManager.getNextPlayerRank(statistic.elo),
    }
  }
}
