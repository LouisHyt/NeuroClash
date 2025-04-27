import {
  FiKey,
  FiLock,
  FiUser,
  FiLogIn,
  FiSettings,
  FiShield,
  FiEdit,
  FiXOctagon,
  FiUserX,
  FiSlash,
  FiFrown,
} from 'react-icons/fi'

export const BackgroundEffect = {
  default: {
    icons: [],
    colors: [
      'text-violet-500/50',
      'text-fuchsia-500/50',
      'text-violet-600/50',
      'text-fuchsia-500/50',
    ],
    theme: {
      gradient: 'rgba(99, 102, 241, 0.1)',
      overlay: 'from-violet-500/2',
    },
  },
  auth: {
    icons: [FiKey, FiLock, FiUser, FiLogIn],
    colors: [
      'text-violet-500/50',
      'text-fuchsia-500/50',
      'text-violet-600/50',
      'text-fuchsia-500/50',
    ],
    theme: {
      gradient: 'rgba(99, 102, 241, 0.1)',
      overlay: 'from-violet-500/2',
    },
  },
  ban: {
    icons: [FiXOctagon, FiUserX, FiSlash, FiFrown],
    colors: ['text-red-500/50', 'text-orange-500/50', 'text-red-700/50', 'text-orange-800/50'],
    theme: {
      gradient: 'rgba(183, 36, 54, 0.1)',
      overlay: 'from-red-500/2',
    },
  },
  game: {
    icons: [FiKey, FiLock, FiUser, FiLogIn],
    colors: ['from-violet-600/50', 'to-fuchsia-500/50', 'from-violet-600/50', 'to-fuchsia-500/50'],
    theme: {
      gradient: 'rgba(99, 102, 241, 0.175)',
      overlay: 'from-violet-500/5',
    },
  },
  profile: {
    icons: [FiUser, FiSettings, FiShield, FiEdit],
    colors: ['text-sky-500/50', 'text-blue-500/40', 'text-cyan-600/50'],
    theme: {
      gradient: 'rgba(68, 181, 240, 0.09)',
      overlay: 'from-blue-500/7',
    },
  },
}
