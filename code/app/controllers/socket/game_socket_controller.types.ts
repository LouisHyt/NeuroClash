import type DraftPhases from '#enums/DraftPhases'
import type GamePhases from '#enums/gamePhases'
import type Question from '#models/question'
import type Theme from '#models/theme'

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

export type GameUpdateType = {
  question: Question
  damageMultiplicator: number
  round: number
  playersLife: {
    uuid: string
    life: number
  }[]
}

export type RoundEndType = {
  correctAnswerId: number
  winnerUuid: string | null
  damages: number
  playersLife: {
    uuid: string
    life: number
  }[]
}
