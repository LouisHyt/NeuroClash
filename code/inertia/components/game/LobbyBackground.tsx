import { motion } from 'motion/react'
import { memo, useEffect, useState } from 'react'
import seedrandom from 'seedrandom'

const LobbyBackground = memo(() => {
  const [seed, setSeed] = useState('initial-seed')

  useEffect(() => {
    setSeed(Date.now().toString())
  }, [])

  const random = seedrandom(seed)
  const gridAmount = 5

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-gray-900 to-indigo-950">
      {/* Smaller grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
                            linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
                        `,
          backgroundSize: '15px 15px',
        }}
      ></div>

      {/* Animated Horizontal lines */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: gridAmount }).map((_, i) => (
          <motion.div
            key={`line-h-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent w-full"
            style={{ top: `${15 + i * 20}%` }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 3,
            }}
          />
        ))}
      </div>

      {/* Animated vertical lines */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: gridAmount }).map((_, i) => (
          <motion.div
            key={`line-v-${i}`}
            className="absolute w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent h-full"
            style={{ left: `${20 + i * 15}%` }}
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`hex-${i}`}
          className="absolute opacity-10"
          style={{
            top: `${random() * 80 + 10}%`,
            left: `${random() * 80 + 10}%`,
          }}
          initial={{ rotate: random() * 360, scale: 0.5 + random() * 0.5 }}
          animate={{
            y: [0, -15, 0, 15, 0],
            rotate: 360,
            scale: [0.5 + random() * 0.5, 0.6 + random() * 0.5, 0.5 + random() * 0.5],
          }}
          transition={{
            y: {
              duration: 10 + random() * 5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 20 + random() * 10,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 8 + random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="url(#hexGradient)" />
            <defs>
              <linearGradient
                id="hexGradient"
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4F46E5" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}

      {/* Fog */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-indigo-950/50 to-transparent"></div>
    </div>
  )
})

export default LobbyBackground
