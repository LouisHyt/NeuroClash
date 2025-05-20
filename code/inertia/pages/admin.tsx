import { useState } from 'react'
import { Head } from '@inertiajs/react'
import GridBackground from '~/components/GridBackground'
import GeneralChat from '~/components/GeneralChat'

import UserList from '~/components/admin/UserList'
import GameList from '~/components/admin/GameList'
import SuggestedQuestions from '~/components/admin/SuggestedQuestions'
import ApprovedQuestions from '~/components/admin/ApprovedQuestions'
import AppLayout from '~/layouts/AppLayout'

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'suggested' | 'questions'>('suggested')

  return (
    <>
      <Head title="Admin Dashboard" />
      <GridBackground animated={false} type="profile" />
      <div className="h-full flex flex-col justify-center">
        <div className="overflow-y-auto px-4 md:px-8 py-4">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-4 sm:gap-6 md:gap-8">
            {/* Section principale */}
            <div className="grid xl:grid-rows-[auto_1fr] gap-6 min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[minmax(200px,290px)]">
                <UserList />

                {/* Parties en cours */}
                <GameList />
              </div>

              {/* Contenu principal tabulaire */}
              <div className="h-full bg-gradient-to-br from-slate-800/80 via-purple-900/10 to-slate-800/80 border border-purple-400/30 rounded-lg backdrop-blur-md shadow-lg transition-all duration-300 hover:border-purple-400/50 flex flex-col min-h-0">
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
                <div className="flex-1 p-5 overflow-hidden min-h-0 max-h-[500px] xl:max-h-[480px]">
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

Admin.layout = (page: React.ReactNode) => <AppLayout children={page} />

export default Admin
