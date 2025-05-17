import { useRef, useEffect, useState } from 'react'
import { Head } from '@inertiajs/react'
import { Link } from '@tuyau/inertia/react'
import { type Swapy, createSwapy } from 'swapy'
import '~/css/swapyStyle.css'
import StatisticCard from '~/components/StatisticCard'
import { HiOutlineSearch, HiOutlineUserGroup, HiOutlinePlusCircle } from 'react-icons/hi'
import { IoSend } from 'react-icons/io5'
import type { InferPageProps } from '@adonisjs/inertia/types'
import type DashboardController from '#controllers/dashboard_controller'
import GeneralChat from '~/components/GeneralChat'
import AppLayout from '~/layouts/AppLayout'

const Dashboard = ({
  statistics,
  progression,
}: InferPageProps<DashboardController, 'showDashboard'>) => {
  // Données de progression

  const swapyRef = useRef<Swapy | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()

    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  //Swapy management
  useEffect(() => {
    if (!containerRef.current || isMobile) return

    swapyRef.current = createSwapy(containerRef.current)

    const savedLayout = localStorage.getItem('dashboardLayout')
    if (savedLayout) {
      const layout = JSON.parse(savedLayout)
      for (const { slot, item } of layout) {
        const slotElement = document.querySelector(`[data-swapy-slot="${slot}"]`)
        const itemElement = document.querySelector(`[data-swapy-item="${item}"]`)

        if (slotElement && itemElement) {
          slotElement.appendChild(itemElement)
        }
      }
    }

    // Track changes
    swapyRef.current.onSwapEnd((event) => {
      if (!event.hasChanged) return
      localStorage.setItem('dashboardLayout', JSON.stringify(event.slotItemMap.asArray))
    })

    return () => {
      swapyRef.current?.destroy()
    }
  }, [isMobile])

  return (
    <>
      <Head title="Dashboard" />
      <div className="h-full flex flex-col overflow-hidden justify-center">
        <div className="overflow-y-auto px-4 md:px-8 py-4">
          <div
            className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 sm:gap-6 md:gap-8"
            ref={containerRef}
          >
            <div className="grid grid-rows-[auto_auto_1fr] gap-3 sm:gap-4 md:gap-6 min-w-0 min-h-0 md:max-h-[calc(100vh-100px)]">
              <div data-swapy-slot="a" className="slot">
                <div
                  data-swapy-item="a"
                  className="item bg-gradient-to-br from-slate-800/80 via-indigo-900/10 to-slate-800/80 border border-indigo-400/30 rounded-lg p-3 sm:p-4 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-indigo-400/50"
                >
                  <h3 className="text-xl font-semibold mb-4 text-white">Jouer</h3>

                  {/* Game buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Bouton trouver une partie */}
                    <Link
                      route="lobby.public.show"
                      className="cursor-pointer relative text-white font-bold py-8 px-4 rounded-lg overflow-hidden group transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl bg-cover bg-center flex flex-col items-center justify-center text-center"
                      style={{
                        backgroundImage: "url('https://picsum.photos/seed/findgame/400/200')",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-800/60 to-indigo-900/50 group-hover:from-blue-800/70 group-hover:to-indigo-900/60 transition-all duration-300"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <HiOutlineSearch className="w-8 h-8 mb-2" />
                        <span>Find game</span>
                      </div>
                    </Link>

                    {/* Bouton Créer une partie privée */}
                    <Link
                      route="lobby.create-private.show"
                      className="cursor-pointer relative text-white font-bold py-8 px-4 rounded-lg overflow-hidden group transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl bg-cover bg-center flex flex-col items-center justify-center text-center"
                      style={{
                        backgroundImage: "url('https://picsum.photos/seed/creategame/400/200')",
                      }}
                    >
                      {/* Overlay avec dégradé plus subtil */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-800/60 to-pink-900/50 group-hover:from-purple-800/70 group-hover:to-pink-900/60 transition-all duration-300"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <HiOutlinePlusCircle className="w-8 h-8 mb-2" />
                        <span>Create private game</span>
                      </div>
                    </Link>

                    {/* Bouton Rejoindre une partie */}
                    <Link
                      route="lobby.join-private.show"
                      className="cursor-pointer relative text-white font-bold py-8 px-4 rounded-lg overflow-hidden group transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl bg-cover bg-center flex flex-col items-center justify-center text-center"
                      style={{
                        backgroundImage: "url('https://picsum.photos/seed/joingame/400/200')",
                      }}
                    >
                      {/* Overlay avec dégradé plus subtil */}
                      <div className="absolute inset-0 bg-gradient-to-t from-green-700/60 to-cyan-800/50 group-hover:from-green-700/70 group-hover:to-cyan-800/60 transition-all duration-300"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <HiOutlineUserGroup className="w-8 h-8 mb-2" />
                        <span>Join Game</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Progression Section */}
              <div data-swapy-slot="b" className="slot">
                <div
                  data-swapy-item="b"
                  className="item bg-gradient-to-br from-slate-800/80 via-fuchsia-900/10 to-slate-800/80 border border-indigo-400/30 rounded-lg p-3 sm:p-4 backdrop-blur-md shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-emerald-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <h3 className="text-md sm:text-xl font-semibold text-gray-100 mb-1">
                          Progression
                        </h3>
                        <p className="text-xs sm:text-base text-gray-300">
                          {progression.nextRank
                            ? `Reach ${progression.nextRank.eloRequired} ELO to rank up`
                            : 'Congratulations! You have reached the highest rank'}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm sm:text-base font-bold text-violet-400">
                          {progression.currentRank?.name || 'Bronze'}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300">Current Rank</div>
                      </div>
                      {progression.nextRank && (
                        <>
                          <div className="w-px h-8 bg-violet-500/20"></div>
                          <div>
                            <div className="text-sm sm:text-base font-bold text-fuchsia-400">
                              {progression.nextRank.name}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-300">Next Rank</div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="sm:hidden text-center mb-2">
                      {progression.nextRank ? (
                        <div className="text-xs font-bold text-gray-300">
                          {progression.currentRank && progression.currentRank.name} →{' '}
                          {progression.nextRank.name}
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-gray-300">
                          {progression.currentRank && progression.currentRank.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm sm:text-base mb-2">
                      <span className="text-violet-400">{progression.elo} ELO</span>
                      {progression.nextRank && (
                        <span className="text-fuchsia-400">
                          {progression.nextRank.eloRequired} ELO
                        </span>
                      )}
                    </div>
                    <div className="h-2 bg-gray-900 rounded-full overflow-hidden backdrop-blur-md">
                      {progression.nextRank && progression.currentRank ? (
                        <div
                          className="h-full bg-violet-600 rounded-full transition-all duration-1000 relative"
                          style={{
                            width: `${((progression.elo - progression.currentRank.eloRequired) / (progression.nextRank.eloRequired - progression.currentRank.eloRequired)) * 100}%`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="h-full bg-violet-600 rounded-full transition-all duration-1000 relative">
                          <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 sm:gap-4 md:gap-6">
                <div data-swapy-slot="c" className="slot">
                  <div
                    data-swapy-item="c"
                    className="item bg-gradient-to-br from-slate-800/80 via-indigo-900/10 to-slate-800/80 border border-indigo-400/30 rounded-lg p-3 sm:p-4 h-full backdrop-blur-md shadow-lg"
                  >
                    <div className="h-full flex flex-col @container">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-amber-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 11a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-1">
                              Statistics
                            </h3>
                            <p className="text-sm sm:text-base text-gray-300">
                              Your performance overview
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 h-full text-sm">
                        {/* Game played */}
                        <StatisticCard value={statistics.gamesPlayed} label="Games Played" />
                        <StatisticCard value={`${statistics.winRatio}%`} label="Win Ratio" />
                        <StatisticCard value={statistics.winStreak} label="Win Streak" />
                        <StatisticCard
                          value={statistics.correctQuestions}
                          label="Correct Answers"
                        />
                        <StatisticCard value={statistics.wrongQuestions} label="Wrong Answers " />
                        <StatisticCard
                          value={`${statistics.averagePerformance}%`}
                          label="Average Performance"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Section */}
                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                  {/* Ask Question Card */}
                  <div data-swapy-slot="d" className="slot">
                    <div
                      className="item bg-gradient-to-br from-slate-800/80 via-cyan-900/10 to-slate-800/80 border border-indigo-400/30 rounded-lg p-3 sm:p-4 backdrop-blur-md shadow-lg"
                      data-swapy-item="d"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-cyan-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          />
                        </svg>
                        <h3 className="text-lg sm:text-xl font-bold">Suggest a Question</h3>
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base mb-4">
                        Want to contribute ? You can suggest a question!
                      </p>
                      <Link
                        route="suggestquestions.show"
                        className="cursor-pointer w-full bg-cyan-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                      >
                        <IoSend size={18} className="-rotate-90" />
                        Submit Question
                      </Link>
                    </div>
                  </div>

                  {/* Social Links Card */}
                  <div data-swapy-slot="e" className="slot">
                    <div
                      className="item bg-gray-900 border border-gray-800 rounded-lg p-3 sm:p-4 backdrop-blur-md transition-all duration-300 hover:border-gray-700 hover:bg-gray-850"
                      data-swapy-item="e"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-violet-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        <h3 className="text-lg sm:text-xl font-bold">Join Community</h3>
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base mb-4">
                        Connect with other players and stay updated!
                      </p>
                      <div className="space-y-3 sm:space-y-4">
                        <a
                          href="https://discord.gg/r6k5ysPaRp"
                          target="_blank"
                          className="cursor-pointer w-full bg-[#5865F2] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-[#5865F2]/20 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 00-1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418z" />
                          </svg>
                          Join Discord
                        </a>
                        <button className=" cursor-pointer w-full bg-[#1DA1F2] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-[#1DA1F2]/20 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                          Follow on Twitter
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <GeneralChat />
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.layout = (page: React.ReactNode) => <AppLayout children={page} />

export default Dashboard
