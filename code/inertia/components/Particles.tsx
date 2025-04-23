import { easeInOut } from 'motion'
import { motion } from 'motion/react'
import { BackgroundEffect } from '~/constants/BackgroundEffect'
import type { GridProps } from './GridBackground'
import seedrandom from 'seedrandom'
import { useEffect, useState } from 'react'

const Particles = ({ iconsDensity, type }: Required<Omit<GridProps, 'animated'>>) => {
  const [seed, setSeed] = useState('initial-seed')

  useEffect(() => {
    setSeed(Date.now().toString())
  }, [])

  const random = seedrandom(seed)

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {Array.from({ length: iconsDensity }).map((_, i) => {
        const Icons = BackgroundEffect[type]['icons']
        const IconComponent = Icons[i % Icons.length]

        const gridSize = Math.ceil(Math.sqrt(iconsDensity))
        const cellSize = 100 / gridSize

        const gridX = i % gridSize
        const gridY = Math.floor(i / gridSize)
        const randomOffsetX = cellSize * 0.2 + random() * cellSize * 0.8
        const randomOffsetY = cellSize * 0.4 + random() * cellSize * 0.8

        const initialPosX = gridX * cellSize + randomOffsetX
        const initialPosY = gridY * cellSize + randomOffsetY

        const radius = 15 + random() * 25
        const points = 6

        const xPath = Array.from({ length: points }).map(() => (random() * 2 - 1) * radius)

        const yPath = Array.from({ length: points }).map(() => (random() * 2 - 1) * radius)

        const size = i % 3 === 0 ? 32 : i % 3 === 1 ? 45 : 38

        const color = BackgroundEffect[type]['colors'][i % BackgroundEffect[type]['colors'].length]

        return (
          <motion.div
            key={i}
            className={`absolute ${color}`}
            style={{
              width: size,
              height: size,
              left: `${initialPosX}%`,
              top: `${initialPosY}%`,
              opacity: 0.15 + random() * 0.25,
            }}
            initial={{
              rotate: random() * 360,
            }}
            animate={{
              x: xPath,
              y: yPath,
              rotate: [random() * 360, random() * 360 + 180, random() * 360 + 360],
            }}
            transition={{
              duration: 20,
              repeatType: 'mirror',
              repeat: Infinity,
              ease: easeInOut,
              times: Array.from({ length: points }).map((_, i) => i / (points - 1)),
            }}
          >
            <IconComponent size={size} />
          </motion.div>
        )
      })}
    </div>
  )
}

export default Particles
