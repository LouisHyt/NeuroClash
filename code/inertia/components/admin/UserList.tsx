import type AdminController from '#controllers/admin_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineUsers } from 'react-icons/hi'
import { FaBolt } from 'react-icons/fa6'
import { usePage } from '@inertiajs/react'

const UserList = () => {
  const { users: visibleUsers, usersCount } =
    usePage<InferPageProps<AdminController, 'showDashboard'>>().props

  const [users, setUsers] = useState(visibleUsers)
  const [userTab, setUserTab] = useState(1)

  const handleTabChange = (value: number) => {
    if (userTab + value < 1) return
    setUserTab((prev) => prev + value)
  }

  return (
    <div className="bg-gradient-to-br from-slate-800/80 via-indigo-900/10 to-slate-800/80 border border-indigo-400/30 rounded-lg p-4 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-indigo-400/50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <HiOutlineUsers className="text-violet-400" />
          <span>Utilisateurs</span>
        </h3>
        <span className="bg-violet-500/20 text-violet-300 text-xs font-medium px-2.5 py-1 rounded-full">
          {usersCount} total
        </span>
      </div>
      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
        {users.map((user, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
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
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-3 gap-2">
        <button
          className="p-1.5 disabled:opacity-50 rounded-full bg-violet-500/20 text-violet-300 not-disabled:hover:bg-violet-500/30 not-disabled:cursor-pointer transition-colors border border-violet-500/30"
          onClick={() => handleTabChange(-1)}
          title="Page précédente"
          disabled={userTab === 1}
        >
          <HiOutlineChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 disabled:opacity-50 rounded-full bg-violet-500/20 text-violet-300 not-disabled:hover:bg-violet-500/30 not-disabled:cursor-pointer transition-colors border border-violet-500/30"
          onClick={() => handleTabChange(1)}
          title="Page suivante"
        >
          <HiOutlineChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default UserList
