import { usePage } from '@inertiajs/react'
import { motion, AnimatePresence, Variants } from 'motion/react'
import GridBackground from '~/components/GridBackground'
import Flashes from '~/partials/Flashes'
import Footer from '~/partials/Footer'
import Navbar from '~/partials/Navbar'

type Props = {
  children: React.ReactNode
}

function AppLayout({ children }: Props) {
  const page = usePage()
  const direction = page.url.startsWith('/login') ? 20 : -20
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      rotateX: 5,
      y: direction,
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    hidden: {
      opacity: 0,
      rotateX: 5,
      y: direction,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden grid grid-rows-[auto_1fr_auto]">
      <Flashes />
      <Navbar />
      <GridBackground animated={true} iconsDensity={22} type="auth" />
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          variants={pageVariants}
          animate="visible"
          exit="hidden"
          initial="initial"
          key={page.url}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default AppLayout
