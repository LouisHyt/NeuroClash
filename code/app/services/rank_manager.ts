import Rank from '#models/rank'

export class RankManager {
  public async getRanks() {
    return await Rank.all()
  }

  public async getPlayerRank(elo: number) {
    return await Rank.query().where('eloRequired', '<=', elo).orderBy('eloRequired', 'desc').first()
  }

  public async getNextPlayerRank(elo: number) {
    return await Rank.query().where('eloRequired', '>', elo).orderBy('eloRequired', 'asc').first()
  }
}
