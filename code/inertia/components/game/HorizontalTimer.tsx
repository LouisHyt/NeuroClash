import { motion } from 'motion/react'

const HorizontalTimer = ({ timeLeft, initialTime }: { timeLeft: number; initialTime: number }) => {
  const percentage = (timeLeft / initialTime) * 100

  return (
    <>
      <div className="mb-0.5 sm:mb-2">
        <span
          className={`text-2xl sm:text-3xl xl:text-4xl font-bold ${
            timeLeft <= 5 ? 'text-red-500' : 'text-white'
          }`}
        >
          {timeLeft}
        </span>
        <span className="text-sm sm:text-lg lg:text-xl text-indigo-300 ml-1">s</span>
      </div>
      <div className="w-3/4 lg:w-full max-w-md h-1.5 sm:h-2 bg-gray-900/80 border border-indigo-500/30 overflow-hidden rounded-md">
        <motion.div
          className={`h-full ${timeLeft <= 5 ? 'bg-red-600' : 'bg-indigo-600'}`}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </>
  )
}

export default HorizontalTimer
