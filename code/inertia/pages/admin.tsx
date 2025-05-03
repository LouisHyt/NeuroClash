import { useState } from 'react'
import { Head } from '@inertiajs/react'
import GridBackground from '~/components/GridBackground'
import Flashes from '~/partials/Flashes'
import Navbar from '~/partials/Navbar'
import GeneralChat from '~/components/GeneralChat'

import UserList from '~/components/admin/UserList'
import GameList from '~/components/admin/GameList'
import SuggestedQuestions from '~/components/admin/SuggestedQuestions'
import ApprovedQuestions from '~/components/admin/ApprovedQuestions'

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'suggested' | 'questions'>('suggested')

  return (
    <>
      <Head title="Admin Dashboard" />
      <Flashes />
      <div className="min-h-screen bg-[#0a0a0a] relative text-fuchsia-200/80 grid grid-rows-[auto_1fr]">
        <GridBackground animated={false} type="profile" />
        <Navbar />
        <div className="overflow-y-auto overflow-x-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-6 p-6 md:p-8 box-border">
            {/* Section principale */}
            <div className="grid xl:grid-rows-[auto_1fr] gap-6 md:max-h-[calc(100vh-130px)] min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(200px,290px)]">
                <UserList />

                {/* Parties en cours */}
                <GameList />
              </div>

              {/* Contenu principal tabulaire */}
              <div className="h-full bg-gradient-to-br from-slate-800/80 via-purple-900/10 to-slate-800/80 border border-purple-400/30 rounded-lg overflow-hidden backdrop-blur-md shadow-lg transition-all duration-300 hover:border-purple-400/50 flex flex-col min-h-0">
                <div className="flex border-b border-purple-500/20 flex-shrink-0">
                  <button
                    className={`cursor-pointer flex-1 py-3 px-4 font-medium text-sm focus:outline-none ${activeTab === 'suggested' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-purple-500/10'}`}
                    onClick={() => setActiveTab('suggested')}
                  >
                    Suggested questions
                  </button>
                  <button
                    className={`cursor-pointer flex-1 py-3 px-4 font-medium text-sm focus:outline-none ${activeTab === 'questions' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-purple-500/10'}`}
                    onClick={() => setActiveTab('questions')}
                  >
                    Approved questions
                  </button>
                </div>

                {/* Contenu des onglets */}
                <div className="flex-1 p-5 overflow-hidden min-h-0">
                  {activeTab === 'suggested' ? <SuggestedQuestions /> : <ApprovedQuestions />}
                </div>
              </div>
            </div>

            {/* Chat général */}
            <div className="h-full">
              <GeneralChat />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin
