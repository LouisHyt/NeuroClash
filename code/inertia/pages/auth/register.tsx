import { Head, useForm } from '@inertiajs/react'

function register() {
  const { data, setData, post, processing, errors } = useForm({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/register')
  }

  return (
    <>
      <Head title="Register" />
      <div className="register-container container">
        <h1>Register</h1>
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
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              name="email"
              id="email"
              placeholder=" "
              required
              />
            <label htmlFor="email">Email address</label>
            {errors.email && <div className="error-message">{errors.email}</div>}
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
          <div className="form-group">
            <input
              type="password"
              value={data.confirm_password}
              onChange={(e) => setData('confirm_password', e.target.value)}
              name="confirm_password"
              id="confirm_password"
              placeholder=" "
              required
              />
            <label htmlFor="confirm_password">Confirm Password</label>
            {errors.confirm_password && <div className="error-message">{errors.confirm_password}</div>}
          </div>
          <button type="submit" className="form-button" disabled={processing}>
            Register
          </button>
        </form>
      </div>
    </>
  )
}

export default register
