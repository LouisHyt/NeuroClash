import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth'
import User from '#models/user'
import Statistic from '#models/statistic'

export default class AuthController {
  showLogin({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async handleLogin(ctx: HttpContext) {
    const { username, password } = await ctx.request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(username, password)
    await ctx.auth.use('web').login(user)
    ctx.session.flash('success', `Welcome back ${username}!`)
    return ctx.response.redirect().toRoute('dashboard')
  }

  async showRegister(ctx: HttpContext) {
    return ctx.inertia.render('auth/register')
  }

  async handleRegister(ctx: HttpContext) {
    const { email, password, username } = await ctx.request.validateUsing(registerValidator)
    const user = await User.create({ email, password, username })
    await Statistic.create({ userUuid: user.uuid })
    ctx.session.flash('success', 'Account created successfully, please login')
    return ctx.response.redirect().toRoute('auth.login')
  }

  async logout(ctx: HttpContext) {
    await ctx.auth.use('web').logout()
    ctx.session.flash('success', 'Successfully logged out')
    return ctx.response.redirect().toRoute('auth.login')
  }
}
