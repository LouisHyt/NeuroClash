import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useGameSocketStore } from '~/stores/gameSocketStore'
import { usePage, router } from '@inertiajs/react'
import { tuyau } from '~/utils/api'
import type { HandleDisconnectType } from '#controllers/socket/game_socket_controller.types'

function GameLayout({ children }: { children: React.ReactNode }) {
  const setSocket = useGameSocketStore((state) => state.setSocket)
  const { gameId } = usePage().props

  useEffect(() => {
    const socketInstance = io('/game')

    socketInstance.emit('getGameStatus', gameId)

    socketInstance.on('connect', () => {
      console.log('connected to game socket server !')
    })

    /*
      Si l'utilisateur refresh la page, il est redirigé vers le dashboard
    */
    socketInstance.on('gameStatus', (gameExists) => {
      if (gameExists) return
      router.visit(tuyau.$url('disconnect.player'), {
        replace: true,
        method: 'post',
      })
    })

    socketInstance.on('gameStart', () => {
      router.remember('blablabla', 'testing')
    })

    socketInstance.on('playerDisconnected', async (data: HandleDisconnectType) => {
      router.visit(tuyau.$url('disconnect.game'), {
        replace: true,
        method: 'post',
        data: {
          userUuid: data.userUuid,
          isPrivateGame: data.isPrivateGame,
        },
      })
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
