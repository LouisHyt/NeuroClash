import BanController from '#controllers/ban_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { Head, Link } from '@inertiajs/react'
import GridBackground from '~/components/GridBackground'
import { useEffect, useState } from 'react'

const Ban = ({ bannedUntil }: InferPageProps<BanController, 'showBan'>) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('')

  useEffect(() => {
    const calculateTimeRemaining = () => {
      if (!bannedUntil) {
        setTimeRemaining('Undetermined')
        return
      }

      const now = new Date()
      const banEndDate = new Date(bannedUntil)
      const diff = banEndDate.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining('0 days, 0 Hours, 0 minutes, 0 seconds')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
    }

    calculateTimeRemaining()
    const timer = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(timer)
  }, [bannedUntil])

  return (
    <>
      <Head title="Ban" />
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center text-white">
        <GridBackground type="ban" animated={true} iconsDensity={18} />

        <div className="z-10 p-10 max-w-4xl text-center">
          <h1 className=" text-lg lg:text-4xl font-bold mb-4 text-red-500">
            Ooops, it looks like you have been banned by an administrator :(
          </h1>

          <p className="text-xs lg:text-sm mb-8">
            If you think this is a mistake, contact an administrator by clicking{' '}
            <a href="#" className="text-blue-400 hover:underline">
              {' '}
              here
            </a>
          </p>

          <div className="mt-15">
            <h2 className="text-lg lg:text-2xl font-semibold mb-2">Time remaning :</h2>
            <div className="text-lg lg:text-3xl font-mono bg-black/30 py-4 px-6 rounded-lg inline-block">
              {timeRemaining}
            </div>
          </div>

          <Link
            href="/"
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-blue-400 hover:underline"
          >
            Go back to the home Page
          </Link>
        </div>
      </div>
    </>
  )
}

export default Ban
