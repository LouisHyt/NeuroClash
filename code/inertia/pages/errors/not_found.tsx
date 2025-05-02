import { Head } from '@inertiajs/react'
import { Link } from '@tuyau/inertia/react'
import GridBackground from '~/components/GridBackground'
import { motion } from 'motion/react'

const NotFound = () => {
  return (
    <>
      <Head title="404" />
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center text-white">
        <GridBackground type="error" animated={true} iconsDensity={18} />

        <div className="z-10 p-10 max-w-4xl text-center">
          <motion.h1
            className="text-8xl lg:text-9xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-300 text-transparent bg-clip-text">
              404
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xl lg:text-2xl mb-8 text-slate-300">
              Oops! This page seems to have vanished into the digital void.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-sm text-slate-500 hover:text-slate-400 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            route="home.show"
            className="text-blue-500/70 hover:text-slate-400 transition-colors"
          >
            Lost? Go back to the Home page
          </Link>
        </motion.div>
      </div>
    </>
  )
}

export default NotFound
