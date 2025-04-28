import Navbar from '~/partials/Navbar'
import { Head } from '@inertiajs/react'
import GridBackground from '../components/GridBackground'

function Rules() {
  return (
    <>
      <Head title="Rules" />
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
        <Navbar />
        <GridBackground type="default" animated={true} />

        <section className="py-20 relative">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-10 text-center">NeuroClash Community Rules</h1>
            
            <div className="rounded-xl p-6 md:p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-purple-400 mb-3">General Conduct</h2>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>Treat all players with respect and courtesy regardless of their background, skill level, or gaming style.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>Harassment, hate speech, discrimination, or bullying of any kind will not be tolerated and may result in immediate account suspension.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span>
                      <span>Keep conversations appropriate. Excessive profanity, explicit content, or inflammatory language is prohibited.</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold text-blue-400 mb-3">Fair Play</h2>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Cheating, exploiting bugs, or using unauthorized third-party software is strictly prohibited.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Account sharing, boosting, or deliberately manipulating the ranking system is not allowed.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Intentionally disconnecting to avoid a loss or sabotaging games will result in penalties.</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-3">Account Security</h2>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>You are responsible for maintaining the security of your account and password.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>Never share your login credentials with others or attempt to access another player's account.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">•</span>
                      <span>
                        Report any suspicious activity or security concerns to our {' '}
                        <a href="mailto:support@neuroclash.com" className='text-blue-400 hover:text-blue-300 hover:underline'>support team</a> {' '}
                        immediately.
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold text-amber-400 mb-3">Penalties</h2>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>Violations of these rules may result in warnings, temporary suspensions, or permanent bans depending on the severity and frequency.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>Banned players may appeal their case through our support system, but decisions are at the discretion of the administration team.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span>NeuroClash reserves the right to modify these rules at any time to maintain a fair and enjoyable gaming environment.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-10 pt-6 border-t border-gray-800 text-center">
                <p className="text-gray-400 italic">By creating an account and playing NeuroClash, you agree to these community rules. Our goal is to create a competitive yet respectful environment where all players can enjoy the game.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Rules
