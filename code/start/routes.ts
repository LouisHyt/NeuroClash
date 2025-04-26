/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.on('/').renderInertia('home')

//Auth
router
  .group(() => {
    router.get('/login', [AuthController, 'showLogin']).as('auth.login')
    router.post('/login', [AuthController, 'handleLogin']).as('auth.handlelogin')
    router.get('/register', [AuthController, 'showRegister']).as('auth.register')
    router.post('/register', [AuthController, 'handleRegister']).as('auth.handleregister')
  })
  .use(middleware.guest())

router.group(() => {
  router.get('/dashboard', [DashboardController, 'showDashboard']).as('dashboard')
  router.post('/logout', [AuthController, 'logout']).use(middleware.auth()).as('auth.logout')
})
