import { Socket, Namespace } from 'socket.io'
import { roomManager } from '#services/room_manager'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'

export default class GameSocketController {
  constructor(private io: Namespace) {}

  public handleConnection(socket: Socket) {
    socket.on('joinGame', () => this.handleJoinGame(socket))
    socket.on('createPrivateGame', () => this.handleCreatePrivateGame(socket))
    socket.on('joinPrivateGame', (props) => this.handleJoinPrivateGame(socket, props))
    socket.on('getGameStatus', (props) => this.handleGameStatus(socket, props))
    socket.on('disconnect', () => this.handleDisconnect(socket))
  }

  public handleJoinGame(socket: Socket) {
    let availableRoom = roomManager.findAvailableRoom()
    if (!availableRoom) {
      availableRoom = `gid${string.random(15)}`
      roomManager.createRoom(availableRoom)
      console.log('\u001b[1;32m Room : \u001b[0m No room found, created one')
    }

    roomManager.addPlayerToRoom(availableRoom, socket.data.userUuid, socket.id)
    socket.join(availableRoom)

    const room = roomManager.getRoom(availableRoom)
    if (room && room?.players.length === 2) {
      console.log('\u001b[1;32m Room : \u001b[0m Room found! Joined and start game')
      this.io.to(availableRoom).emit('gameStart', {
        roomId: availableRoom,
      })
      return
    }
    socket.emit('roomJoined', availableRoom)
  }

  public handleCreatePrivateGame(socket: Socket) {
    const roomId = `gid${string.random(15)}`
    const roomCode = string.random(6).toUpperCase()
    roomManager.createPrivateRoom(roomId, roomCode)
    console.log(`\u001b[1;32m Room : \u001b[0m Created a private room with code ${roomCode}`)
    roomManager.addPlayerToRoom(roomId, socket.data.userUuid, socket.id)
    socket.join(roomId)
    socket.emit('privateGameCreated', roomCode)
  }

  public async handleJoinPrivateGame(socket: Socket, roomCode: string) {
    const roomId = roomManager.findPrivateRoom(roomCode)
    if (!roomId) {
      socket.emit('privateGameNotFound')
      return
    }
    const room = roomManager.getRoom(roomId)!
    const originalUser = await User.find(room.players[0].uuid)
    const newUser = await User.find(socket.data.userUuid)
    if (!originalUser || !newUser) return
    roomManager.addPlayerToRoom(roomId, socket.data.userUuid, socket.id)
    socket.join(roomId)
    this.io.to(roomId).emit('privateGameJoined', {
      gameId: roomId,
      originalUser: originalUser.username,
      newUser: newUser.username,
    })
  }

  public handleGameStatus(socket: Socket, gameId: string) {
    if (!gameId) return
    const playerRoom = roomManager.getRoom(gameId)
    this.io.to(socket.id).emit('gameStatus', playerRoom)
  }

  public async handleDisconnect(socket: Socket) {
    const playerRoom = roomManager.findPlayerRoom(socket.data.userUuid)
    if (!playerRoom) return
    console.log(`\u001b[1;32m Room : \u001b[0m Player ${socket.data.userUuid} disconnected`)
    const room = roomManager.getRoom(playerRoom)!
    if (!room.isFinished) {
      if (!room.isPrivate) {
        const user = await User.findOrFail(socket.data.userUuid)
        await user.load('statistic')
        user.statistic.elo > 540 ? (user!.statistic.elo -= 40) : null
        await user.save()
      }
      this.io.to(playerRoom).emit('playerDisconnected', {
        userUuid: socket.data.userUuid,
        isPrivateGame: room.isPrivate,
      })
    }
    roomManager.deleteRoom(playerRoom)
  }
}
