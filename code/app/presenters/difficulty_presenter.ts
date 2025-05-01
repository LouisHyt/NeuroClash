import Difficulty from '#models/difficulty'

export default class DifficultiesPresenter {
  toJSON(difficulties: Difficulty[]) {
    return difficulties.map((difficulty) => ({
      id: difficulty.id,
      name: difficulty.name,
    }))
  }
}
