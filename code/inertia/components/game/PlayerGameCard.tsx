import type { PlayerType } from '~/pages/game/play.types'
import HealthBar from './HealthBar'
import { AnimatePresence, motion } from 'motion/react'

const PlayerCard = ({
  player,
  isLeft,
  mainLayout = false,
  winnerUuid,
  damages,
}: {
  player: PlayerType
  isLeft: boolean
  mainLayout?: boolean
  winnerUuid: string | null
  damages: number
}) => {
  return (
    <div
      className={`flex items-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 
        ${isLeft ? 'flex-row' : 'flex-row-reverse'}
        ${mainLayout && 'gap-3'}
      `}
    >
      {/* Avatar avec effet de brillance */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-fuchsia-500 rounded-full blur-md opacity-70"></div>
        <img
          src={player.avatarUrl}
          alt={player.username}
          className={`${
            mainLayout ? 'w-14 h-14' : 'w-10 h-10'
          } xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-indigo-500 relative z-10 object-cover`}
        />

        {/* Badge ELO */}
        <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 bg-gray-900 px-1 sm:px-2 py-0.5 rounded text-[10px] xs:text-xs font-bold text-indigo-300 border border-indigo-500/30 z-20">
          {player.statistic.elo}
        </div>
        <AnimatePresence mode="wait">
          {winnerUuid && winnerUuid === player.uuid && (
            <motion.p
              key={1}
              className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 text-white bg-green-400/50 rounded-md py-1 px-2 text-xs md:text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              Winner
            </motion.p>
          )}
          {winnerUuid && winnerUuid !== player.uuid && (
            <motion.p
              key={2}
              className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 text-white bg-red-400/50 rounded-md py-1 px-2 text-xs md:text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              Loser
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className={`flex flex-col ${isLeft ? 'items-start' : 'items-end'} flex-1`}>
        {/* Nom du joueur */}
        <h3 className="text-sm xs:text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1">
          {player.username}
        </h3>

        {/* Barre de vie avec valeur */}
        <div className="w-full flex flex-col gap-0.5 sm:gap-1">
          <div className="relative w-full flex items-center gap-1 sm:gap-2">
            <HealthBar life={player.life} />
            <AnimatePresence>
              {winnerUuid && winnerUuid !== player.uuid && (
                <motion.p
                  key={damages}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -bottom-9 right-0 -translate-y-1/2 text-sm text-red-800/90 font-bold"
                >
                  -{damages} HP
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'} w-full`}>
            <span className="text-indigo-300 font-bold text-xs sm:text-sm">
              {player.life} / 100 HP
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
