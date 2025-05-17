import { Head, router, usePage } from '@inertiajs/react'
import GridBackground from '~/components/GridBackground'
import { motion, AnimatePresence, useSpring, useTransform } from 'motion/react'
import { useEffect, useState } from 'react'
import { FaGamepad } from 'react-icons/fa6'
import { RiDashboard3Fill } from 'react-icons/ri'
import type { InferPageProps, SharedProps } from '@adonisjs/inertia/types'
import type GameController from '#controllers/game_controller'
import { tuyau } from '~/utils/api'

const End = () => {
  const { gameData } = usePage<InferPageProps<GameController, 'showEndGame'>>().props
  const { user: userProps } = usePage<SharedProps>().props
  const user = userProps!

  const currentUser = gameData.users.find((gameDataUser) => gameDataUser.uuid === user.uuid)!
  const opponentUser = gameData.users.find((gameDataUser) => gameDataUser.uuid !== user.uuid)!
  const isPrivate = gameData.isPrivate

  const [eloAnimationStarted, setEloAnimationStarted] = useState(false)

  const currentEloSpring = useSpring(currentUser.previousElo || 0, {
    mass: 0.8,
    stiffness: 35,
    damping: 15,
    restDelta: 0.001,
  })

  const currentElo = useTransform(currentEloSpring, (current) =>
    Math.round(current).toLocaleString()
  )

  useEffect(() => {
    let displayDelay: NodeJS.Timeout

    if (!currentUser.updatedElo) return
    displayDelay = setTimeout(() => {
      currentEloSpring.set(currentUser.updatedElo!)
      setEloAnimationStarted(true)
    }, 800)

    return () => {
      clearTimeout(displayDelay)
    }
  }, [])

  const handleBackToDashboard = () => {
    router.visit(tuyau.$url('dashboard.show'), {
      method: 'get',
      replace: true,
    })
  }

  const handlePlayAgain = () => {
    const url = isPrivate
      ? tuyau.$url('lobby.create-private.show')
      : tuyau.$url('lobby.public.show')
    router.visit(url, {
      method: 'get',
      replace: true,
    })
  }

  return (
    <>
      <Head title="Game summary" />
      <div className="min-h-screen bg-gray-950 relative overflow-hidden flex flex-col">
        {currentUser.isWinner ? (
          <GridBackground animated={true} type="winner" iconsDensity={18} />
        ) : (
          <GridBackground animated={true} type="loser" iconsDensity={18} />
        )}

        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative z-10 -mt-8 md:-mt-28">
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3">
              <span
                className={`text-transparent bg-clip-text ${currentUser.isWinner ? 'bg-gradient-to-r from-green-500 via-emerald-400/80 to-green-500' : 'bg-gradient-to-r from-red-500 via-rose-400/80 to-red-500'}`}
              >
                {currentUser.isWinner ? "You're the winner!" : "You've lost..."}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-indigo-300">
              {currentUser.isWinner
                ? `Congratulations, you beat ${opponentUser.username} !`
                : `${opponentUser.username} won the battle but not the war`}
            </p>
          </motion.div>

          {currentUser.previousElo && currentUser.updatedElo && (
            <motion.div
              className="mb-10 sm:mb-12 md:mb-14 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-300 mb-4">Elo updated</h2>
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <span className="text-gray-300 text-xl sm:text-2xl md:text-3xl">
                  {currentUser.previousElo}
                </span>
                <span className="text-gray-300 text-xl sm:text-2xl">→</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentUser.updatedElo}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold 
                    ${
                      !eloAnimationStarted || currentUser.updatedElo === currentUser.previousElo
                        ? 'text-gray-300 '
                        : `text-transparent bg-clip-text bg-gradient-to-r 
                        ${
                          currentUser.updatedElo > currentUser.previousElo
                            ? 'from-green-400 to-emerald-500'
                            : 'from-red-400 to-orange-500'
                        }`
                    }`}
                  >
                    {currentElo}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md">
            <motion.button
              onClick={handleBackToDashboard}
              className="cursor-pointer flex-1 bg-black/40 text-fuchsia-400 px-8 py-4 mx-5 md:mx-0 rounded-lg text-base md:text-lg font-semibold transition-colors hover:bg-black/60 border border-violet-500/20 flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <RiDashboard3Fill className="text-fuchsia-400" />
              <span>Dashboard</span>
            </motion.button>
            <motion.button
              onClick={handlePlayAgain}
              className="cursor-pointer flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-8 py-4 mx-5 md:mx-0 rounded-lg text-base md:text-lg font-semibold hover:opacity-90 transition-colors flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <FaGamepad className="text-white" />
              <span>Play again</span>
            </motion.button>
          </div>

          <motion.p
            className="absolute bottom-6 text-center text-indigo-300 text-xs sm:text-sm md:text-base px-4 max-w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Keep practicing to improve your ranking !
          </motion.p>
        </div>
      </div>
    </>
  )
}

export default End
