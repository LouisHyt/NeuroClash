import { motion } from 'motion/react'
import type { PlayerType } from '~/pages/game/draft.types'

type PlayerDraftColumnProps = {
  player: PlayerType
  isActive: boolean
  displayRank?: boolean
}

const PlayerDraftColumn = ({ player, isActive, displayRank = true }: PlayerDraftColumnProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-1 sm:mb-2">
        <div
          className={`absolute inset-0 ${
            isActive ? 'bg-red-600' : 'bg-gray-700'
          } rounded-full blur-md opacity-70`}
        ></div>
        <img
          src={player.avatarUrl}
          alt={player.username}
          className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-2 ${
            isActive ? 'border-red-500' : 'border-gray-500'
          } relative z-10 object-cover`}
        />
        {displayRank && player.rank && (
          <img
            src={player.rank.iconUrl}
            alt={`${player.username} rank icon`}
            className="absolute inset-0 scale-110 scale-x-120 z-10"
          />
        )}

        <div className="absolute -bottom-1 sm:-bottom-2 left-1/2 -translate-x-1/2 bg-gray-900 px-1 sm:px-2 py-0.5 rounded text-xs font-bold text-red-300 border border-red-500/30 z-20">
          {player.statistic.elo}
        </div>
      </div>

      <h3
        className={`mt-1 text-sm sm:text-base md:text-xl font-bold ${
          isActive ? 'text-white' : 'text-gray-400'
        } mb-1 sm:mb-2`}
      >
        {player.username}
        {isActive && (
          <span className="ml-1 sm:ml-2 text-red-400 text-xs sm:text-sm">(Picking)</span>
        )}
      </h3>

      {/* Banned themes */}
      <div className="flex flex-col items-center mt- sm:mt-2 w-full">
        <div className="text-xs sm:text-sm font-medium text-red-300 mb-1 sm:mb-2">
          Banned Themes:
        </div>
        <div className="flex flex-col gap-1 sm:gap-2 items-center">
          {player.bannedThemes.length > 0 ? (
            player.bannedThemes.map((theme, index) => {
              if (theme)
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 bg-red-900/50 border border-red-500/50 rounded text-xs sm:text-sm text-red-300 font-medium w-full text-center"
                  >
                    {theme.name}
                  </motion.div>
                )
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-700/70 border border-gray-500/50 rounded text-xs sm:text-sm text-gray-300 font-medium w-full text-center"
                >
                  Skipped
                </motion.div>
              )
            })
          ) : (
            <span className="text-gray-500 text-xs italic">No theme Banned</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayerDraftColumn
