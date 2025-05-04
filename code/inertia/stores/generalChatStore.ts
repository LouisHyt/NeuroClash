import { create } from 'zustand'

type ChatMessagesType = {
  message: string
  id: string
  user: {
    username: string
    avatarUrl: string
    rankIcon: string
    isAdmin: boolean
  }
  time: string
}

type GeneralChatStoreType = {
  messages: ChatMessagesType[] | []
  addMessage: (value: ChatMessagesType) => void
  deleteMessage: (id: string) => void
}

export const useGeneralChatStore = create<GeneralChatStoreType>()((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  deleteMessage: (id: string) =>
    set((state) => ({ messages: state.messages.filter((message) => message.id !== id) })),
}))
