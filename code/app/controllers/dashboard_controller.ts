import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  
  showDashboard({ inertia }: HttpContext) {
    return inertia.render('dashboard')
  }
  
}