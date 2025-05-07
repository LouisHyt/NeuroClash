export type PrivateGameJoinedType = {
  gameId: string
  originalUser: string
  newUser: string
}

export type HandleDisconnectType = {
  userUuid: string
  isPrivateGame: boolean
}
