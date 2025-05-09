// app/services/room_manager.ts
import type { DraftPhase, RoomData, Rooms } from '#services/room_manager.types'
import DraftPhases from '#enums/DraftPhases'
import GamePhases from '#enums/gamePhases'
import Theme from '#models/theme'

class RoomManager {
  private static instance: RoomManager
  private rooms: Rooms = new Map()

  private constructor() {}

  public static getInstance(): RoomManager {
    if (!RoomManager.instance) {
      RoomManager.instance = new RoomManager()
    }
    return RoomManager.instance
  }

  public getRoom(roomId: string): RoomData | undefined {
    return this.rooms.get(roomId)
  }

  public getAllRooms(): Rooms {
    return this.rooms
  }

  public createRoom(roomId: string): RoomData {
    const newRoom: RoomData = {
      players: [],
      isPrivate: false,
      isFinished: false,
      questions: [],
      round: 0,
      draftActivePlayerUuid: '',
      draftPhase: DraftPhases.WAIT,
      phase: GamePhases.START,
      bannedThemes: [],
    }
    this.rooms.set(roomId, newRoom)
    return newRoom
  }

  public createPrivateRoom(roomId: string, roomCode: string): RoomData {
    const newRoom: RoomData = {
      players: [],
      isPrivate: true,
      roomCode: roomCode,
      isFinished: false,
      questions: [],
      round: 0,
      draftPhase: DraftPhases.WAIT,
      draftActivePlayerUuid: '',
      phase: GamePhases.START,
      bannedThemes: [],
    }
    this.rooms.set(roomId, newRoom)
    return newRoom
  }

  public deleteRoom(roomId: string): boolean {
    return this.rooms.delete(roomId)
  }

  public addPlayerToRoom(roomId: string, playerUuid: string, playerSocketId: string): boolean {
    const room = this.rooms.get(roomId)
    if (room) {
      room.players.push({ uuid: playerUuid, socketId: playerSocketId, life: 100 })
      return true
    }
    return false
  }

  public removePlayerFromRoom(roomId: string, playerUuid: string): boolean {
    const room = this.rooms.get(roomId)
    if (room) {
      const initialLength = room.players.length
      room.players.filter((player) => player.uuid !== playerUuid)
      return room.players.length < initialLength
    }
    return false
  }

  public findAvailableRoom(): string | null {
    for (const [roomId, roomData] of this.rooms.entries()) {
      if (roomData.players.length < 2) {
        return roomId
      }
    }
    return null
  }

  public findPlayerRoom(playerUuid: string): string | null {
    for (const [roomId, roomData] of this.rooms.entries()) {
      if (roomData.players.some((player) => player.uuid === playerUuid)) {
        return roomId
      }
    }
    return null
  }

  public findPrivateRoom(roomCode: string): string | null {
    for (const [roomId, roomData] of this.rooms.entries()) {
      if (roomData.roomCode === roomCode && roomData.players.length < 2) {
        return roomId
      }
    }
    return null
  }

  // Draft Phase
  public startDraftPhase(roomId: string): void {
    const room = this.rooms.get(roomId)
    if (!room) return
    room.phase = GamePhases.DRAFT
    room.draftPhase = DraftPhases.BAN1
    room.draftActivePlayerUuid = room.players[0].uuid
  }

  public setDraftPhase(roomId: string, nextPhase: DraftPhase): void {
    const room = this.rooms.get(roomId)
    if (!room) return
    room.draftPhase = nextPhase
  }

  public getDraftActivePlayer(roomId: string): string | null {
    const room = this.rooms.get(roomId)
    if (!room) return null
    return room.players.find((user) => user.uuid === room.draftActivePlayerUuid)!.uuid
  }

  public switchDraftActivePlayer(roomId: string): void {
    const room = this.rooms.get(roomId)
    if (!room) return
    const nextPlayer = room.players.find((user) => user.uuid !== room.draftActivePlayerUuid)
    room.draftActivePlayerUuid = nextPlayer!.uuid
  }

  public addBannedTheme(roomId: string, themeId: Theme | null): void {
    const room = this.rooms.get(roomId)
    if (!room) return
    room.bannedThemes.push(themeId)
  }

  //Play phase
  public startPlayPhase(roomId: string): void {
    const room = this.rooms.get(roomId)
    if (!room) return
    room.phase = GamePhases.PLAY
  }
}

export const roomManager = RoomManager.getInstance()
