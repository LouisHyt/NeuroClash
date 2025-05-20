import { usePage } from '@inertiajs/react'
import { useState } from 'react'
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi'

import type AdminController from '#controllers/admin_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'

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
const ApprovedQuestions = () => {
  const { approvedQuestions } = usePage<InferPageProps<AdminController, 'showDashboard'>>().props

  const [questions, setQuestions] = useState<Question[]>([
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

  return (
    <div>
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <HiOutlineQuestionMarkCircle className="text-purple-400" />
        <span>Toutes les questions</span>
      </h3>
      <div className="overflow-y-auto snap-y">
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
            {questions.map((question, idx) => (
              <tr key={question.id} className={idx % 2 === 0 ? 'bg-purple-500/5' : ''}>
                <td className="px-3 py-2 whitespace-nowrap text-sm">{question.content}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm">{question.category}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm">{question.difficulty}</td>
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
                <td className="px-3 py-2 whitespace-nowrap text-sm">{question.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ApprovedQuestions
