import { useState } from 'react'
import { Link } from '@inertiajs/react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <button className="text-fuchsia-400 block px-3 py-2 rounded-md text-base font-medium hover:text-fuchsia-300 transition-colors w-full text-left hover:bg-fuchsia-500/10">
              Log In
            </button>
            <button className="bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white block px-3 py-2 rounded-md text-base font-medium hover:opacity-90 transition-colors w-full text-left">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
