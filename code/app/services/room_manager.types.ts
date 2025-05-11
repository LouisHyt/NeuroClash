import DraftPhases from '#enums/DraftPhases'
import GamePhases from '#enums/gamePhases'
import type Question from '#models/question'
import type Theme from '#models/theme'
import type { DateTime } from 'luxon'

export type RoomPlayers = {
  uuid: string
  socketId: string
  life: number
  readyForGame: boolean
  selectedAnswer: {
    answerId: number
    timestamp: DateTime
  } | null
}

export type Phase = GamePhases.START | GamePhases.DRAFT | GamePhases.PLAY
export type DraftPhase =
  | DraftPhases.WAIT
  | DraftPhases.BAN1
  | DraftPhases.BAN2
  | DraftPhases.COMPLETE

export type RoomData = {
  players: RoomPlayers[]
  isPrivate: Boolean
  roomCode?: string
  phase: Phase
  questions: Question[]
  round: number
  isFinished: Boolean
  draftActivePlayerUuid: string
  draftPhase: DraftPhase
  bannedThemes: Array<Theme | null>
  questionTimer?: NodeJS.Timeout
}

export type Rooms = Map<string, RoomData>
