export type RoomPlayers = {
  uuid: string
  socketId: string
}

export type RoomData = {
  players: RoomPlayers[]
  isPrivate: Boolean
  roomCode?: string
  bannedThemes: Set<string>
}

export type Rooms = Map<string, RoomData>
