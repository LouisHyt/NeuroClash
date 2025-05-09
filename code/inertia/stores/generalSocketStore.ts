import { create } from 'zustand'
import type { Socket } from 'socket.io-client'

type SocketStoreType = {
  socket: Socket | null
  setSocket: (value: Socket | null) => void
}

export const useGeneralSocketStore = create<SocketStoreType>()((set) => ({
  socket: null,
  setSocket: (value) => set(() => ({ socket: value })),
}))
