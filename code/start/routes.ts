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
import AdminController from '#controllers/admin_controller'

const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const BanController = () => import('#controllers/ban_controller')
const ProfileController = () => import('#controllers/profile_controller')
const QuestionsController = () => import('#controllers/questions_controller')

router.on('/').renderInertia('home').as('home.show')
router.on('/rules').renderInertia('rules').as('rules.show')

//Auth
router
  .group(() => {
    router.get('/login', [AuthController, 'showLogin']).as('auth.login.show')
    router.post('/login', [AuthController, 'handleLogin']).as('auth.login.post')
    router.get('/register', [AuthController, 'showRegister']).as('auth.register.show')
    router.post('/register', [AuthController, 'handleRegister']).as('auth.register.post')
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/dashboard', [DashboardController, 'showDashboard']).as('dashboard.show')

    router.get('/profile', [ProfileController, 'showProfile']).as('profile.show')

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
      .as('suggestquestions.show')
    router
      .post('/suggest-question', [QuestionsController, 'handleSuggestQuestion'])
      .as('suggestquestions.post')

    router.post('/logout', [AuthController, 'logout']).as('auth.logout')
  })
  .use(middleware.auth())
  .use(middleware.ban())

router
  .get('/admin', [AdminController, 'showDashboard'])
  .as('admin.show')
  .use(middleware.auth())
  .use(middleware.admin())

router.get('/ban', [BanController, 'showBan']).as('ban.show').use(middleware.auth())

//API
const UserApiController = () => import('#controllers/api/user_api_controller')

router
  .group(() => {
    router.post('getusers', [UserApiController, 'getUsers']).as('api.getusers')
  })
  .prefix('/api')
  .use(middleware.auth())
  .use(middleware.admin())
