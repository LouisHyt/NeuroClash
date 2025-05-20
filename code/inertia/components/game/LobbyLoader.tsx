import { motion } from 'motion/react'

const LobbyLoader = () => {
  return (
    <div>
      <div className="relative w-20 h-20 xl:w-40 xl:h-40 mb-6 sm:mb-8">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-indigo-500/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 xl:w-4 xl:h-4 rounded-full bg-indigo-500"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 xl:w-4 xl:h-4 rounded-full bg-indigo-500"></div>
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 xl:w-4 xl:h-4 rounded-full bg-indigo-500"></div>
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 xl:w-4 xl:h-4 rounded-full bg-indigo-500"></div>
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 xl:w-32 xl:h-32 rounded-full bg-indigo-600/20 border border-indigo-500/50"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl xl:text-5xl text-indigo-400">
          🎮
        </div>
      </div>
    </div>
  )
}

export default LobbyLoader
