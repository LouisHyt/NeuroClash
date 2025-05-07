import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { usePage } from '@inertiajs/react'
import { HiArrowSmDown, HiX } from 'react-icons/hi'
import { SharedProps } from '@adonisjs/inertia/types'
import { useGeneralSocketStore } from '~/stores/generalSocketStore'
import { useGeneralChatStore } from '~/stores/generalChatStore'

const GeneralChat = () => {
  const socket = useGeneralSocketStore((state) => state.socket)
  const chatMessages = useGeneralChatStore((state) => state.messages)
  const addChatMessage = useGeneralChatStore((state) => state.addMessage)
  const deleteChatMessage = useGeneralChatStore((state) => state.deleteMessage)

  const [chatVisible, setChatVisible] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)

  const messageInputRef = useRef<HTMLInputElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const { user } = usePage<SharedProps>().props

  // Auto scroll for the general chat
  useEffect(() => {
    if (chatContainerRef.current && autoScroll) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages, autoScroll, chatVisible])

  // Fonction pour détecter quand l'utilisateur fait défiler manuellement
  const handleChatScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 20
      setAutoScroll(isAtBottom)
    }
  }

  const handleDeleteMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement
    const messageItem = button.closest('.message-item') as HTMLElement
    const messageId = messageItem.dataset.id

    socket?.emit('deleteMessage', messageId)
  }

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = messageInputRef.current!.value
    messageInputRef.current!.value = ''
    socket?.emit('sendMessage', message)
  }

  //Websocket connection
  useEffect(() => {
    if (!socket) return

    socket.on('newChatMessage', (message) => {
      addChatMessage(message)
      console.log(message)
    })

    socket.on('messageDeleted', (messageId) => {
      deleteChatMessage(messageId)
    })

    return () => {
      socket.off('newChatMessage')
      socket.off('messageDeleted')
    }
  }, [socket])

  return (
    <>
      <button
        onClick={() => setChatVisible(!chatVisible)}
        className={`fixed bottom-4 right-4 z-30 bg-violet-600 text-white p-3 rounded-full shadow-lg shadow-violet-600/20 lg:hidden ${chatVisible ? 'hidden' : 'flex'}`}
        aria-label="Toggle chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transition-transform ${chatVisible ? 'rotate-90' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
          />
        </svg>
      </button>

      <div
        className={`fixed top-0 right-0 bottom-0 w-[80%] sm:w-[350px] xl:w-auto xl:static bg-gray-900 border border-gray-800 p-2 sm:p-4 backdrop-blur-md transition-all duration-300 hover:border-gray-700 hover:bg-gray-850 h-full z-40 transform ${chatVisible ? 'translate-x-0 rounded-l-lg' : 'rounded-lg translate-x-full xl:translate-x-0'} lg:transform-none transition-transform duration-300 ease-in-out overflow-hidden flex-shrink-0`}
      >
        <div className="flex flex-col h-full justify-between max-h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2 truncate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0 text-pink-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                />
              </svg>
              <span className="truncate">GENERAL CHAT</span>
            </h3>
            <button
              onClick={() => setChatVisible(false)}
              className="lg:hidden text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            onScroll={handleChatScroll}
            className="flex-1 space-y-1.5 sm:space-y-3 mb-3 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-100px)] xl:max-h-[630px]"
          >
            <AnimatePresence initial={false} mode="sync">
              {chatMessages.map((msg) => (
                <motion.div
                  layout
                  key={msg.id}
                  data-id={msg.id}
                  className="message-item flex items-start gap-2 sm:gap-3 hover:bg-gray-850 p-1.5 sm:p-2 rounded-lg relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {user!.isAdmin && (
                    <button
                      onClick={handleDeleteMessage}
                      className="absolute top-1 right-1 cursor-pointer"
                    >
                      <HiX size={20} color="#d13449" />
                    </button>
                  )}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-violet-500/20 flex-shrink-0 relative">
                    {msg.user.rankIcon && (
                      <img
                        src={msg.user.rankIcon}
                        alt={`${msg.user.username}'s rank border`}
                        className="absolute aspect-square scale-125 bottom-0.75"
                      />
                    )}
                    <img
                      src={msg.user.avatarUrl}
                      alt={`${msg.user.username}'s avatar`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs sm:text-base relative">
                        {msg.user.username}
                      </span>
                      <span className="text-[10px] sm:text-sm text-gray-300">{msg.time}</span>
                      {msg.user.isAdmin && (
                        <p className="px-2 py-1 bg-gradient-to-r to-orange-700 from-yellow-600 text-xs rounded-lg font-semibold">
                          Admin
                        </p>
                      )}
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Message Input */}
          <form className="relative mt-auto pb-1" onSubmit={handleMessageSubmit}>
            {!autoScroll && chatMessages.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setAutoScroll(true)
                  if (!chatContainerRef.current) return
                  chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
                }}
                className="cursor-pointer absolute -top-13 left-1/2 transform -translate-x-1/2 bg-violet-600/90 text-white text-xs px-3 py-1 rounded-full shadow-lg shadow-violet-600/10 flex items-center gap-1 z-10 hover:bg-violet-500 transition-colors"
              >
                <HiArrowSmDown size={27} />
                <p className="text-md">Auto scroll</p>
              </button>
            )}
            <input
              type="text"
              name="message"
              placeholder="Type your message..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-2 sm:px-4 py-1.5 sm:py-3 text-xs sm:text-base focus:outline-none focus:border-violet-500/50 transition-all duration-300"
              style={{ paddingRight: '35px' }}
              ref={messageInputRef}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-violet-400 hover:text-violet-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default GeneralChat
