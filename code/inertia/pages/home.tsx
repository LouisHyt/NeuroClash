import { useState } from "react"
import Navbar from "~/partials/Navbar"
import { Head } from "@inertiajs/react"
import GridBackground from "../components/GridBackground"

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqItems = [
    {
      question: "How does the Elo system work?",
      answer:
        "The Elo system calculates your level based on your wins and losses. The higher ranked your opponents are, the more points you gain from winning. It's the same system used in chess.",
    },
    {
      question: "How to create a private game?",
      answer:
        "Click on 'Create Game', select 'Private Game' and invite your friends via their username or email. You can also generate an invitation link.",
    },
    {
      question: "Are the questions verified?",
      answer:
        "Yes, all our questions are carefully verified by our team of moderators and experts in different fields to ensure their accuracy.",
    },
    {
      question: "How to participate in tournaments?",
      answer:
        "Tournaments are accessible from your dashboard. Sign up for free, choose your time slot, and compete against other players for exclusive rewards.",
    },
  ]

  return (
    <>
      <Head title="Home"/>
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
        <Navbar />
        <GridBackground type="default" animated={true}/>

        <section className="py-20 relative">
          <div className="text-center relative">
            <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 mb-12 leading-tight md:leading-tight px-4 py-2">
              Level Up your knowledge by having fun!
            </h2>
            <p className="text-fuchsia-200/80 mb-12 max-w-2xl mx-auto p-2">
              Join a passionate community, test your knowledge, and climb the
              global rankings!
            </p>
            <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">
              <button className="cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-colors max-w-max">
                <span>Start the Adventure</span>
              </button>
              <button className="cursor-pointer bg-black/40 text-fuchsia-400 px-8 py-4 rounded-lg text-lg font-semibold transition-colors hover:bg-black/60 border border-violet-500/20 max-w-max">
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 relative">
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
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Global Ranking
                </h3>
                <p className="text-fuchsia-200/70">
                  Challenge the best players and climb the rankings.
                </p>
              </div>

              <div className="group bg-black/40 p-6 rounded-xl border border-violet-500/20">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Friends List
                </h3>
                <p className="text-fuchsia-200/70">
                  Play with your friends and share your achievements.
                </p>
              </div>

              <div className="group bg-black/40 p-6 rounded-xl border border-violet-500/20">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Diverse Questions
                </h3>
                <p className="text-fuchsia-200/70">
                  Thousands of questions across different categories.
                </p>
              </div>

              {/* Rank and Elo card */}
              <div className="group bg-black/40 p-6 rounded-xl border border-violet-500/20">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                  </svg>
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
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Ranked & Private Games
                </h3>
                <p className="text-fuchsia-200/70">
                  Competitive mode or friendly games, you choose.
                </p>
              </div>

              {/* Rewards & Achievements card */}
              <div className="group bg-black/40 p-6 rounded-xl border border-violet-500/20">
                <div className="h-12 w-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                  Rewards & Achievements
                </h3>
                <p className="text-fuchsia-200/70">
                  Unlock unique badges and rewards by completing challenges.
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
                    <span className="text-violet-100 font-medium">
                      {item.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-violet-400 transform transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                        />
                    </svg>
                  </button>
                    <div className={`
                      px-6 text-violet-200/70 grid grid-rows-[0fr] transition-all duration-200
                      ${openFaq === index ? "grid-rows-[1fr] pb-4" : ""}
                      `}>
                      <p className="overflow-hidden">
                        {item.answer}
                      </p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-4 border-t border-violet-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-fuchsia-200/50">
              <a
                href="/privacy"
                className="hover:text-fuchsia-200/70 transition-colors"
                >
                Privacy Policy
              </a>
              <span className="mx-2">•</span>
              <a
                href="/terms"
                className="hover:text-fuchsia-200/70 transition-colors"
                >
                Terms of Service
              </a>
              <div className="mt-2 text-xs">
                2025 BrainStorm. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home
