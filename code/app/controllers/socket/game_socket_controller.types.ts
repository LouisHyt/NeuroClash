import type DraftPhases from '#enums/DraftPhases'
import type GamePhases from '#enums/gamePhases'
import Theme from '#models/theme'

export type PrivateGameJoinedType = {
  gameId: string
  originalUser: string
  newUser: string
}

export type HandleDisconnectType = {
  userUuid: string
  isPrivateGame: boolean
}

export type DraftUpdateType = {
  gameId: string
  phase: GamePhases
  draftPhase: DraftPhases
  draftActivePlayerUuid: string
  bannedThemes: Theme[]
}
