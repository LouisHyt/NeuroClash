import { motion } from 'motion/react'
import { useState, memo, useEffect } from 'react'
import seedrandom from 'seedrandom'

const VisualEffects = memo(() => {
  const [seed, setSeed] = useState('initial-seed')

  useEffect(() => {
    setSeed(Date.now().toString())
  }, [])

  const random = seedrandom(seed)
  return (
    <>
      {/* Stars / Particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-indigo-400 rounded-full"
            style={{
              left: `${random() * 100}%`,
              top: `${random() * 100}%`,
              opacity: random() * 0.7 + 0.3,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + random() * 3,
              repeat: Infinity,
              delay: random() * 5,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 via-transparent to-indigo-900/10 pointer-events-none z-0" />
    </>
  )
})

export default VisualEffects
