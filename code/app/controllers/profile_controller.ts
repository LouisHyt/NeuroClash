import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  
  async showProfile({inertia}: HttpContext) {
    return inertia.render("profile");
  }
  
}