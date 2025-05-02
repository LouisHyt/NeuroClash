import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineUsers } from 'react-icons/hi'
import { FaBolt } from 'react-icons/fa6'
import { tuyau } from '~/utils/api'
import { InferResponseType } from '@tuyau/client'
import { BiRefresh } from 'react-icons/bi'

type UsersType = InferResponseType<typeof tuyau.api.getusers.$post>['users']
type PaginationMetaType = InferResponseType<typeof tuyau.api.getusers.$post>['meta']

const UserList = () => {
  const [users, setUsers] = useState<UsersType | null>(null)
  const [paginationMeta, setPaginationMeta] = useState<PaginationMetaType | null>(null)
  const [userTab, setUserTab] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const fetchUsers = async () => {
    setIsLoading(true)
    await tuyau
      .$route('api.getusers')
      .$post({
        page: userTab,
      })
      .then((res) => {
        setUsers(res.data?.users || null)
        setPaginationMeta(res.data?.meta || null)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }

  const handleTabChange = (value: number) => {
    if (userTab + value < 1) return
    setUserTab((prev) => prev + value)
  }

  useEffect(() => {
    fetchUsers()
  }, [userTab])

  return (
    <div className="relative bg-gradient-to-br h-full from-slate-800/80 via-indigo-900/10 to-slate-800/80 border border-indigo-400/30 rounded-lg p-4 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-indigo-400/50 grid grid-rows-[1fr_auto]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <HiOutlineUsers className="text-violet-400" />
            <span>Utilisateurs</span>
          </h3>
          <span className="bg-violet-500/20 text-violet-300 text-xs font-medium px-2.5 py-1 rounded-full">
            {paginationMeta?.total && !isLoading && `${paginationMeta?.total} players`}
            {!paginationMeta?.total && !isLoading && `error`}
            {isLoading && !paginationMeta?.total && 'Loading...'}
          </span>
        </div>
        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {users && !isLoading && (
              <motion.div
                className="container"
                key={userTab}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                {users.map((user, index) => (
                  <div
                    key={user.username}
                    className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={user.avatarUrl}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover border border-violet-500/30"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.username}</p>
                      <div className="flex gap-5">
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <FaBolt className="text-violet-400" />
                          Elo: {user.statistic.elo}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <BiRefresh className="animate-[spin_3s_linear_infinite] rounded-full" size={40} />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center mt-3 gap-2">
        <button
          className="p-1.5 disabled:opacity-50 rounded-full bg-violet-500/20 text-violet-300 not-disabled:hover:bg-violet-500/30 not-disabled:cursor-pointer transition-colors border border-violet-500/30"
          onClick={() => handleTabChange(-1)}
          title="Page précédente"
          disabled={paginationMeta?.currentPage === paginationMeta?.firstPage}
        >
          <HiOutlineChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 disabled:opacity-50 rounded-full bg-violet-500/20 text-violet-300 not-disabled:hover:bg-violet-500/30 not-disabled:cursor-pointer transition-colors border border-violet-500/30"
          onClick={() => handleTabChange(1)}
          title="Page suivante"
          disabled={paginationMeta?.currentPage === paginationMeta?.lastPage}
        >
          <HiOutlineChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default UserList
