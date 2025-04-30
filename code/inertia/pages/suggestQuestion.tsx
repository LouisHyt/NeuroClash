import { Head, useForm } from '@inertiajs/react'
import Navbar from '~/partials/Navbar'
import GridBackground from '~/components/GridBackground'
import Footer from '~/partials/Footer'
import Flashes from '~/partials/Flashes'
import { useState, useRef } from 'react'
import { FaChevronDown, FaCheck } from 'react-icons/fa6'
import { motion, AnimatePresence } from 'motion/react'

const SuggestQuestion = () => {
  const { data, setData, post, processing, errors } = useForm({
    theme: '',
    difficulty: '',
    question: '',
    image: null as File | null,
    answers: [
      { text: '', isCorrect: true, order: 0, id: 1 },
      { text: '', isCorrect: false, order: 1, id: 2 },
      { text: '', isCorrect: false, order: 2, id: 3 },
      { text: '', isCorrect: false, order: 3, id: 4 },
    ],
  })

  const [answers, setAnswers] = useState(data.answers)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/suggest-question')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setData('image', file)
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setData('image', null)
      setPreviewUrl(null)
    }
  }

  const removeImage = () => {
    setData('image', null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const updateAnswer = (index: number, text: string) => {
    const newAnswers = [...answers]
    newAnswers[index].text = text
    setAnswers(newAnswers)
    setData('answers', newAnswers)
  }

  const moveAnswer = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === answers.length - 1)
    ) {
      return
    }

    const newAnswers = [...answers]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    // Switch places
    const temp = newAnswers[index]
    newAnswers[index] = newAnswers[targetIndex]
    newAnswers[targetIndex] = temp

    // Update the order
    newAnswers[index].order = index
    newAnswers[targetIndex].order = targetIndex

    setAnswers(newAnswers)
    setData('answers', newAnswers)
  }

  const setCorrectAnswer = (index: number) => {
    const newAnswers = answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === index,
    }))
    setAnswers(newAnswers)
    setData('answers', newAnswers)
  }

  return (
    <>
      <Head title="Suggest Question" />
      <Flashes />
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden text-fuchsia-200/80 grid grid-rows-[auto_1fr_auto]">
        <GridBackground animated={true} type="questions" iconsDensity={21} />
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 relative z-1">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Suggest a question</h2>
            <p className="text-fuchsia-200/80">
              Submit your own question to enrich our quiz database.
            </p>
          </div>

          <form className="flex flex-col gap-4 sm:gap-5 md:gap-6 max-w-6xl" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
              {/* Thème */}
              <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                <div className="flex flex-col gap-1">
                  <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                    <select
                      id="theme"
                      name="theme"
                      required
                      value={data.theme}
                      onChange={(e) => setData('theme', e.target.value)}
                      className="w-full bg-transparent px-4 py-3 text-white outline-none pt-5 pb-2 appearance-none peer select-custom"
                    >
                      <option value="" disabled></option>
                      <option value="science">Science</option>
                      <option value="history">Histoire</option>
                      <option value="geography">Géographie</option>
                      <option value="literature">Littérature</option>
                      <option value="art">Art</option>
                      <option value="sports">Sports</option>
                      <option value="technology">Technologie</option>
                      <option value="gaming">Jeux vidéo</option>
                    </select>
                    <label
                      htmlFor="theme"
                      className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                    >
                      Theme
                    </label>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <FaChevronDown className="text-violet-400 transform transition-transform" />
                    </div>
                  </div>
                  {errors.theme && <div className="text-red-500 text-sm mt-1">{errors.theme}</div>}
                </div>

                {/* Difficulté */}
                <div className="flex flex-col gap-1">
                  <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                    <select
                      id="difficulty"
                      name="difficulty"
                      required
                      value={data.difficulty}
                      onChange={(e) => setData('difficulty', e.target.value)}
                      className="w-full bg-transparent px-4 py-3 text-white outline-none pt-5 pb-2 appearance-none peer select-custom"
                    >
                      <option value="" disabled></option>
                      <option value="easy">Facile</option>
                      <option value="medium">Moyen</option>
                      <option value="hard">Difficile</option>
                      <option value="expert">Expert</option>
                    </select>
                    <label
                      htmlFor="difficulty"
                      className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                    >
                      Difficulty
                    </label>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <FaChevronDown className="text-violet-400 transform transition-transform" />
                    </div>
                  </div>
                  {errors.difficulty && (
                    <div className="text-red-500 text-sm mt-1">{errors.difficulty}</div>
                  )}
                </div>
                {/* Question */}
                <div className="flex flex-col gap-1">
                  <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                    <input
                      type="text"
                      id="question"
                      name="question"
                      placeholder="Question"
                      required
                      value={data.question}
                      onChange={(e) => setData('question', e.target.value)}
                      className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer"
                    />
                    <label
                      htmlFor="question"
                      className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                    >
                      Question
                    </label>
                  </div>
                  {errors.question && (
                    <div className="text-red-500 text-sm mt-1">{errors.question}</div>
                  )}
                </div>

                {/* Upload d'image */}
                <div className="flex flex-col gap-2">
                  <label className="text-fuchsia-200/80 font-medium">Image (optional)</label>
                  <div className="flex flex-col gap-3">
                    <div className="relative border-2 border-dashed border-violet-500/30 rounded-lg bg-black/30 hover:border-violet-500/50 transition-colors p-4">
                      <input
                        type="file"
                        id="image"
                        name="image"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center justify-center py-3 sm:py-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-violet-400 mb-2"
                        >
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                        <p className="text-fuchsia-200/80 text-center text-sm sm:text-base">
                          Drag and drop an image here or click to browse
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">
                          PNG, JPG, GIF up to 2 MB
                        </p>
                      </div>
                    </div>

                    {previewUrl && (
                      <div className="relative mt-2 rounded-lg overflow-hidden bg-black/50 border border-violet-500/30">
                        <img
                          src={previewUrl}
                          alt="Aperçu de l'image"
                          className="w-full max-h-60 object-contain"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-black/70 text-white p-1.5 rounded-full hover:bg-red-600/80 transition-colors"
                          title="Supprimer l'image"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                </div>
              </div>
              {/* Réponses */}
              <div className="mt-6 lg:mt-0">
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                  <AnimatePresence mode="popLayout">
                    {answers.map((answer, index) => (
                      <motion.div
                        layout
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                          mass: 1,
                        }}
                        key={answer.id || index}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <div className="flex-1">
                          <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                            <input
                              type="text"
                              placeholder={`Réponse ${index + 1}`}
                              required
                              value={answer.text}
                              onChange={(e) => updateAnswer(index, e.target.value)}
                              className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 peer"
                            />
                            <label className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300">
                              Answer {index + 1}
                            </label>
                          </div>
                        </div>

                        {/* Bouton pour marquer une question comme correcte */}
                        <button
                          type="button"
                          onClick={() => setCorrectAnswer(index)}
                          className={`cursor-pointer p-2 rounded-lg ${answer.isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-gray-700/20 text-gray-400'}`}
                          title="Mark as correct"
                        >
                          <FaCheck size={21} />
                        </button>

                        {/* Boutons pour réorganiser les réponses */}
                        <div className="flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => moveAnswer(index, 'up')}
                            disabled={index === 0}
                            className={`cursor-pointer p-1 rounded ${index === 0 ? 'text-gray-600' : 'text-gray-400 hover:text-violet-300'}`}
                            title="Up"
                          >
                            <FaChevronDown size={15} className="rotate-180" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveAnswer(index, 'down')}
                            disabled={index === answers.length - 1}
                            className={`cursor-pointer p-1 rounded ${index === answers.length - 1 ? 'text-gray-600' : 'text-gray-400 hover:text-violet-300'}`}
                            title="Down"
                          >
                            <FaChevronDown size={15} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bouton de soumission du formulaire */}
            <div className="mt-6 md:mt-8 flex justify-center sm:justify-start">
              <button
                type="submit"
                disabled={processing}
                className="cursor-pointer px-5 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {processing ? 'Envoi en cours...' : 'Soumettre la question'}
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default SuggestQuestion
