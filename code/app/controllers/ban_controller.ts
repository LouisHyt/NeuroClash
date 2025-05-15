import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class BanController {
  async showBan({ inertia, auth, response }: HttpContext) {
    const user = auth.user!
    if (!user?.bannedUntil) return response.redirect().toRoute('home.show')

    auth.use('web').logout()

    return inertia.render('ban', {
      bannedUntil: user.bannedUntil as DateTime,
    })
  }
}
