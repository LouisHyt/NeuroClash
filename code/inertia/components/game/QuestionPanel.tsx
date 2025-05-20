import { AnimatePresence, motion } from 'motion/react'
import type { QuestionPanelProps } from '~/pages/game/play.types'
import HorizontalTimer from './HorizontalTimer'
import Difficulties from '#enums/Difficulties'

const QuestionPanel = ({
  question,
  timeLeft,
  maxTime,
  damageMultiplier,
  selectedAnswer,
  correctAnswerId,
  gameEnded,
  handleAnswer,
}: QuestionPanelProps) => {
  return (
    <div className="w-full mb-7 sm:mb-0">
      <AnimatePresence mode="popLayout">
        {!correctAnswerId ? (
          <motion.div
            layout
            className="flex flex-col items-center mb-5 sm:mb-6 xl:mb-10"
            key={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HorizontalTimer timeLeft={timeLeft} initialTime={maxTime} />
          </motion.div>
        ) : (
          <motion.div
            layout
            key={2}
            className="flex flex-col items-center mb-9 sm:mb-7 lg:mb-10 text-sm sm:text-base lg:text-lg text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>
              {gameEnded
                ? "The game is over, you'll be redirected..."
                : 'Get ready for the next question...'}
            </p>
          </motion.div>
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          {/* Question */}
          <motion.div
            layout
            key={`question-${question.id}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97, transition: { delay: 0.35 } }}
            transition={{ duration: 0.3 }}
            className="md:mx-15 xl:mx-0"
          >
            <div className="mb-2 sm:mb-4 lg:mb-6 relative">
              <motion.div
                className="absolute scale-[0.7] sm:scale-90 lg:scale-100 -top-4 -right-2 mt-1 mr-1 bg-gray-900/90 px-2 py-1 rounded-lg border border-indigo-500/40 shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs sm:text-sm text-indigo-300">Damages:</span>
                  <span
                    className={`text-xs sm:text-sm font-bold ${
                      damageMultiplier >= 2
                        ? 'text-red-400'
                        : damageMultiplier >= 1.5
                          ? 'text-yellow-400'
                          : 'text-green-400'
                    }`}
                  >
                    x{damageMultiplier}
                  </span>
                </div>
              </motion.div>

              {/* Question informations */}
              <div className="absolute -top-2 -left-2 flex items-center z-10 scale-[0.7] sm:scale-90 lg:scale-100">
                {/* Catégory */}
                <div className="bg-blue-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-l-md shadow-md flex items-center">
                  {question.theme.name}
                </div>

                {/* Difficulty */}
                <div className="bg-gray-900 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-r-md shadow-md border-l border-white/10 flex items-center">
                  <div className="flex mr-0.5 sm:mr-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 sm:w-1.5 h-1 sm:h-1.5 mx-0.5 rounded-full ${
                          i <
                          (question.difficulty.id === Difficulties.EASY
                            ? 1
                            : question.difficulty.id === Difficulties.MEDIUM
                              ? 2
                              : 3)
                            ? 'bg-indigo-400'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-indigo-300">
                    {question.difficulty.id === Difficulties.EASY
                      ? '1'
                      : question.difficulty.id === Difficulties.MEDIUM
                        ? '2'
                        : '3'}
                  </span>
                </div>
              </div>

              <div className="bg-gray-900/80 p-5 sm:p-5 lg:p-7 rounded-xl border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
                {question.image && (
                  <div className="mb-2 sm:mb-3 lg:mb-4 flex justify-center">
                    <motion.div
                      className="relative w-full max-w-[150px] sm:max-w-sm overflow-hidden rounded-lg border border-indigo-500/30"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <img
                        src={question.image.url}
                        alt="Question illustration"
                        className="w-full h-auto max-h-[120px] sm:max-h-[180px] lg:max-h-[200px] object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent pointer-events-none"></div>
                    </motion.div>
                  </div>
                )}

                <p className="text-white text-sm md:text-lg xl:text-xl text-center font-medium">
                  {question.name}
                </p>
              </div>
            </div>

            {/* Answers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4">
              {question.answers
                .sort((a, b) => a.slot - b.slot)
                .map((answer, index) => (
                  <motion.button
                    key={answer.id}
                    className={`
                      p-1.5 sm:p-3 lg:p-4 rounded-lg border border-indigo-500/30 text-sm md:text-base xl:text-lg font-medium transition-colors relative overflow-hidden group
                      ${!correctAnswerId && selectedAnswer && selectedAnswer === answer.id && 'bg-indigo-600/20 text-white'}
                      ${!correctAnswerId && selectedAnswer && selectedAnswer !== answer.id && 'bg-gray-800/50 text-gray-600 cursor-not-allowed'}
                      ${!selectedAnswer && 'text-white cursor-pointer bg-gray-900/80 hover:bg-indigo-600/20'}
                      ${correctAnswerId && answer.id === correctAnswerId && 'bg-green-600/20 text-white'}
                      ${correctAnswerId && answer.id !== correctAnswerId && 'bg-red-600/20 text-white'}
                    `}
                    whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
                    whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                    onClick={() => handleAnswer(answer.id)}
                  >
                    {/* Lettre de l'option */}
                    <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-300 text-xs sm:text-sm lg:text-base font-bold border border-indigo-500/30">
                      {String.fromCharCode(65 + index)}
                    </div>

                    {/* Texte de la réponse */}
                    <div className="pl-8 sm:pl-9 lg:pl-10">{answer.name}</div>
                  </motion.button>
                ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </AnimatePresence>
    </div>
  )
}

export default QuestionPanel
