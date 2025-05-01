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
const BanController = () => import('#controllers/ban_controller')
const ProfileController = () => import('#controllers/profile_controller')
const QuestionsController = () => import('#controllers/questions_controller')

router.on('/').renderInertia('home').as('home')
router.on('/rules').renderInertia('rules').as('rules')

//Auth
router
  .group(() => {
    router.get('/login', [AuthController, 'showLogin']).as('auth.login')
    router.post('/login', [AuthController, 'handleLogin']).as('auth.handlelogin')
    router.get('/register', [AuthController, 'showRegister']).as('auth.register')
    router.post('/register', [AuthController, 'handleRegister']).as('auth.handleregister')
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'showDashboard']).as('dashboard')

    router.get('/profile', [ProfileController, 'showProfile']).as('profile')

    router
      .post('/profile/update/infos', [ProfileController, 'editProfile'])
      .as('profile.edit.infos')
    router
      .post('/profile/update/password', [ProfileController, 'editPassword'])
      .as('profile.edit.password')
    router
      .delete('/profile/delete/account', [ProfileController, 'deleteAccount'])
      .as('profile.delete.account')
    router
      .delete('/profile/delete/avatar', [ProfileController, 'deleteAvatar'])
      .as('profile.delete.avatar')

    router
      .get('/suggest-question', [QuestionsController, 'showSuggestQuestion'])
      .as('questions.suggest')
    router
      .post('/suggest-question', [QuestionsController, 'handleSuggestQuestion'])
      .as('questions.handlesuggest')

    router.post('/logout', [AuthController, 'logout']).as('auth.logout')
  })
  .use(middleware.auth())
  .use(middleware.ban())

router.get('/ban', [BanController, 'showBan']).as('ban').use(middleware.auth())
