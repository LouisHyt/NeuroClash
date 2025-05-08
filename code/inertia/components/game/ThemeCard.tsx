import type GameController from '#controllers/game_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { motion } from 'motion/react'

type ThemeProps = {
  theme: InferPageProps<GameController, 'showDraftGame'>['themes'][0]
  onSelect: () => void
  disabled: boolean
}

const ThemeCard = ({ theme, onSelect, disabled }: ThemeProps) => {
  return (
    <motion.button
      className={`bg-gray-900/80 p-2 sm:p-3 md:p-4 rounded-lg w-full border ${
        disabled ? 'border-gray-700/30' : 'border-red-500/30'
      } text-white text-sm sm:text-base md:text-lg font-medium hover:bg-red-600/20 transition-colors relative overflow-hidden group ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onSelect}
    >
      {/* Effet de survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Contenu du thème */}
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xs md:text-base">{theme.name}</span>
      </div>
    </motion.button>
  )
}

export default ThemeCard
