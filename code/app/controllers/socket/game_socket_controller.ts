import { Socket, Namespace } from 'socket.io'
import { roomManager } from '#services/room_manager'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'
import DraftPhases from '#enums/DraftPhases'
import Theme from '#models/theme'
import LoggerManager from '#services/logger_manager'
import Question from '#models/question'

export default class GameSocketController {
  constructor(private io: Namespace) {}

  public handleConnection(socket: Socket) {
    socket.on('joinGame', () => this.handleJoinGame(socket))
    socket.on('createPrivateGame', () => this.handleCreatePrivateGame(socket))
    socket.on('joinPrivateGame', (props) => this.handleJoinPrivateGame(socket, props))
    socket.on('getGameStatus', (props) => this.handleGameStatus(socket, props))
    socket.on('disconnect', () => this.handleDisconnect(socket))

    //Draft events
    socket.on('draftStart', (props) => this.handleDraftStart(socket, props))
    socket.on('draftTimerEnded', (props) => this.handleDraftTimerEnded(socket, props))
    socket.on('draftBan', (props) => this.handleDraftBan(socket, props))

    //Play events
    socket.on('playStart', (props) => this.handlePlayStart(socket, props))
    socket.on('newQuestion', (props) => this.handleNewQuestion(socket, props))
  }

  public handleJoinGame(socket: Socket) {
    let availableRoom = roomManager.findAvailableRoom()
    if (!availableRoom) {
      availableRoom = `gid${string.random(15)}`
      roomManager.createRoom(availableRoom)
      LoggerManager.room('No room found, created one')
    }

    roomManager.addPlayerToRoom(availableRoom, socket.data.userUuid, socket.id)
    socket.join(availableRoom)

    const room = roomManager.getRoom(availableRoom)
    if (room && room?.players.length === 2) {
      LoggerManager.room('Room found! Joined and start game')
      this.io.to(availableRoom).emit('gameStart', availableRoom)
      return
    }
  }

  public handleCreatePrivateGame(socket: Socket) {
    const roomId = `gid${string.random(15)}`
    const roomCode = string.random(6).toUpperCase()
    roomManager.createPrivateRoom(roomId, roomCode)
    LoggerManager.room(`Created a private room with code ${roomCode}`)
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
    LoggerManager.room(`Player ${socket.data.userUuid} disconnected`)
    const room = roomManager.getRoom(playerRoom)!
    if (!room.isFinished) {
      if (!room.isPrivate) {
        const user = await User.findOrFail(socket.data.userUuid)
        await user.load('statistic')
        user.statistic.elo > 540 ? (user!.statistic.elo -= 40) : null
        user.hasPenalty = true
        await user.save()
      }
      this.io.to(playerRoom).emit('playerDisconnected', {
        userUuid: socket.data.userUuid,
        isPrivateGame: room.isPrivate,
      })
    }
    roomManager.deleteRoom(playerRoom)
  }

  //Draft
  public handleDraftStart(socket: Socket, gameId: string) {
    if (!gameId) return
    const room = roomManager.getRoom(gameId)
    if (!room) return
    roomManager.startDraftPhase(gameId)
    this.io.to(gameId).emit('draftUpdate', {
      phase: room.phase,
      draftPhase: room.draftPhase,
      draftActivePlayerUuid: room.draftActivePlayerUuid,
      bannedThemes: Array.from(room.bannedThemes),
    })
  }

  public async handleDraftBan(socket: Socket, data: { gameId: string; themeId: number | null }) {
    const { gameId, themeId } = data
    if (!gameId) return
    const room = roomManager.getRoom(gameId)
    if (!room) return

    //Si l'utilisateur n'est pas le joueur qui doit jouer ou n'existe pas
    if (socket.data.userUuid !== room.draftActivePlayerUuid) return
    LoggerManager.room(`Added theme ${themeId} to banned themes`)
    const theme = await Theme.find(themeId)
    roomManager.addBannedTheme(gameId, theme)
    roomManager.switchDraftActivePlayer(gameId)
    if (room.draftPhase === DraftPhases.BAN1) {
      if (room.bannedThemes.length >= 2) {
        roomManager.setDraftPhase(gameId, DraftPhases.BAN2)
      }
    } else if (room.draftPhase === DraftPhases.BAN2) {
      if (room.bannedThemes.length >= 4) {
        roomManager.setDraftPhase(gameId, DraftPhases.COMPLETE)
      }
    }

    LoggerManager.room(room.bannedThemes)
    this.io.to(gameId).emit('draftUpdate', {
      phase: room.phase,
      draftPhase: room.draftPhase,
      draftActivePlayerUuid: room.draftActivePlayerUuid,
      bannedThemes: Array.from(room.bannedThemes),
    })

    if (room.draftPhase === DraftPhases.COMPLETE) {
      setTimeout(() => {
        roomManager.startPlayPhase(gameId)
        this.io.to(gameId).emit('draftComplete')
      }, 3000)
    }
  }

  public handleDraftTimerEnded(socket: Socket, gameId: string) {
    const room = roomManager.getRoom(gameId)
    if (!room) return
    LoggerManager.room('Timer ended')
    this.handleDraftBan(socket, { gameId, themeId: null })
  }

  //Play
  public handlePlayStart(socket: Socket, gameId: string) {
    if (!gameId) return
    const room = roomManager.getRoom(gameId)
    if (!room) return
    roomManager.startPlayPhase(gameId)
  }

  public async handleNewQuestion(socket: Socket, gameId: string) {
    const room = roomManager.getRoom(gameId)
    if (!room) return
    const bannedThemesId = room.bannedThemes
      .filter((theme) => theme !== null)
      .map((theme) => theme.id)
    const questionsId = room.questions.map((question) => question.id)
    const question = await Question.query()
      .preload('answers')
      .preload('theme')
      .preload('difficulty')
      .whereNotIn('theme_id', bannedThemesId)
      .whereNotIn('id', questionsId)
      .orderBy('random()')
      .first()

    if (!question) {
      LoggerManager.room('No question available with the filters applied')
      return
    }

    roomManager.addQuestionToRoom(gameId, question)
    const newRound = roomManager.addRound(gameId)

    let damageMultiplicator = 1.0
    if (newRound >= 3) {
      const additionnalMultiplier = Math.floor((newRound - 3) / 2) * 0.5
      damageMultiplicator = 1.0 + additionnalMultiplier
    }

    this.io.to(gameId).emit('newQuestion', {
      question,
      damageMultiplicator,
      round: newRound,
    })
  }
}
