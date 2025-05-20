import { motion } from 'motion/react'

const RoundTimer = ({ timeLeft, initialTime }: { timeLeft: number; initialTime: number }) => {
  // Utilisation de tailles différentes selon la taille de l'écran

  const size = 25
  const radius = 55 * (size / 32) // Ajuster le rayon proportionnellement
  const circumference = 2 * Math.PI * radius

  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-25 h-25 xl:w-32 xl:h-32 flex items-center justify-center`}>
        <svg className="w-full h-full absolute top-0 left-0">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={timeLeft <= 5 ? 'rgba(246, 59, 93, 0.2)' : 'rgba(59, 130, 246, 0.2)'}
            strokeWidth="6"
            fill="transparent"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={timeLeft <= 5 ? '#f63b51' : '#3b82f6'}
            strokeWidth="6"
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: circumference * (1 - timeLeft / initialTime) }}
            transition={{ duration: 0.3 }}
            style={{
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
              strokeDasharray: circumference,
            }}
          />
        </svg>
        <span
          className={`text-xl md:text-2xl font-bold z-10 ${timeLeft <= 5 ? 'text-red-500' : 'text-white'}`}
        >
          {timeLeft}s
        </span>
      </div>
    </div>
  )
}

export default RoundTimer
