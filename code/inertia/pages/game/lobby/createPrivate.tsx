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
import type { PrivateGameJoinedType } from '#controllers/socket/game_socket_controller.types'

const CreatePrivate = () => {
  const [searchTime, setSearchTime] = useState(0)
  const [searchStatus, setSearchStatus] = useState<'searching' | 'found' | 'error'>('searching')
  const [statusMessage, setStatusMessage] = useState('Waiting for a player to join...')
  const [gameCode, setGameCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const socket = useGameSocketStore((state) => state.socket)

  // Wait before looking for a game & Update timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (searchStatus === 'searching') {
      interval = setInterval(() => {
        setSearchTime((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [searchTime])

  //Create private room and get code
  useEffect(() => {
    socket?.emit('createPrivateGame')
    socket?.on('privateGameCreated', (roomCode: string) => {
      setGameCode(roomCode)
    })
    socket?.on('privateGameJoined', (data: PrivateGameJoinedType) => {
      setStatusMessage(`${data.newUser} joined the game!`)
      setSearchStatus('found')
    })
  }, [socket])

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

          <div className="flex flex-col items-center">
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

            {searchStatus === 'searching' ? (
              <>
                <p className="text-indigo-300 text-base sm:text-lg mb-6">
                  Time spent: <span className="font-mono">{searchTime}s</span>
                </p>

                {gameCode ? (
                  <motion.div
                    className="w-full max-w-xs bg-gray-800/70 backdrop-blur-sm rounded-lg border border-indigo-500/30 p-6 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col">
                      <p className="text-indigo-200 text-sm mb-2">Game code :</p>
                      <div className="flex items-center justify-between gap-3 bg-gray-900/60 rounded p-2">
                        <span className="font-mono text-white text-lg font-semibold pl-2">
                          {gameCode}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(gameCode)
                            setCopied(true)
                            setTimeout(() => setCopied(false), 2000)
                          }}
                          className="p-2 text-indigo-300 hover:text-white transition-colors rounded-md hover:bg-gray-800/50"
                          title="Copier le code"
                        >
                          {copied ? (
                            <FiCheck className="h-5 w-5" />
                          ) : (
                            <FiCopy className="h-5 w-5 cursor-pointer" />
                          )}
                        </button>
                      </div>
                    </div>
                    <p className="text-indigo-300/80 text-xs mt-2">
                      Share this code with a friend to join your game
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    className="w-full max-w-xs bg-gray-800/70 backdrop-blur-sm rounded-lg border border-indigo-500/30 p-6 mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-indigo-200 text-sm text-center">Generating game code...</p>
                  </motion.div>
                )}
              </>
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
          </div>

          {/* Cancel buttons */}
          {searchStatus === 'searching' && (
            <Link
              route="dashboard.show"
              className="py-3 px-6 sm:py-4 sm:px-8 inline-block bg-gray-900/60 hover:scale-105 transition-all hover:bg-gray-800/80 text-white font-medium rounded-lg border border-indigo-500/30 backdrop-blur-sm text-sm sm:text-base"
            >
              Cancel
            </Link>
          )}
        </div>

        {/* Fun facts - position absolue pour éviter de cacher le bouton Cancel */}
        <div className="absolute bottom-4 left-0 right-0 z-0">
          <DidYouKnow />
        </div>
      </div>
    </>
  )
}

CreatePrivate.layout = (page: React.ReactNode) => <GameLayout children={page} />

export default CreatePrivate
