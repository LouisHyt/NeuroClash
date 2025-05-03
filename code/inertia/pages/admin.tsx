import { useState } from 'react'
import { Head } from '@inertiajs/react'
import GridBackground from '~/components/GridBackground'
import Flashes from '~/partials/Flashes'
import Navbar from '~/partials/Navbar'
import GeneralChat from '~/components/GeneralChat'
import {
  HiOutlineQuestionMarkCircle,
  HiOutlinePlay,
  HiOutlineClock,
  HiOutlineTag,
  HiOutlineTrash,
  HiOutlineCheck,
} from 'react-icons/hi'
import { motion } from 'motion/react'

import UserList from '~/components/admin/UserList'
import GameList from '~/components/admin/GameList'

interface Question {
  id: string
  content: string
  category: string
  difficulty: string
  createdAt: string
  status: 'pending' | 'approved' | 'rejected'
  suggestedBy: {
    username: string
    avatarUrl: string
  }
}

const Admin = () => {
  // Ces données seraient normalement chargées depuis le backend

  const [suggestedQuestions, setSuggestedQuestions] = useState<Question[]>([
    {
      id: '1',
      content: 'Quelle est la capitale de la France?',
      category: 'Géographie',
      difficulty: 'Facile',
      createdAt: '2025-05-01',
      status: 'pending',
      suggestedBy: {
        username: 'NeuroPro',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
      },
    },
    {
      id: '2',
      content: "Quel est le symbole chimique de l'or?",
      category: 'Sciences',
      difficulty: 'Moyen',
      createdAt: '2025-05-01',
      status: 'pending',
      suggestedBy: {
        username: 'BrainMaster',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
      },
    },
    {
      id: '3',
      content: 'Qui a peint La Joconde?',
      category: 'Art',
      difficulty: 'Facile',
      createdAt: '2025-04-30',
      status: 'approved',
      suggestedBy: {
        username: 'MindQuest',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
      },
    },
  ])

  const [allQuestions, setAllQuestions] = useState<Question[]>([
    {
      id: '1',
      content: 'Quelle est la capitale de la France?',
      category: 'Géographie',
      difficulty: 'Facile',
      createdAt: '2025-05-01',
      status: 'pending',
      suggestedBy: {
        username: 'NeuroPro',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
      },
    },
    {
      id: '2',
      content: "Quel est le symbole chimique de l'or?",
      category: 'Sciences',
      difficulty: 'Moyen',
      createdAt: '2025-05-01',
      status: 'pending',
      suggestedBy: {
        username: 'BrainMaster',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
      },
    },
    {
      id: '3',
      content: 'Qui a peint La Joconde?',
      category: 'Art',
      difficulty: 'Facile',
      createdAt: '2025-04-30',
      status: 'approved',
      suggestedBy: {
        username: 'MindQuest',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
      },
    },
    {
      id: '4',
      content: "Quelle est la formule chimique de l'eau?",
      category: 'Sciences',
      difficulty: 'Facile',
      createdAt: '2025-04-29',
      status: 'approved',
      suggestedBy: {
        username: 'SynapseKing',
        avatarUrl: 'https://i.pravatar.cc/150?img=4',
      },
    },
    {
      id: '5',
      content: "En quelle année a été signée la Déclaration d'indépendance des États-Unis?",
      category: 'Histoire',
      difficulty: 'Difficile',
      createdAt: '2025-04-28',
      status: 'approved',
      suggestedBy: {
        username: 'CortexQueen',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      },
    },
  ])

  const [activeTab, setActiveTab] = useState<'suggested' | 'questions'>('suggested')

  // Fonctions de gestion (simulées)
  const handleApproveQuestion = (id: string) => {
    setSuggestedQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: 'approved' as const } : q))
    )
    setAllQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: 'approved' as const } : q))
    )
  }

  const handleRejectQuestion = (id: string) => {
    setSuggestedQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: 'rejected' as const } : q))
    )
    setAllQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: 'rejected' as const } : q))
    )
  }

  return (
    <>
      <Head title="Admin Dashboard" />
      <Flashes />
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden text-fuchsia-200/80 grid grid-rows-[auto_1fr_auto]">
        <GridBackground animated={false} type="profile" />
        <Navbar />
        <div className="admin-container w-full overflow-y-auto p-4">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-4 h-full max-h-full p-4 md:p-6">
            {/* Section principale */}
            <div className="grid xl:grid-rows-[290px_1fr] gap-4">
              <div className="grid grid-cols-1 grid-rows-[290px_auto] md:grid-cols-2 gap-4">
                <UserList />

                {/* Parties en cours */}
                <GameList />
              </div>

              {/* Contenu principal tabulaire */}
              <div className="bg-gradient-to-br from-slate-800/80 via-purple-900/10 to-slate-800/80 border border-purple-400/30 rounded-lg overflow-hidden backdrop-blur-md shadow-lg transition-all duration-300 hover:border-purple-400/50 flex flex-col">
                {/* Onglets */}
                <div className="flex border-b border-purple-500/20">
                  <button
                    className={`flex-1 py-3 px-4 font-medium text-sm focus:outline-none ${activeTab === 'suggested' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-purple-500/10'}`}
                    onClick={() => setActiveTab('suggested')}
                  >
                    Questions suggérées
                  </button>
                  <button
                    className={`flex-1 py-3 px-4 font-medium text-sm focus:outline-none ${activeTab === 'questions' ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-purple-500/10'}`}
                    onClick={() => setActiveTab('questions')}
                  >
                    Toutes les questions
                  </button>
                </div>

                {/* Contenu des onglets */}
                <div className="flex-1 overflow-y-auto p-4">
                  {activeTab === 'suggested' ? (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                        <HiOutlineQuestionMarkCircle className="text-purple-400" />
                        <span>Questions suggérées récemment</span>
                      </h3>
                      {suggestedQuestions.map((question) => (
                        <motion.div
                          key={question.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`p-3 rounded-lg border ${question.status === 'pending' ? 'border-yellow-500/30 bg-yellow-500/5' : question.status === 'approved' ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <img
                                src={question.suggestedBy.avatarUrl}
                                alt={question.suggestedBy.username}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm">{question.suggestedBy.username}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-400">{question.createdAt}</span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${question.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' : question.status === 'approved' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}
                              >
                                {question.status === 'pending'
                                  ? 'En attente'
                                  : question.status === 'approved'
                                    ? 'Approuvée'
                                    : 'Rejetée'}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm mb-2">{question.content}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="bg-violet-500/20 text-violet-300 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <HiOutlineTag className="text-violet-400" />
                                {question.category}
                              </span>
                              <span className="bg-fuchsia-500/20 text-fuchsia-300 text-xs px-2 py-0.5 rounded-full">
                                {question.difficulty}
                              </span>
                            </div>
                            {question.status === 'pending' && (
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleApproveQuestion(question.id)}
                                  className="p-1 rounded-full bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors"
                                >
                                  <HiOutlineCheck className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectQuestion(question.id)}
                                  className="p-1 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                                >
                                  <HiOutlineTrash className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                        <HiOutlineQuestionMarkCircle className="text-purple-400" />
                        <span>Toutes les questions</span>
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-purple-500/20">
                          <thead>
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                                Question
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                                Catégorie
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                                Difficulté
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                                Statut
                              </th>
                              <th className="px-3 py-2 text-left text-xs font-medium text-purple-300 uppercase tracking-wider">
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-500/10">
                            {allQuestions.map((question, idx) => (
                              <tr
                                key={question.id}
                                className={idx % 2 === 0 ? 'bg-purple-500/5' : ''}
                              >
                                <td className="px-3 py-2 whitespace-nowrap text-sm">
                                  {question.content}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">
                                  {question.category}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">
                                  {question.difficulty}
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap">
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${question.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' : question.status === 'approved' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}
                                  >
                                    {question.status === 'pending'
                                      ? 'En attente'
                                      : question.status === 'approved'
                                        ? 'Approuvée'
                                        : 'Rejetée'}
                                  </span>
                                </td>
                                <td className="px-3 py-2 whitespace-nowrap text-sm">
                                  {question.createdAt}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
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
