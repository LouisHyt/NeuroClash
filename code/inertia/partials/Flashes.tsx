import type { SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'
import { AnimatePresence, motion } from 'motion/react'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoWarning } from 'react-icons/io5'
import { BiSolidErrorAlt } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import FlashKeys from '#enums/Flashes'

const Flashes = () => {
  const { flashes } = usePage<SharedProps>().props

  type Flash = (typeof flashes)[0]

  // Then define FlattenedFlash based on Flash, but ensure message is always a string
  type FlattenedFlash = Omit<Flash, 'message'> & {
    message: string
    id: string
  }

  const [flashesOpen, setFlashesOpen] = useState<FlattenedFlash[] | []>([])
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  useEffect(() => {
    const flatFlashes = flashes
      .flatMap((item) => {
        if (!item.message) return []
        return Object.entries(item.message).map(([type, message]) => ({
          type: item.type,
          message,
          id: generateId(),
        }))
      })
      .filter(
        (item) =>
          [FlashKeys.SUCCESS, FlashKeys.WARNING, FlashKeys.ERROR].includes(item.type) &&
          item.message !== ''
      )

    setFlashesOpen(flatFlashes)
  }, [flashes])

  const handleDeleteFlash = (id: string) => {
    setFlashesOpen((prev) => prev.filter((flash) => flash.id !== id))
  }

  return (
    <div className="cursor-pointer fixed bottom-5 right-10 z-50 flex flex-col gap-5 sm:right-10 sm:left-auto left-1/2 -translate-x-1/2 sm:translate-x-0 w-[85%] sm:w-auto max-w-md">
      <AnimatePresence>
        {flashesOpen.map((flash, index) => (
          <motion.div
            layout
            key={flash.id}
            data-id={flash.id}
            className={`
              py-4 px-7 relative rounded-lg border shadow-md w-fit
              ${flash.type === FlashKeys.SUCCESS && 'sm:bg-green-500/20 bg-green-500/90 text-white sm:text-green-400 border-green-500/30'}
              ${flash.type === FlashKeys.WARNING && 'sm:bg-yellow-500/20 bg-yellow-600/90 text-white sm:text-yellow-400 border-yellow-500/30'}
              ${flash.type === FlashKeys.ERROR && 'sm:bg-red-500/20 bg-red-500/90 text-white sm:text-red-400 border-red-500/30'}
            `}
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 35, transition: { duration: 0.5, delay: 0 } }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onClick={() => handleDeleteFlash(flash.id)}
          >
            {flash.type === FlashKeys.SUCCESS && (
              <FaCircleCheck className="absolute -top-2 -left-3" size={32} />
            )}
            {flash.type === FlashKeys.WARNING && (
              <IoWarning className="absolute -top-2 -left-3" size={35} />
            )}
            {flash.type === FlashKeys.ERROR && (
              <BiSolidErrorAlt className="absolute -top-2 -left-3" size={32} />
            )}
            <p>{flash.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Flashes
