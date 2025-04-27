import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import type { SharedProps } from '@adonisjs/inertia/types'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = usePage<SharedProps>().props

  return (
    <nav className="bg-black/40 border-b border-violet-500/20 z-40 relative">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link className="text-2xl font-bold text-white" href="/">
              Neuro
              <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 text-transparent bg-clip-text">
                Clash
              </span>
            </Link>
          </div>
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href={`/profile`}
                className="flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-black/40 transition-colors"
              >
                <div className="relative">
                  <img
                    src={user.rank?.iconUrl}
                    alt={`${user.username}'s rank border`}
                    className="absolute aspect-square scale-125 bottom-0.75"
                  />
                  <img
                    src={user.avatarUrl}
                    alt={`${user.username}'s avatar`}
                    className="w-8 h-8 rounded-full object-cover border-2 border-violet-500"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium text-sm">{user.username}</span>
                  <span className="text-cyan-400 text-xs font-semibold">
                    {user.statistic.elo} ELO
                  </span>
                </div>
              </Link>
              <div className="h-8 w-px bg-violet-500/30 mx-2"></div>
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className="px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text font-semibold mr-0"
                >
                  Admin Panel
                </Link>
              )}
              <Link
                method="post"
                href="/logout"
                className="text-red-500 hover:text-red-400 px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <Link
                href="/login"
                className="text-fuchsia-400 hover:text-fuchsia-300 px-4 py-2 rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-colors font-semibold"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-fuchsia-400 p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white block px-3 py-2 rounded-md text-base font-medium hover:opacity-90 transition-colors w-full text-left"
                >
                  Profile
                </Link>
                <Link
                  method="post"
                  href="/logout"
                  className="text-red-500 hover:text-red-400 px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-fuchsia-400 block px-3 py-2 rounded-md text-base font-medium hover:text-fuchsia-300 transition-colors w-full text-left hover:bg-fuchsia-500/10"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white block px-3 py-2 rounded-md text-base font-medium hover:opacity-90 transition-colors w-full text-left"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
