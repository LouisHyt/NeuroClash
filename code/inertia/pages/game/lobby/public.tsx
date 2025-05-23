import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import LobbyBackground from '~/components/game/LobbyBackground'
import { Head, router } from '@inertiajs/react'
import LobbyLoader from '~/components/game/LobbyLoader'
import DidYouKnow from '~/components/game/DidYouKnow'
import GameLayout from '~/layouts/GameLayout'
import { useGameSocketStore } from '~/stores/gameSocketStore'
import { Link } from '@tuyau/inertia/react'
import { tuyau } from '~/utils/api'

const GameLobby = () => {
  const [searchTime, setSearchTime] = useState(0)
  const [searchStatus, setSearchStatus] = useState<'searching' | 'found' | 'error'>('searching')
  const [statusMessage, setStatusMessage] = useState('Looking for a game...')

  const socket = useGameSocketStore((state) => state.socket)

  //Wait before looking for a game
  useEffect(() => {
    if (!socket) return

    let searchTimeout: NodeJS.Timeout
    let startGameTimeout: NodeJS.Timeout

    searchTimeout = setTimeout(() => {
      socket?.emit('joinGame')
    }, 7000)

    socket?.on('gameStart', (gameId: string) => {
      setSearchStatus('found')
      setStatusMessage('Game found!')
      startGameTimeout = setTimeout(() => {
        router.visit(`${tuyau.$url('game.start.show', { params: { id: gameId } })}`, {
          replace: true,
          method: 'get',
        })
      }, 4000)
    })

    return () => {
      clearTimeout(searchTimeout)
      clearTimeout(startGameTimeout)
    }
  }, [socket])

  // Wait before looking for a game & Update timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (searchStatus === 'searching') {
      interval = setInterval(() => {
        setSearchTime((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Head title="Public Lobby" />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <LobbyBackground />

        {/* Contenu principal */}
        <div className="text-center z-10 max-w-md w-full mb-24 sm:mb-16">
          <h1 className="text-3xl xl:text-4xl font-bold text-white mb-2 text-shadow-lg">
            <span>Neuro</span>
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 text-transparent bg-clip-text">
              Clash
            </span>
          </h1>
          <h2 className="text-lg xl:text-2xl text-indigo-300 mb-12">Public lobby</h2>

          <div className="flex flex-col items-center mb-5 xl:mb-8">
            <LobbyLoader />
            <motion.p
              className="text-lg xl:text-2xl font-medium text-white mb-2 sm:mb-3"
              key={statusMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {statusMessage}
            </motion.p>

            {searchStatus === 'searching' ? (
              <p className="text-indigo-300 text-base sm:text-lg">
                Time spent: <span className="font-mono">{searchTime}s</span>
              </p>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="text-indigo-300 text-base sm:text-lg"
              >
                You'll be redirected in a few seconds...
              </motion.p>
            )}

            {/* Indicateurs de recherche */}
            {searchStatus === 'searching' && (
              <div className="flex gap-3 mt-6">
                <motion.div
                  className="w-3 h-3 rounded-full bg-indigo-500"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full bg-indigo-500"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="w-3 h-3 rounded-full bg-indigo-500"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                />
              </div>
            )}
          </div>

          {/* Cancel buttons */}
          {searchStatus === 'searching' && (
            <Link
              route="dashboard.show"
              className="py-3 px-6 sm:py-4 sm:px-8 inline-block bg-gray-900/60 hover:scale-105 transition-all hover:bg-gray-800/80 text-white font-medium rounded-lg border border-indigo-500/30 backdrop-blur-sm text-sm xl:text-base"
            >
              Cancel search
            </Link>
          )}
        </div>

        {/* Fun facts */}
        <DidYouKnow />
      </div>
    </>
  )
}

GameLobby.layout = (page: React.ReactNode) => <GameLayout children={page} />

export default GameLobby
