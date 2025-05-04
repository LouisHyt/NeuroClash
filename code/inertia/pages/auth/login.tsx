import Navbar from '~/partials/Navbar'
import GridBackground from '~/components/GridBackground'
import { Head, useForm } from '@inertiajs/react'
import Flashes from '~/partials/Flashes'
import Footer from '~/partials/Footer'
import { useState } from 'react'
import { VscEyeClosed, VscEye } from 'react-icons/vsc'
import { FiUser } from 'react-icons/fi'
import AuthLayout from '~/layouts/AuthLayout'

const Login = () => {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
    remember_me: false as boolean,
    E_INVALID_CREDENTIALS: '',
  })

  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Login" />
      {/* Zone de connexion */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-1 text-fuchsia-200/80">
        <div className="flex flex-col gap-5">
          <p className="text-2xl color-gray-200 uppercase font-bold text-pretty">
            Ready for another round ?
          </p>
          <h2 className="text-4xl font-bold text-white">Welcome back!</h2>
          <p>
            Not a member ?{' '}
            <a href="/register" className="underline text-cyan-500">
              Register
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mt-8">
          {/* Champ Username avec label flottant */}
          <div className="relative mb-4 flex flex-col gap-1">
            <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                value={data.username}
                onChange={(e) => setData('username', e.target.value)}
                className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 pr-10 peer"
              />
              <label
                htmlFor="username"
                className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
              >
                Username
              </label>
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <FiUser size={25} />
              </div>
            </div>
            {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
          </div>

          {/* Champ Password avec label flottant */}
          <div className="relative flex flex-col gap-1">
            <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                required
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="w-full bg-transparent placeholder-transparent px-4 py-3 text-white outline-none pt-5 pb-2 pr-10 peer appearance-none"
              />
              <label
                htmlFor="password"
                className="absolute text-gray-400 text-xs left-4 top-1.5 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus-within:text-xs peer-focus-within:top-1.5 peer-focus-within:text-violet-300"
              >
                Password
              </label>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                aria-controls="password"
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                aria-pressed={passwordVisible}
              >
                {passwordVisible ? (
                  <VscEyeClosed size={25} aria-hidden={true} />
                ) : (
                  <VscEye size={25} aria-hidden={true} />
                )}
              </button>
            </div>
            <div className="flex justify-end mt-1">
              <a href="/forgot-password" className="text-xs text-gray-400 hover:text-violet-400">
                Forgot Password?
              </a>
            </div>
            {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
          </div>

          {/* Remember me */}
          <div className="flex flex-col gap-1">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="sr-only"
                checked={data.remember_me}
                onChange={(e) => setData('remember_me', e.target.checked)}
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-300 cursor-pointer flex items-center"
              >
                <div className="w-5 h-5 border border-violet-500/50 rounded flex items-center justify-center bg-black/30 mr-3">
                  {data.remember_me && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-violet-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <p className="select-none">Remember me</p>
              </label>
            </div>
            {errors.remember_me && (
              <div className="text-red-500 text-sm mt-1">{errors.remember_me}</div>
            )}
          </div>
          {/* Bouton Login */}
          <button
            type="submit"
            disabled={processing}
            className="cursor-pointer bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-3 rounded-lg font-semibold mt-6"
          >
            Login
          </button>
          {errors.E_INVALID_CREDENTIALS && (
            <div className="text-red-500 text-sm mt-1 text-center">
              {errors.E_INVALID_CREDENTIALS}
            </div>
          )}
        </form>
      </div>
    </>
  )
}

Login.layout = (page: React.ReactNode) => <AuthLayout children={page} />

export default Login
