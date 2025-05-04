import Navbar from '~/partials/Navbar'
import GridBackground from '~/components/GridBackground'
import { Head, useForm } from '@inertiajs/react'
import { Link } from '@tuyau/inertia/react'
import { tuyau } from '~/utils/api'
import AuthLayout from '~/layouts/AuthLayout'

const Register = () => {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    approve_conditions: false as boolean,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post(tuyau.register.$url())
  }

  return (
    <>
      <Head title="Register" />
      {/* Zone de connexion */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-1 text-fuchsia-200/80">
        <div className="flex flex-col gap-5">
          <p className="text-2xl color-gray-200 uppercase font-bold text-pretty">
            Where it all begins
          </p>
          <h2 className="text-4xl font-bold text-white">Join the adventure!</h2>
          <p>
            Already a member?{' '}
            <a href="/register" className="underline text-cyan-500">
              Log in
            </a>
          </p>
        </div>
        <form className="flex flex-col gap-4 max-w-xl mt-8" onSubmit={handleSubmit}>
          {/* Champ Username avec label flottant */}
          <div className="relative mb-4 flex flex-col sm:flex-row gap-5">
            <div className="flex-1 justify-start flex flex-col gap-1">
              <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                <input
                  type="text"
                  id="username"
                  name="username"
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              {errors.username && (
                <div className="text-red-500 text-sm mt-1">{errors.username}</div>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  required
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>
          </div>

          {/* Champ Passwords avec label flottant */}
          <div className="relative mb-1 flex flex-col gap-1">
            <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                required
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
            </div>
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
          </div>
          <div className="relative mb-1 flex flex-col gap-1">
            <div className="relative border border-violet-500/30 rounded-lg bg-black/30 focus-within:border-violet-500 transition-colors">
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={data.confirm_password}
                onChange={(e) => setData('confirm_password', e.target.value)}
                required
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
            </div>
            {errors.confirm_password && (
              <div className="text-red-500 text-sm mt-1">{errors.confirm_password}</div>
            )}
          </div>

          {/* Accept terms */}
          <div className="flex flex-col gap-1 mt-2">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="sr-only"
                required
                checked={data.approve_conditions}
                onChange={(e) => setData('approve_conditions', e.target.checked)}
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-300 cursor-pointer flex items-center"
              >
                <div className="w-5 h-5 border border-violet-500/50 rounded flex items-center justify-center bg-black/30 mr-3">
                  {data.approve_conditions && (
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
                <p>
                  I agree to the{' '}
                  <Link route="home.show" className="underline text-cyan-500">
                    Terms & Conditions
                  </Link>{' '}
                  And the{' '}
                  <Link route="rules.show" className="underline text-cyan-500">
                    Community rules
                  </Link>
                </p>
              </label>
            </div>
            {errors.approve_conditions && (
              <div className="text-red-500 text-sm mt-1">{errors.approve_conditions}</div>
            )}
          </div>

          {/* Bouton Login */}
          <button
            type="submit"
            disabled={processing}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-3 rounded-lg font-semibold mt-6 cursor-pointer"
          >
            Create account
          </button>
        </form>
      </div>
    </>
  )
}

Register.layout = (page: React.ReactNode) => <AuthLayout children={page} />

export default Register
