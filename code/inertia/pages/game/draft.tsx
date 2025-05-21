import type GameController from '#controllers/game_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head, router, usePage } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import GridBackground from '~/components/GridBackground'
import useCountdown from '~/hooks/useCountdown'
import RoundTimer from '~/components/game/RoundTimer'
import { motion, AnimatePresence } from 'motion/react'
import ThemeCard from '~/components/game/ThemeCard'
import PlayerDraftColumn from '~/components/game/PlayerDraftColumn'
import GameLayout from '~/layouts/GameLayout'
import { useGameSocketStore } from '~/stores/gameSocketStore'
import DraftPhases from '#enums/DraftPhases'
import type { DraftUpdateType } from '#controllers/socket/game_socket_controller.types'
import type { ThemeType, PlayerType, DraftPhaseType } from './draft.types'
import { tuyau } from '~/utils/api'
import HorizontalTimer from '~/components/game/HorizontalTimer'

const Draft = () => {
  const { themes, players, gameId } =
    usePage<InferPageProps<GameController, 'showDraftGame'>>().props
  const socket = useGameSocketStore((state) => state.socket)

  const [player1, setPlayer1] = useState<PlayerType>({
    ...players.currentPlayer,
    bannedThemes: [],
  })

  const [player2, setPlayer2] = useState<PlayerType>({
    ...players.opponentPlayer,
    bannedThemes: [],
  })

  const [filteredThemes, setFilteredThemes] = useState<ThemeType[]>(themes)
  const [searchQuery, setSearchQuery] = useState('')
  const [activePlayerUuid, setActivePlayerUuid] = useState<string>('')
  const [draftphase, setDraftPhase] = useState<DraftPhaseType>(DraftPhases.BAN1)
  const timeSec = 20 //

  const { count, reset } = useCountdown(timeSec, handleEndTimer)

  // If timer ends
  function handleEndTimer() {
    if (draftphase === DraftPhases.COMPLETE) return
    socket?.emit('draftTimerEnded', gameId)
  }

  const handleThemeSelect = (theme: ThemeType) => {
    if (draftphase === DraftPhases.COMPLETE) return
    const isCurrentPlayerTurn = activePlayerUuid === player1.uuid

    if (!isCurrentPlayerTurn) return

    socket?.emit('draftBan', { gameId, themeId: theme!.id })
  }

  const isThemeDisabled = (themeId: number) => {
    return (
      player1.bannedThemes.some((theme) => theme && theme.id === themeId) ||
      player2.bannedThemes.some((theme) => theme && theme.id === themeId)
    )
  }

  useEffect(() => {
    setFilteredThemes(
      themes.filter((theme) => theme.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery])

  useEffect(() => {
    socket?.emit('draftStart', gameId)
    socket?.on('draftUpdate', (data: DraftUpdateType) => {
      setDraftPhase(data.draftPhase as DraftPhaseType)
      setActivePlayerUuid(data.draftActivePlayerUuid)
      const bannedThemes = data.bannedThemes || []
      const player1Banned: (ThemeType | null)[] = []
      const player2Banned: (ThemeType | null)[] = []

      //On défini les themes bannis pour chaque joueur en fonction de leur tour
      bannedThemes.forEach((theme: ThemeType, index: number) => {
        if (index % 2 === 0) {
          player1Banned.push(theme)
        } else {
          player2Banned.push(theme)
        }
      })

      setPlayer1((prev) => ({
        ...prev,
        bannedThemes: player1Banned,
      }))

      setPlayer2((prev) => ({
        ...prev,
        bannedThemes: player2Banned,
      }))

      reset()
    })

    socket?.on('draftComplete', () => {
      router.visit(`${tuyau.$url('game.play.show', { params: { id: gameId } })}`, {
        replace: true,
        method: 'get',
      })
    })

    return () => {
      socket?.off('draftUpdate')
      socket?.off('draftComplete')
    }
  }, [socket])

  return (
    <>
      <Head title="Game Draft" />
      <div className="min-h-screen bg-gray-950 relative flex items-center md:items-start">
        <GridBackground animated={true} type="draft" iconsDensity={18} />
        <div className="relative z-10 flex-1 flex flex-col p-2 sm:p-3 md:p-4 max-w-7xl mx-auto w-full mt-0">
          {/* Title */}
          <div className="text-center mb-6 sm:mb-4 md:mb-4">
            <h1 className="text-lg md:text-xl xl:text-3xl font-bold">
              <span className="relative inline-block px-3 sm:px-4 md:px-6 py-1 sm:py-2">
                <span className="relative z-10 text-red-50">Draft Phase</span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-lg"></span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 rounded-lg opacity-75 blur-[2px]"></span>
                <span className="absolute -inset-0.5 bg-red-500 rounded-lg opacity-30 blur-[4px]"></span>
              </span>
            </h1>
            <p className="text-red-300 mt-1 sm:mt-3 text-sm font-bold sm:block hidden">
              {draftphase === DraftPhases.COMPLETE
                ? 'Draft phase over ! The game is about to begin...'
                : draftphase === DraftPhases.WAIT
                  ? 'En attente du début du draft...'
                  : `Each player must ban ${draftphase === DraftPhases.BAN1 ? 'a first' : 'a second'} theme`}
            </p>
          </div>

          {/* Main content */}
          <div className="flex flex-col flex-1 h-full gap-2">
            {/* Players */}
            <div className="flex flex-row justify-between mb-3 sm:mb-4">
              <div className="w-1/2 pr-2">
                <PlayerDraftColumn
                  player={player1}
                  isActive={
                    activePlayerUuid === player1.uuid &&
                    draftphase !== DraftPhases.COMPLETE &&
                    draftphase !== DraftPhases.WAIT
                  }
                />
              </div>

              <div className="w-1/2 pl-2">
                <PlayerDraftColumn
                  player={player2}
                  isActive={
                    activePlayerUuid === player2.uuid &&
                    draftphase !== DraftPhases.COMPLETE &&
                    draftphase !== DraftPhases.WAIT
                  }
                />
              </div>
            </div>
            <div className="w-full flex flex-col items-center flex-1">
              {draftphase !== DraftPhases.COMPLETE && draftphase !== DraftPhases.WAIT && (
                <>
                  <div className="hidden xl:block">
                    <RoundTimer timeLeft={count} initialTime={timeSec} />
                  </div>

                  <div className=" xl:hidden flex flex-col items-center mb-5 xl:mb-10 w-full">
                    <HorizontalTimer timeLeft={count} initialTime={timeSec} />
                  </div>
                </>
              )}
              {draftphase === DraftPhases.COMPLETE && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500 mb-2 sm:mb-4"
                >
                  ✓
                </motion.div>
              )}

              <div className="w-full max-w-[75vw]">
                {/* Search Bar */}
                <div className="mb-2 sm:mb-4 mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Look for a theme..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-900/80 border border-red-500/30 rounded-lg py-2 sm:py-3 px-2 sm:px-4 pl-8 sm:pl-10 text-sm sm:text-base text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      disabled={
                        draftphase === DraftPhases.COMPLETE || draftphase === DraftPhases.WAIT
                      }
                    />
                    <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-red-400">
                      🔍
                    </div>
                  </div>
                </div>

                {/* Themes List */}
                <div className="relative flex-1 grid grid-rows-[auto_1fr] overflow-hidden">
                  <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 gap-y-2 p-1 sm:p-2 auto-rows-max overflow-y-auto pr-1 max-h-[250px]">
                    <AnimatePresence mode="popLayout">
                      {filteredThemes.map((theme) => (
                        <motion.div
                          layout
                          key={theme.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ThemeCard
                            theme={theme}
                            onSelect={() => handleThemeSelect(theme)}
                            disabled={
                              isThemeDisabled(theme.id) ||
                              draftphase === DraftPhases.COMPLETE ||
                              draftphase === DraftPhases.WAIT ||
                              activePlayerUuid !== player1.uuid
                            }
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-2 sm:mt-3 md:mt-4 text-center hidden md:visible">
            <p className="text-red-300/70 text-xs sm:text-sm font-bold">
              {draftphase === DraftPhases.WAIT
                ? 'Waiting for the draft to start...'
                : draftphase === DraftPhases.COMPLETE
                  ? 'Draft over ! The game is about to begin...'
                  : 'Choose the themes to ban in 15 seconds!'}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

Draft.layout = (page: React.ReactNode) => <GameLayout children={page} />

export default Draft
