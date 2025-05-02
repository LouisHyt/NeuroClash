import type { HttpContext } from '@adonisjs/core/http'
import {
  updatePasswordValidator,
  updateProfileValidator,
  updateProfileVarientValidator,
} from '#validators/profile'
import User from '#models/user'
import FlashKeys from '#enums/Flashes'
import { attachmentManager } from '@jrmc/adonis-attachment'
import { cuid } from '@adonisjs/core/helpers'

export default class ProfileController {
  async showProfile({ inertia }: HttpContext) {
    return inertia.render('profile')
  }

  async editProfile(ctx: HttpContext) {
    const user = ctx.auth.user!
    const { username, bio } = ctx.request.all()
    const avatarFile = ctx.request.file('avatar')

    const isUsernameChanged = user.username !== username
    const isBioChanged = user.bio !== bio
    const isAvatarChanged = avatarFile !== null

    if (!isUsernameChanged && !isBioChanged && !isAvatarChanged) {
      ctx.session.flash(FlashKeys.WARNING, {
        W_NO_CHANGE: "You haven't done any changes. Your profile hasn't been updated",
      })
      return ctx.response.redirect().toRoute('profile.show')
    }

    const validator = isUsernameChanged ? updateProfileValidator : updateProfileVarientValidator
    const data = await ctx.request.validateUsing(validator)

    user.username = data.username
    user.bio = data.bio

    if (data.avatar) {
      data.avatar.clientName = `${cuid()}.${data.avatar.extname}`
      user.avatar = await attachmentManager.createFromFile(data.avatar)
    }

    await user.save()

    ctx.session.flash(FlashKeys.SUCCESS, {
      W_NO_CHANGE: 'Your profile has been successfully updated !',
    })

    return ctx.response.redirect().toRoute('profile.show')
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

    return ctx.response.redirect().toRoute('profile.show')
  }

  async deleteAccount(ctx: HttpContext) {
    const user = ctx.auth.user!
    await user.delete()
    await ctx.auth.use('web').logout()
    ctx.session.flash(FlashKeys.SUCCESS, {
      W_NO_CHANGE: 'Your account has been successfully deleted!',
    })
    return ctx.response.redirect().toRoute('auth.login.show')
  }

  async deleteAvatar(ctx: HttpContext) {
    const user = ctx.auth.user!
    if (!user.avatar) {
      ctx.session.flash(FlashKeys.ERROR, {
        E_NO_AVATAR: "You don't have an avatar to delete!",
      })
      return ctx.response.redirect().toRoute('profile.show')
    }

    user.avatar = null
    await user.save()
    ctx.session.flash(FlashKeys.SUCCESS, {
      S_AVATAR_DELETED: 'Your avatar has been successfully deleted!',
    })
    return ctx.response.redirect().toRoute('profile.show')
  }
}
