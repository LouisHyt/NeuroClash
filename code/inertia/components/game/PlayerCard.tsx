import type GameController from '#controllers/game_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { motion } from 'motion/react'
import { FiActivity, FiUser } from 'react-icons/fi'

type PlayerCardProps = {
  player: InferPageProps<GameController, 'showStartGame'>['players']['currentPlayer']
  position: 'left' | 'right'
  displayRank?: boolean
}

const PlayerCard = ({ player, position, displayRank = true }: PlayerCardProps) => {
  const isLeft = position === 'left'

  return (
    <motion.div
      className={`flex flex-col items-center z-10`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: isLeft ? 0.2 : 0.4 }}
    >
      <div className="flex flex-col items-center h-full">
        {/* Avatar */}
        <div className="relative">
          <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-indigo-600/30 border-2 border-indigo-500/50 flex items-center justify-center">
            {player.avatarUrl ? (
              <>
                <img
                  src={player.avatarUrl}
                  alt={`${player.username} avatar`}
                  className="w-full h-full object-cover rounded-full"
                />
                {displayRank && player.rank && (
                  <img
                    src={player.rank.iconUrl}
                    alt={`${player.username} rank icon`}
                    className="absolute scale-110 scale-x-120"
                  />
                )}
              </>
            ) : (
              <FiUser className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-300" />
            )}
          </div>
        </div>

        {/* Nom et Elo */}
        <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mt-2 sm:mt-3 text-shadow-lg truncate max-w-[100px] sm:max-w-[150px] md:max-w-[200px]">
          {player.username}
        </h3>
        <div className="flex items-center gap-1 text-indigo-300 mb-1 sm:mb-2">
          <FiActivity className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm font-medium">{player.statistic.elo} ELO</span>
        </div>

        {/* Bio - Visible uniquement sur les écrans moyens et grands */}
        <div className="hidden md:block h-[80px] mt-1">
          {player.bio && (
            <motion.p
              className="text-sm text-gray-300 max-w-[250px] text-center bg-gray-800/50 backdrop-blur-sm p-2 rounded-lg border border-indigo-500/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {player.bio.length > 80 ? `${player.bio.substring(0, 80)}...` : player.bio}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default PlayerCard
