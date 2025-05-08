import { Head, router } from '@inertiajs/react'
import { motion } from 'motion/react'
import { useEffect } from 'react'
import GridBackground from '~/components/GridBackground'
import RoundTimer from '~/components/game/RoundTimer'
import useCountdown from '~/hooks/useCountdown'
import GameLayout from '~/layouts/GameLayout'
import PlayerCard from '~/components/game/PlayerCard'
import { usePage } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import type GameController from '#controllers/game_controller'

// Composant principal
const Start = () => {
  const handleEndTimer = () => {
    // Redirection vers la page de jeu
  }

  const { players, gameId } = usePage<InferPageProps<GameController, 'showStartGame'>>().props

  const timeSec = 20 // 5 secondes pour le compte à rebours
  const { count, reset } = useCountdown(timeSec, handleEndTimer)

  // Effet pour réinitialiser le timer si nécessaire
  useEffect(() => {
    reset()
  }, [])

  return (
    <>
      <Head title="Game Starting" />
      <div className="min-h-screen bg-gray-950 relative overflow-hidden flex flex-col">
        <GridBackground animated={true} type="game" iconsDensity={18} />

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative z-10  -mt-8 md:-mt-28">
          {/* Titre animé */}
          <motion.div
            className="text-center mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 text-shadow-lg">
              Prepare Yourself!
            </h1>
            <p className="text-base sm:text-lg text-indigo-300">The game is starting in</p>
          </motion.div>

          {/* Timer central */}
          <motion.div
            className="mb-15 md:mb-20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <RoundTimer timeLeft={count} initialTime={timeSec} />
          </motion.div>

          {/* Joueurs */}
          <div className="w-full max-w-3xl mx-auto flex justify-center items-center px-2 sm:px-4">
            <div className="flex justify-between items-center w-full md:gap-16">
              <div className="flex-1 flex justify-center md:justify-end">
                <PlayerCard player={players.currentPlayer} position="left" />
              </div>

              {/* VS au centre */}
              <motion.div
                className="flex flex-col items-center z-10 mx-2 sm:mx-4 md:mx-8 mb-12 md:mb-38"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center justify-center ">
                  <span className="text-lg sm:text-3xl md:text-4xl font-bold text-indigo-400">
                    VS
                  </span>
                </div>
              </motion.div>

              <div className="flex-1 flex justify-center md:justify-start">
                <PlayerCard player={players.opponentPlayer} position="right" />
              </div>
            </div>
          </div>

          {/* Message en bas */}
          <motion.p
            className="absolute bottom-6 text-center text-indigo-300 text-xs sm:text-sm md:text-base px-4 max-w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Prepare your mind for the intellectual battle!
          </motion.p>
        </div>
      </div>
    </>
  )
}

// Utilisation du layout de jeu
Start.layout = (page: React.ReactNode) => <GameLayout children={page} />

export default Start
