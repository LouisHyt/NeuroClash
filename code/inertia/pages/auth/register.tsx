import Navbar from "~/partials/Navbar"
import GridBackground from "~/components/GridBackground"
import { Head } from "@inertiajs/react"

const Register = () => {

  return (
    <>
      <Head title="Register"/>
      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
        <GridBackground animated={true} iconsDensity={22} type="auth"/>
        <Navbar />

        {/* Zone de connexion */}
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-1 text-fuchsia-200/80">
          <div className="flex flex-col gap-5">
            <p className="text-2xl color-gray-200 uppercase font-bold">
              Where it all begins
            </p>
            <h2 className="text-4xl font-bold text-white">Join the adventure!</h2>
            <p>Already a member? <a href="/register" className="underline text-cyan-500">Log in</a></p>
          </div>
          <form action="" className="flex flex-col gap-4 max-w-xl mt-8">
            
            {/* Champ Username avec label flottant */}
            <div className="relative mb-4 flex gap-5">
              <div className="relative flex-1 border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                <input 
                  type="text" 
                  id="username"
                  placeholder="Username"
                  className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 pr-10 peer"
                />
                <label 
                  htmlFor="username" 
                  className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                >
                  Username
                </label>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              <div className="relative flex-1 border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                <input 
                  type="email" 
                  id="email"
                  placeholder="Email"
                  className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 pr-10 peer"
                />
                <label 
                  htmlFor="email" 
                  className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                >
                  Email
                </label>
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Champ Passwords avec label flottant */}
            <div className="relative mb-1">
              <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                <input 
                  type="password" 
                  id="password"
                  placeholder="Password"
                  className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 pr-10 peer"
                />
                <label 
                  htmlFor="password" 
                  className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                >
                  Password
                </label>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative mb-1">
              <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                <input 
                  type="password" 
                  id="confirm_password"
                  placeholder="ConfirmPassword"
                  className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 pr-10 peer"
                />
                <label 
                  htmlFor="confirm_password" 
                  className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
                >
                  Password confirmation
                </label>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Remember me */}
            <div className="flex items-center mt-2">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="sr-only"
                />
                <div className="w-5 h-5 border border-violet-500/50 rounded flex items-center justify-center bg-black/30 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">I agree to the <a href="/register" className="underline text-cyan-500">Terms & Conditions</a></label>
              </div>
            </div>
            
            {/* Bouton Login */}
            <button 
              type="submit" 
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-3 rounded-lg font-semibold mt-6 cursor-pointer"
            >
              Create account
            </button>
          </form> 
        </div>
      </div>
    </>
  )
}

export default Register
