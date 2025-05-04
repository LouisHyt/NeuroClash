import { useState } from 'react'
import Navbar from '~/partials/Navbar'
import { Head } from '@inertiajs/react'
import { Link } from '@tuyau/inertia/react'
import GridBackground from '../components/GridBackground'
import {
  FaArrowUpWideShort,
  FaUserGroup,
  FaFileCircleQuestion,
  FaGamepad,
  FaBolt,
  FaStairs,
  FaChevronDown,
} from 'react-icons/fa6'
import Footer from '~/partials/Footer'
import Flashes from '~/partials/Flashes'

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqItems = [
    {
      question: 'How does the Elo system work?',
      answer:
        "The Elo system calculates your level based on your wins and losses. The higher ranked your opponents are, the more points you gain from winning. It's the same system used in chess.",
    },
    {
      question: 'How to create a private game?',
      answer:
        "On your dashboard, click on 'Create private game'. A unique code will be given to you so you can share it with your friends. They can then join your lobby by clicking on 'Join game' and entering the code.",
    },
    {
      question: 'Are the questions verified?',
      answer:
        'Yes, all our questions are carefully verified by our administrators to ensure their accuracy.',
    },
    {
      question: 'I encoutered a problem or a bug. How can i report it?',
      answer:
        'If you encounter a problem, you can report it by sending an email at support@neuroclash.com. It will help us improve the platform!',
    },
    {
      question: "My account has been suspended and i don't know why !",
      answer: `If you have been suspended, you probably violated our rules. If you think this is a mistake, you can contact our support team at support@neuroclash.com`,
    },
  ]

  return (
    <>
      <Head title="Home" />
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden grid grid-rows-[auto_1fr_auto]">
        <Navbar />
        <Flashes />
        <GridBackground type="default" animated={true} />

        <section className="py-20 relative">
          <div className="text-center relative">
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 mb-12 leading-tight md:leading-tight px-4 py-2">
              Level Up your knowledge by having fun!
            </h2>
            <p className="text-fuchsia-200/80 mb-12 max-w-2xl mx-auto p-2">
              Join a passionate community, test your knowledge, and climb the global rankings!
            </p>
            <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">
              <Link
                route="auth.register.show"
                className="cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-colors max-w-max"
              >
                <span>Start the Adventure</span>
              </Link>
              <a
                href="#features"
                className="cursor-pointer bg-black/40 text-fuchsia-400 px-8 py-4 rounded-lg text-lg font-semibold transition-colors hover:bg-black/60 border border-violet-500/20 max-w-max"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 relative" id="features">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500">
                Discover our Features
              </h2>
              <p className="text-violet-200/60 mt-4 max-w-2xl mx-auto">
                A unique and personalized learning experience
              </p>
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-8">
              <div className="group bg-black/40 p-6 rounded-xl border border-violet-500/20">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4">
                  <FaArrowUpWideShort color="white" size={22} />
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Competition
                </h3>
                <p className="text-fuchsia-200/70">
                  Challenge the best players and climb the rankings.
                </p>
              </div>

              <div className="group bg-black/40 p-6 rounded-xl border border-violet-500/20">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4">
                  <FaFileCircleQuestion color="white" size={22} />
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Diverse Questions
                </h3>
                <p className="text-fuchsia-200/70">
                  Thousands of questions across different categories.
                </p>
              </div>

              <div className="group bg-black/40 p-6 rounded-xl border border-violet-500/20">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4">
                  <FaBolt color="white" size={22} />
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Engagement
                </h3>
                <p className="text-fuchsia-200/70">
                  Contribute to the evolution of Neuroclash by proposing your own questions.
                </p>
              </div>

              {/* Rank and Elo card */}
              <div className="group bg-black/40 p-6 rounded-xl border border-violet-500/20">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4">
                  <FaStairs color="white" size={22} />
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Rank & Elo
                </h3>
                <p className="text-fuchsia-200/70">
                  Dynamic ranking system based on your performance.
                </p>
              </div>

              {/* Ranked and Private Games card */}
              <div className="group bg-black/40 p-6 rounded-xl border border-violet-500/20">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4">
                  <FaGamepad color="white" size={22} />
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Games
                </h3>
                <p className="text-fuchsia-200/70">
                  Competitive mode or friendly games, you choose.
                </p>
              </div>

              {/* Rewards & Achievements card */}
              <div className="group bg-black/40 p-6 rounded-xl border border-violet-500/20">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4">
                  <FaUserGroup color="white" size={22} />
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Community
                </h3>
                <p className="text-fuchsia-200/70">
                  Chat with the other players and share your progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 relative p-2">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500">
              Frequently Asked Questions
            </h2>
            <p className="text-violet-200/60 mt-4 max-w-2xl mx-auto">
              Everything you need to know to get started
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-black/20 backdrop-blur-sm border border-violet-500/20 rounded-xl overflow-hidden transition-all duration-200 hover:border-violet-500/40"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer"
                  >
                    <span className="text-violet-100 font-medium">{item.question}</span>
                    <FaChevronDown
                      className={`text-violet-400 transform transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`
                      px-6 text-violet-200/70 grid grid-rows-[0fr] transition-all duration-200
                      ${openFaq === index ? 'grid-rows-[1fr] pb-4' : ''}
                      `}
                  >
                    <p className="overflow-hidden">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default Home
