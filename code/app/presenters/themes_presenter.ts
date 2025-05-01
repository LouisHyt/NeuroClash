import Theme from '#models/theme'

export default class ThemesPresenter {
  toJSON(themes: Theme[]) {
    return themes.map((theme) => ({
      id: theme.id,
      name: theme.name,
    }))
  }
}
