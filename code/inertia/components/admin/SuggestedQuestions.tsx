import { motion } from 'motion/react'
import {
  HiOutlineCheck,
  HiOutlineQuestionMarkCircle,
  HiOutlineTag,
  HiOutlineTrash,
} from 'react-icons/hi'
import { IoChevronDown } from 'react-icons/io5'
import { useState } from 'react'
import { Link } from '@tuyau/inertia/react'

import type AdminController from '#controllers/admin_controller'
import type { InferPageProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/react'

const SuggestedQuestions = () => {
  const { suggestedQuestions } = usePage<InferPageProps<AdminController, 'showDashboard'>>().props
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({})

  // Fonction pour basculer l'état d'expansion d'une question
  const toggleQuestionExpansion = (questionId: number) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }))
  }

  return (
    <div className="h-full flex flex-col min-h-0 max-h-full">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4 flex-shrink-0">
        <HiOutlineQuestionMarkCircle className="text-purple-400 text-xl" />
        <span>Recent suggested questions</span>
      </h3>
      <div className="overflow-y-auto snap-y flex-1 flex flex-col gap-4 min-h-0 px-4">
        {suggestedQuestions.map((question) => (
          <motion.div
            key={question.id}
            data-id={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-lg border snap-start border-blue-800/40 bg-blue-600/5 shadow-md hover:shadow-lg transition-all duration-200 hover:border-blue-700/50"
          >
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <img
                      src={question.author.avatarUrl}
                      alt={question.author.username}
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">{question.author.username}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  {question.author.suggestedQuestions} suggested questions
                </span>
              </div>
              <div className="flex flex-row justify-between sm:justify-end items-center gap-3 sm:gap-5">
                <span className="text-xs text-gray-400">{question.createdAt}</span>
                <div className="flex items-center gap-2">
                  <Link
                    route="admin.question.approve"
                    data={{ questionId: question.id }}
                    title="Approve question"
                    className="cursor-pointer p-1 rounded-full bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-colors"
                  >
                    <HiOutlineCheck className="w-4 h-4" />
                  </Link>
                  <Link
                    route="admin.question.delete"
                    title="Delete question"
                    data={{ questionId: question.id }}
                    className="cursor-pointer p-1 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            <p className="text-sm mb-2 mt-2">{question.name}</p>

            {/* Tags et boutons */}
            <div className="flex flex-wrap justify-start items-center mb-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-violet-500/20 text-violet-300 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 mb-1">
                  <HiOutlineTag className="text-violet-400" />
                  {question.theme.name}
                </span>
                <span className="bg-fuchsia-500/20 text-fuchsia-300 text-xs px-2 py-0.5 rounded-full mb-1">
                  {question.difficulty.name}
                </span>
              </div>
            </div>

            {/* Bouton pour afficher/masquer les réponses */}
            <button
              onClick={() => toggleQuestionExpansion(question.id)}
              className="cursor-pointer w-full text-xs text-gray-400 hover:text-gray-300 flex items-center justify-center gap-1 mt-2 py-1 pt-3 border-t border-blue-800/30"
            >
              <IoChevronDown
                className={`text-blue-400 ${expandedQuestions[question.id] ? 'rotate-180' : ''}`}
                size={16}
              />
              {expandedQuestions[question.id] ? 'Hide the answers' : 'See the answers'}
            </button>

            {/* Réponses (affichées conditionnellement) */}
            {expandedQuestions[question.id] && (
              <div className="mt-2 pt-2 space-y-1.5">
                {question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={`text-xs p-1.5 rounded flex flex-wrap justify-between items-center ${
                      answer.isCorrect
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-gray-800/30 border border-gray-700/30'
                    }`}
                  >
                    <span className="flex flex-1 items-center gap-1.5 min-w-0 overflow-hidden">
                      <span className="bg-gray-800/50 text-gray-400 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">
                        {answer.slot}
                      </span>
                      <span className="truncate">{answer.name}</span>
                    </span>
                    {answer.isCorrect && (
                      <span className="text-green-400 flex items-center ml-2">
                        <HiOutlineCheck className="w-3.5 h-3.5 flex-shrink-0" />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default SuggestedQuestions
