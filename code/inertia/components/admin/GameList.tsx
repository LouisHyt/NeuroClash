import { HiOutlineClock, HiOutlinePlay } from 'react-icons/hi'
import { motion } from 'motion/react'
import { useState } from 'react'

interface GameSession {
  id: string
  startedAt: string
  duration: string
  playerCount: number
  status: 'active' | 'finished'
  players: {
    username: string
    avatarUrl: string
  }[]
}

const GameList = () => {
  const [gameSessions, setGameSessions] = useState<GameSession[]>([
    {
      id: '1',
      startedAt: '2025-05-02 12:30',
      duration: '15 min',
      playerCount: 4,
      status: 'active',
      players: [
        {
          username: 'NeuroPro',
          avatarUrl:
            'https://api.dicebear.com/9.x/thumbs/svg?seed=1&scale=100&size=80&backgroundColor=1D1E1E',
        },
        {
          username: 'BrainMaster',
          avatarUrl:
            'https://api.dicebear.com/9.x/thumbs/svg?seed=2&scale=100&size=80&backgroundColor=1D1E1E',
        },
      ],
    },
    {
      id: '2',
      startedAt: '2025-05-02 12:15',
      duration: '30 min',
      playerCount: 2,
      status: 'active',
      players: [
        {
          username: 'CortexQueen',
          avatarUrl:
            'https://api.dicebear.com/9.x/thumbs/svg?seed=3&scale=100&size=80&backgroundColor=1D1E1E',
        },
        {
          username: 'BrainWave',
          avatarUrl:
            'https://api.dicebear.com/9.x/thumbs/svg?seed=4&scale=100&size=80&backgroundColor=1D1E1E',
        },
      ],
    },
    {
      id: '3',
      startedAt: '2025-05-02 12:15',
      duration: '30 min',
      playerCount: 2,
      status: 'active',
      players: [
        {
          username: 'CortexQueen',
          avatarUrl:
            'https://api.dicebear.com/9.x/thumbs/svg?seed=5&scale=100&size=80&backgroundColor=1D1E1E',
        },
        {
          username: 'BrainWave',
          avatarUrl:
            'https://api.dicebear.com/9.x/thumbs/svg?seed=6&scale=100&size=80&backgroundColor=1D1E1E',
        },
      ],
    },
    {
      id: '4',
      startedAt: '2025-05-02 12:15',
      duration: '30 min',
      playerCount: 2,
      status: 'active',
      players: [
        {
          username: 'CortexQueen',
          avatarUrl:
            'https://api.dicebear.com/9.x/thumbs/svg?seed=7&scale=100&size=80&backgroundColor=1D1E1E',
        },
        {
          username: 'BrainWave',
          avatarUrl:
            'https://api.dicebear.com/9.x/thumbs/svg?seed=8&scale=100&size=80&backgroundColor=1D1E1E',
        },
      ],
    },
    {
      id: '5',
      startedAt: '2025-05-02 12:15',
      duration: '30 min',
      playerCount: 2,
      status: 'active',
      players: [
        {
          username: 'CortexQueen',
          avatarUrl:
            'https://api.dicebear.com/9.x/thumbs/svg?seed=9&scale=100&size=80&backgroundColor=1D1E1E',
        },
        {
          username: 'BrainWave',
          avatarUrl:
            'https://api.dicebear.com/9.x/thumbs/svg?seed=10&scale=100&size=80&backgroundColor=1D1E1E',
        },
      ],
    },
  ])

  return (
    <div className="relative grid grid-rows-[auto_220px] md:grid-rows-[auto_1fr] bg-gradient-to-br from-slate-800/80 via-fuchsia-900/10 to-slate-800/80 border border-fuchsia-400/30 rounded-lg p-4 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-fuchsia-400/50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <HiOutlinePlay className="text-fuchsia-400" />
          <span>Parties en cours</span>
        </h3>
        <span className="bg-fuchsia-500/20 text-fuchsia-300 text-xs font-medium px-2.5 py-1 rounded-full">
          {gameSessions.length} actives
        </span>
      </div>
      <div className="relative overflow-y-auto">
        <div className="space-y-3 pr-1">
          {gameSessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-white/5 rounded-lg border border-fuchsia-500/20"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">Session #{session.id}</h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <HiOutlineClock className="text-fuchsia-400" />
                    Démarrée: {session.startedAt}
                  </p>
                </div>
                <span className="bg-green-500/20 text-green-300 text-xs px-2 py-0.5 rounded-full">
                  {session.status === 'active' ? 'Active' : 'Terminée'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400">Joueurs:</span>
                <div className="flex -space-x-2">
                  {session.players.slice(0, 3).map((player, idx) => (
                    <img
                      key={idx}
                      src={player.avatarUrl}
                      alt={player.username}
                      className="w-6 h-6 rounded-full border border-fuchsia-500/30"
                      title={player.username}
                    />
                  ))}
                  {session.players.length > 3 && (
                    <div className="w-6 h-6 rounded-full bg-fuchsia-600/30 flex items-center justify-center text-xs border border-fuchsia-500/30">
                      +{session.players.length - 3}
                    </div>
                  )}
                </div>
                <span className="text-xs ml-auto text-fuchsia-300 flex items-center gap-1">
                  <HiOutlineClock />
                  {session.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameList
