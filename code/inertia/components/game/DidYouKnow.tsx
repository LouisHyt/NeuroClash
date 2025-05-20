import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { FunFacts } from '~/constants/FunFacts'

const DidYouKnow = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0)

  // Changer le fun fact toutes les 5 secondes
  useEffect(() => {
    const factInterval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % FunFacts.length)
    }, 8000)

    return () => clearInterval(factInterval)
  }, [FunFacts.length])

  return (
    <div className="absolute bottom-2 xl:bottom-8 left-0 right-0 z-10 px-4">
      <div className="max-w-2xl mx-auto p-2 sm:p-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFactIndex}
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-indigo-300 text-xs sm:text-sm font-medium mb-0.5 sm:mb-1">
              Did you know ?
            </p>
            <p className="text-white text-[13px] xl:text-base">{FunFacts[currentFactIndex]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default DidYouKnow
