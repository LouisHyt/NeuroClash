import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useSocketStore } from '~/stores/socketStore'
import Flashes from '~/partials/Flashes'
import Navbar from '~/partials/Navbar'
import Footer from '~/partials/Footer'
import { usePage } from '@inertiajs/react'

function AppLayout({ children }: { children: React.ReactNode }) {
  const setSocket = useSocketStore((state) => state.setSocket)
  const page = usePage()

  useEffect(() => {
    const socketInstance = io('/general')
    console.log('connected to socket')
    setSocket(socketInstance)

    socketInstance.on('connect', () => {
      console.log('connected to server !')
    })

    return () => {
      socketInstance.disconnect()
      console.log('disconnected from socket')
      setSocket(null)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden text-fuchsia-200/80 grid grid-rows-[auto_1fr_auto]">
      <Flashes />
      <Navbar />
      {children}
      {page.url !== '/dashboard' && page.url !== '/admin' && <Footer />}
    </div>
  )
}

export default AppLayout
