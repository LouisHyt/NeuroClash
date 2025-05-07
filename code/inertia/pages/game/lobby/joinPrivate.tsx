import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import LobbyBackground from '~/components/game/LobbyBackground'
import { Head } from '@inertiajs/react'
import LobbyLoader from '~/components/game/LobbyLoader'
import DidYouKnow from '~/components/game/DidYouKnow'
import GameLayout from '~/layouts/GameLayout'
import { useGameSocketStore } from '~/stores/gameSocketStore'
import { Link } from '@tuyau/inertia/react'
import { FiCopy, FiCheck } from 'react-icons/fi'

const JoinPrivate = () => {
  const [searchStatus, setSearchStatus] = useState<'searching' | 'found' | 'error'>('searching')
  const [statusMessage, setStatusMessage] = useState('Waiting for a player to join...')
  const [gameCode, setGameCode] = useState('')

  const socket = useGameSocketStore((state) => state.socket)

  useEffect(() => {
    socket?.on('privateGameNotFound', () => {
      console.log('no room found')
    })

    socket?.on('gameStart', ({ gameId }: { gameId: string }) => {
      console.log(gameId)
    })
  }, [socket])

  const handleJoinGame = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()
    socket?.emit('joinPrivateGame', gameCode)
  }

  return (
    <>
      <Head title="Public Lobby" />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <LobbyBackground />

        {/* Contenu principal */}
        <div className="text-center z-10 max-w-md w-full mb-32 sm:mb-24">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 text-shadow-lg">
            NeuroClash
          </h1>
          <h2 className="text-lg md:text-2xl text-indigo-300 mb-12">Private lobby</h2>

          <div className="flex flex-col items-center mb-8 sm:mb-12">
            <LobbyLoader />
            <motion.p
              className="text-xl sm:text-2xl font-medium text-white mb-2 sm:mb-3"
              key={statusMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {statusMessage}
            </motion.p>
          </div>

          <form onSubmit={handleJoinGame} className="mb-6">
            <div className="mb-4">
              <input
                type="text"
                name="gameCode"
                placeholder="Enter game code"
                className="w-full py-3 px-4 bg-gray-900/60 text-white placeholder-gray-400 rounded-lg border border-indigo-500/30 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm sm:text-base"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
                required
              />
            </div>
          </form>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {searchStatus === 'searching' && (
              <>
                <button
                  type="button"
                  onClick={handleJoinGame}
                  className="cursor-pointer py-3 px-6 sm:py-4 sm:px-8 inline-block bg-indigo-600 transition-all hover:bg-indigo-700 text-white font-medium rounded-lg border border-indigo-500/30 backdrop-blur-sm text-sm sm:text-base w-full sm:w-auto"
                >
                  Join
                </button>
                <Link
                  route="dashboard.show"
                  className="py-3 px-6 sm:py-4 sm:px-8 inline-block bg-gray-900/60 transition-all hover:bg-gray-800/80 text-white font-medium rounded-lg border border-indigo-500/30 backdrop-blur-sm text-sm sm:text-base w-full sm:w-auto"
                >
                  Cancel
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Fun facts - position absolue pour éviter de cacher le bouton Cancel */}
        <div className="absolute bottom-4 left-0 right-0 z-0">
          <DidYouKnow />
        </div>
      </div>
    </>
  )
}

JoinPrivate.layout = (page: React.ReactNode) => <GameLayout children={page} />

export default JoinPrivate
