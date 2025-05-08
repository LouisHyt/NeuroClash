import DraftPhases from '#enums/DraftPhases'
import GamePhases from '#enums/gamePhases'
import type Theme from '#models/theme'

export type RoomPlayers = {
  uuid: string
  socketId: string
  life: number
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
  isFinished: Boolean
  draftActivePlayerUuid: string
  draftPhase: DraftPhase
  bannedThemes: Set<Theme | null>
}

export type Rooms = Map<string, RoomData>
