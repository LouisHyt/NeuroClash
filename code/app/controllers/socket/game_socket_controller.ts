import { Socket, Namespace } from 'socket.io'
import { roomManager } from '#services/room_manager'
import string from '@adonisjs/core/helpers/string'
import User from '#models/user'
import DraftPhases from '#enums/DraftPhases'
import Theme from '#models/theme'
import LoggerManager from '#services/logger_manager'
import Question from '#models/question'
import StatisticManager from '#services/statistic_manager'
import type { RoomPlayer } from '#services/room_manager.types'
import type { GameEndType } from './game_socket_controller.types.js'
import RankElo from '#enums/RankElo'

export default class GameSocketController {
  constructor(private io: Namespace) {}

  public handleConnection(socket: Socket) {
    socket.on('joinGame', () => this.handleJoinGame(socket))
    socket.on('createPrivateGame', () => this.handleCreatePrivateGame(socket))
    socket.on('joinPrivateGame', (props) => this.handleJoinPrivateGame(socket, props))
    socket.on('getGameStatus', (props) => this.handleGameStatus(socket, props))
    socket.on('confirmGameStarted', (props) => this.handleConfirmGameStarted(socket, props))
    socket.on('disconnect', () => this.handleDisconnect(socket))

    //Draft events
    socket.on('draftStart', (props) => this.handleDraftStart(socket, props))
    socket.on('draftTimerEnded', (props) => this.handleDraftTimerEnded(socket, props))
    socket.on('draftBan', (props) => this.handleDraftBan(socket, props))

    //Play events
    socket.on('playStart', (props) => this.handlePlayStart(socket, props))
    socket.on('newAnswer', (props) => this.handleNewAnswer(socket, props))
  }

  public async handleJoinGame(socket: Socket) {
    let availableRoom = roomManager.findAvailableRoom()
    if (!availableRoom) {
      availableRoom = `gid${string.random(15)}`
      roomManager.createRoom(availableRoom)
      LoggerManager.room('No room found, created one')
    }

    await roomManager.addPlayerToRoom(availableRoom, socket.data.userUuid, socket.id)
    socket.join(availableRoom)

    const room = roomManager.getRoom(availableRoom)
    if (room && room?.players.length === 2) {
      LoggerManager.room('Room found! Joined and start game')
      this.io.to(availableRoom).emit('gameStart', availableRoom)
      return
    }
  }

  public async handleCreatePrivateGame(socket: Socket) {
    const roomId = `gid${string.random(15)}`
    const roomCode = string.random(6).toUpperCase()
    roomManager.createPrivateRoom(roomId, roomCode)
    LoggerManager.room(`Created a private room with code ${roomCode}`)
    await roomManager.addPlayerToRoom(roomId, socket.data.userUuid, socket.id)
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
    await roomManager.addPlayerToRoom(roomId, socket.data.userUuid, socket.id)
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

  public async handleConfirmGameStarted(socket: Socket, gameId: string) {
    const room = roomManager.getRoom(gameId)
    if (!room) return
    if (room.isPrivate) return
    await StatisticManager.updateTotalGames(socket.data.userUuid)
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
        user.statistic.elo > RankElo.BRONZE + 40
          ? (user!.statistic.elo -= 40)
          : (user!.statistic.elo = RankElo.BRONZE)
        user.hasPenalty = true
        await user.statistic.save()
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
  public handlePlayStart(socket: Socket, gameId: string): void {
    const room = roomManager.getRoom(gameId)
    if (!room) return
    roomManager.startPlayPhase(gameId)
    roomManager.setPlayerReadyForGame(gameId, socket.data.userUuid)
    if (room.players.every((player) => player.readyForGame)) {
      this.getNewQuestion(gameId)
    }
  }

  public async handleNewAnswer(socket: Socket, data: { gameId: string; answerId: number }) {
    const { gameId, answerId } = data
    const room = roomManager.getRoom(gameId)
    if (!room) return
    if (
      room.players.find((player) => player.uuid === socket.data.userUuid)?.selectedAnswer !== null
    )
      return
    roomManager.setPlayerSelectedAnswer(gameId, socket.data.userUuid, answerId)
    if (room.players.every((player) => player.selectedAnswer !== null)) {
      this.processRoundEnd(gameId)
    }
  }

  //Private methods
  private async getNewQuestion(gameId: string) {
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
      .where('is_approved', true)
      .orderByRaw('RAND()')
      .first()

    if (!question) {
      LoggerManager.room('No question available with the filters applied')
      return
    }

    roomManager.addQuestionToRoom(gameId, question)
    const newRound = roomManager.addRound(gameId)

    let damageMultiplicator = this.getDamageMultiplicator(newRound)

    this.io.to(gameId).emit('gameUpdate', {
      question,
      damageMultiplicator,
      round: newRound,
      playersLife: room.players.map((player) => ({
        uuid: player.uuid,
        life: player.life,
      })),
    })
    room.questionTimer = setTimeout(() => {
      this.processRoundEnd(gameId)
    }, 20000)
  }

  private getDamageMultiplicator(round: number): number {
    let damageMultiplicator = 1.0
    if (round >= 3) {
      const additionnalMultiplier = Math.floor((round - 3) / 2) * 0.5
      damageMultiplicator = 1.0 + additionnalMultiplier
    }
    return damageMultiplicator
  }

  private async processRoundEnd(gameId: string) {
    const room = roomManager.getRoom(gameId)
    if (!room) return
    clearTimeout(room.questionTimer)

    const multiplicator = this.getDamageMultiplicator(room.round)
    const question = room.questions[room.questions.length - 1]
    const correctAnswerId = question.answers.find((answer) => answer.isCorrect)!.id

    let winnerUuid: string | null = null
    let damages: number = 0

    const playersWithAnswers = room.players.filter((player) => player.selectedAnswer !== null)
    if (playersWithAnswers.length > 0) {
      const playersWithCorrectAnswer = playersWithAnswers.filter(
        (player) => player.selectedAnswer?.answerId === correctAnswerId
      )

      if (playersWithCorrectAnswer.length === 1) {
        winnerUuid = playersWithCorrectAnswer[0].uuid
        const loserUuid = room.players.find((player) => player.uuid !== winnerUuid)!.uuid
        if (!room.isPrivate) {
          await StatisticManager.addQuestionCorrect(winnerUuid)
          await StatisticManager.addQuestionFailed(loserUuid)
        }
        damages = roomManager.dealPlayerDamage(gameId, loserUuid, multiplicator)
      } else if (playersWithCorrectAnswer.length > 1) {
        winnerUuid =
          playersWithCorrectAnswer[0].selectedAnswer!.timestamp.valueOf() <
          playersWithCorrectAnswer[1].selectedAnswer!.timestamp.valueOf()
            ? playersWithCorrectAnswer[0].uuid
            : playersWithCorrectAnswer[1].uuid

        const loserUuid = room.players.find((player) => player.uuid !== winnerUuid)!.uuid
        if (!room.isPrivate) {
          await StatisticManager.addQuestionCorrect(winnerUuid)
          await StatisticManager.addQuestionCorrect(loserUuid)
        }
        damages = roomManager.dealPlayerDamage(gameId, loserUuid, multiplicator)
      }
    } else {
      if (room.isPrivate) return
      await StatisticManager.addQuestionFailed(room.players[0].uuid)
      await StatisticManager.addQuestionFailed(room.players[1].uuid)
    }

    for (const player of room.players) {
      roomManager.setPlayerSelectedAnswer(gameId, player.uuid, null)
    }

    const deadPlayer = roomManager.getDeadPlayer(gameId)

    this.io.to(gameId).emit('roundEnd', {
      correctAnswerId,
      winnerUuid,
      damages,
      endGame: deadPlayer ? true : false,
      playersLife: room.players.map((player) => ({
        uuid: player.uuid,
        life: player.life,
      })),
    })

    setTimeout(() => {
      if (deadPlayer) {
        this.processGameEnd(gameId, deadPlayer)
        return
      }

      this.getNewQuestion(gameId)
    }, 7000)
  }

  private async processGameEnd(gameId: string, deadPlayer: RoomPlayer) {
    const room = roomManager.getRoom(gameId)
    if (!room) return

    const winner = room.players.find((player) => player.uuid !== deadPlayer.uuid)!
    const winnerUser = {
      uuid: winner.uuid,
      username: winner.username,
      isWinner: true,
    }
    const loserUser = {
      uuid: deadPlayer.uuid,
      username: deadPlayer.username,
      isWinner: false,
    }
    if (!room.isPrivate) {
      //Update stats
      await StatisticManager.addVictory(winner.uuid)
      await StatisticManager.addLoss(deadPlayer.uuid)
      await StatisticManager.updateStreak(winner.uuid, true)
      await StatisticManager.updateStreak(deadPlayer.uuid, false)

      const eloResults = await StatisticManager.updateElo(winner.uuid, deadPlayer.uuid)
      Object.assign(winnerUser, {
        previousElo: eloResults.winnerUser.previousElo,
        updatedElo: eloResults.winnerUser.updatedElo,
      })
      Object.assign(loserUser, {
        previousElo: eloResults.loserUser.previousElo,
        updatedElo: eloResults.loserUser.updatedElo,
      })
    }
    room.isFinished = true
    const data = {
      users: [winnerUser, loserUser],
      isPrivate: room.isPrivate,
    } as GameEndType
    this.io.to(gameId).emit('gameEnd', data)
  }
}
