import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useGameSocketStore } from '~/stores/gameSocketStore'
import { useRouter } from '@tuyau/inertia/react'
import { usePage } from '@inertiajs/react'

function GameLayout({ children }: { children: React.ReactNode }) {
  const setSocket = useGameSocketStore((state) => state.setSocket)
  const { gameId } = usePage().props
  const router = useRouter()

  useEffect(() => {
    const socketInstance = io('/game')

    socketInstance.emit('getGameStatus', gameId)

    socketInstance.on('connect', () => {
      console.log('connected to game socket server !')
    })

    socketInstance.on('gameStatus', (gameExists) => {
      if (gameExists) return
      router.visit({ route: 'dashboard.show', replace: true })
    })

    socketInstance.on('playerDisconnected', (playerUuid: string) => {
      router.visit({ route: 'dashboard.show', replace: true })
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
      console.log('disconnected from game socket')
      setSocket(null)
    }
  }, [])

  return <>{children}</>
}

export default GameLayout
