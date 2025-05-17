import type GameController from '#controllers/game_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head, router, usePage } from '@inertiajs/react'
import { AnimatePresence, motion } from 'motion/react'
import GridBackground from '~/components/GridBackground'
import VisualEffects from '~/components/game/VisualEffect'
import type { PlayerType, QuestionType } from './play.types'
import { useEffect, useState } from 'react'
import PlayerGameCard from '~/components/game/PlayerGameCard'
import { useGameSocketStore } from '~/stores/gameSocketStore'
import useCountdown from '~/hooks/useCountdown'
import QuestionPanel from '~/components/game/QuestionPanel'
import type {
  GameEndType,
  GameUpdateType,
  RoundEndType,
} from '#controllers/socket/game_socket_controller.types'
import GameLayout from '~/layouts/GameLayout'
import { tuyau } from '~/utils/api'

const Play = () => {
  const { players, gameId } = usePage<InferPageProps<GameController, 'showPlayGame'>>().props
  const socket = useGameSocketStore((state) => state.socket)

  //States
  const [player1, setPlayer1] = useState<PlayerType>({
    ...players.currentPlayer,
    life: 100,
  })
  const [player2, setPlayer2] = useState<PlayerType>({
    ...players.opponentPlayer,
    life: 100,
  })
  const [round, setRound] = useState<number>(1)
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>(null)
  const [damageMultiplier, setDamageMultiplier] = useState<number>(1)
  const [waitForPlayer, setWaitForPlayer] = useState<boolean>(true)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [gameEnded, setGameEnded] = useState<boolean>(false)

  const [correctAnswerId, setCorrectAnswerId] = useState<number | null>(null)
  const [winnerUuid, setWinnerUuid] = useState<string | null>(null)
  const [damages, setDamages] = useState<number>(0)

  const timeToAnswer = 20
  const { count: timeLeft, reset } = useCountdown(timeToAnswer, () => {})

  const handleAnswer = (answerId: number) => {
    if (selectedAnswer) return
    setSelectedAnswer(answerId)
    socket?.emit('newAnswer', { gameId, answerId })
  }

  //UseEffects
  useEffect(() => {
    socket?.emit('playStart', gameId)

    socket?.on('gameUpdate', (data: GameUpdateType) => {
      const { question, damageMultiplicator, round, playersLife } = data
      setSelectedAnswer(null)
      setWaitForPlayer(false)
      setCorrectAnswerId(null)
      setWinnerUuid(null)
      setDamages(0)
      setCurrentQuestion(question)
      setDamageMultiplier(damageMultiplicator)
      setRound(round)
      playersLife.forEach((playerLife) => {
        if (playerLife.uuid === player1.uuid) {
          setPlayer1({ ...player1, life: playerLife.life })
        } else if (playerLife.uuid === player2.uuid) {
          setPlayer2({ ...player2, life: playerLife.life })
        }
      })
      reset()
    })

    socket?.on('roundEnd', (data: RoundEndType) => {
      const { correctAnswerId, winnerUuid, damages, playersLife, endGame } = data
      setGameEnded(endGame)
      setCorrectAnswerId(correctAnswerId)
      setWinnerUuid(winnerUuid)
      setDamages(damages)
      for (const player of playersLife) {
        if (player.uuid === player1.uuid) {
          setPlayer1({ ...player1, life: player.life })
        } else if (player.uuid === player2.uuid) {
          setPlayer2({ ...player2, life: player.life })
        }
      }
    })

    socket?.on('gameEnd', (gameData: GameEndType) => {
      router.visit(tuyau.$url('game.end.handle'), {
        method: 'post',
        data: gameData,
        replace: true,
      })
    })

    return () => {
      socket?.off('gameUpdate')
      socket?.off('roundEnd')
      socket?.off('gameEnd')
    }
  }, [socket])

  return (
    <>
      <Head title="Gameplay" />
      <div className="h-screen bg-gray-950 relative overflow-hidden flex flex-col">
        <GridBackground animated={true} type="game" />
        <VisualEffects />
        <div className="relative z-10 flex-1 flex flex-col p-2 xs:p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto w-full">
          {waitForPlayer ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-2xl font-bold text-gray-400">Waiting for player...</p>
            </div>
          ) : (
            <>
              {/* En-tête avec les joueurs et leurs barres de vie */}
              <div className="flex flex-col gap-5 lg:flex-row md:gap-2 justify-between mb-3 sm:mb-6 lg:mb-8">
                <div className="lg:block hidden flex-1 w-full px-5 max-w-[500px]">
                  <PlayerGameCard
                    player={player1}
                    isLeft={true}
                    winnerUuid={winnerUuid}
                    damages={damages}
                  />
                </div>

                {/* Versus au centre */}
                <div className="justify-center items-center gap-5 hidden lg:flex text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold z-10">
                  <div className="h-0.5 w-30 bg-gradient-to-l from-fuchsia-800/70 to-indigo-800/0 rounded-md" />
                  <div className="flex flex-col items-center gap-1 translate-y-3">
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-indigo-500">
                      VS
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={round}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm text-gray-400 font-normal"
                      >
                        Round {round}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="h-0.5 w-30 bg-gradient-to-l from-indigo-800/0 to-fuchsia-800/70 rounded-md" />
                </div>

                <div className="flex-1 w-full max-w-[500px] px-5 hidden lg:block">
                  <PlayerGameCard
                    player={player2}
                    isLeft={false}
                    winnerUuid={winnerUuid}
                    damages={damages}
                  />
                </div>
                <div className="flex-1 w-full max-w-[500px] px-5 block lg:hidden mt-2 lg:mt-0">
                  <PlayerGameCard
                    player={player2}
                    isLeft={true}
                    winnerUuid={winnerUuid}
                    damages={damages}
                  />
                </div>
              </div>

              {/* Question et réponses */}
              <div className="flex-1 flex flex-col justify-center p-3">
                {currentQuestion && (
                  <QuestionPanel
                    question={currentQuestion}
                    timeLeft={timeLeft}
                    maxTime={timeToAnswer}
                    damageMultiplier={damageMultiplier}
                    handleAnswer={handleAnswer}
                    selectedAnswer={selectedAnswer}
                    correctAnswerId={correctAnswerId}
                    gameEnded={gameEnded}
                  />
                )}
              </div>

              <div className="lg:hidden block w-full px-5 max-w-[500px] mb-4">
                <PlayerGameCard
                  player={player1}
                  isLeft={true}
                  mainLayout={true}
                  winnerUuid={winnerUuid}
                  damages={damages}
                />
              </div>

              {/* Pied de page avec informations supplémentaires */}
              <div className="mt-2 block lg:hidden sm:mt-4 md:mt-6 lg:mt-8 text-center text-indigo-300/70 text-xs sm:text-sm">
                <p>
                  NeuroClash -{' '}
                  <AnimatePresence mode="wait">
                    <motion.span
                      className="inline-block"
                      key={round}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                    >
                      Round {round}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

Play.layout = (page: React.ReactNode) => <GameLayout children={page} />

export default Play
