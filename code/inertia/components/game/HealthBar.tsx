import { motion } from 'motion/react'

const HealthBar = ({ life }: { life: number }) => {
  const max = 100
  const percentage = (life / max) * 100

  // Déterminer la couleur en fonction du niveau de santé
  let healthColor = 'from-emerald-500 to-green-400'
  if (percentage < 30) {
    healthColor = 'from-red-600 to-red-500'
  } else if (percentage < 70) {
    healthColor = 'from-amber-500 to-yellow-400'
  }

  return (
    <div className="w-full p-[2px] h-5 sm:h-5 md:h-6 bg-gray-900/80 rounded-md overflow-hidden border-1 border-indigo-500/30 shadow-inner shadow-black/50">
      <motion.div
        className={`h-full bg-gradient-to-r ${healthColor} relative rounded-sm`}
        initial={{ width: '100%' }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1.2 }}
      />
    </div>
  )
}

export default HealthBar
