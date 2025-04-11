import { Head, useForm } from '@inertiajs/react'

function login() {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    password: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <>
      <Head title="Login" />
      <div className="container login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={data.username}
              onChange={(e) => setData('username', e.target.value)}
              name="username"
              id="username"
              placeholder=" "
              required
            />
            <label htmlFor="username">Username</label>
            {errors.username && <div className="error-message">{errors.username}</div>}
          </div>
          <div className="form-group">
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              name="password"
              id="password"
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          <button className="form-button" type="submit" disabled={processing}>
            Login
          </button>
        </form>
      </div>
    </>
  )
}

export default login
