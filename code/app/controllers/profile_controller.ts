import type { HttpContext } from '@adonisjs/core/http'
import {
  updatePasswordValidator,
  updateProfileValidator,
  updateProfileVarientValidator,
} from '#validators/profile'
import User from '#models/user'
import FlashKeys from '#enums/Flashes'

export default class ProfileController {
  async showProfile({ inertia }: HttpContext) {
    return inertia.render('profile')
  }

  async editProfile(ctx: HttpContext) {
    const user = ctx.auth.user!
    const { username, bio } = ctx.request.all()

    //If no information changed
    if (user.username === username && user.bio === bio) {
      ctx.session.flash(FlashKeys.WARNING, {
        W_NO_CHANGE: "You haven't done any changes. Your profile hasn't been updated",
      })
      return ctx.response.redirect().toRoute('profile')
    }

    //Only the bio changed
    if (user.username === username && user.bio !== bio) {
      const { bio: newBio } = await ctx.request.validateUsing(updateProfileVarientValidator)
      user.bio = newBio
      await user.save()
      ctx.session.flash(FlashKeys.SUCCESS, {
        W_NO_CHANGE: 'Your profile has been successfully updated!',
      })
      return ctx.response.redirect().toRoute('profile')
    }

    const { username: newUsername, bio: newBio } =
      await ctx.request.validateUsing(updateProfileValidator)
    user.username = newUsername
    user.bio = newBio
    await user.save()
    ctx.session.flash(FlashKeys.SUCCESS, {
      W_NO_CHANGE: 'Your profile has been successfully updated!',
    })
    return ctx.response.redirect().toRoute('profile')
  }

  async editPassword(ctx: HttpContext) {
    const user = ctx.auth.user!
    const { current_password, new_password } =
      await ctx.request.validateUsing(updatePasswordValidator)
    await User.verifyCredentials(user.username, current_password)

    //The new password is automatically hashed by AdonisJS
    user.password = new_password
    await user.save()

    ctx.session.flash(FlashKeys.SUCCESS, {
      W_NO_CHANGE: 'Your password has been successfully updated!',
    })

    return ctx.response.redirect().toRoute('profile')
  }

  async deleteAccount(ctx: HttpContext) {
    const user = ctx.auth.user!
    await user.delete()
    await ctx.auth.use('web').logout()
    ctx.session.flash(FlashKeys.SUCCESS, {
      W_NO_CHANGE: 'Your account has been successfully deleted!',
    })
    return ctx.response.redirect().toRoute('auth.login')
  }
}
