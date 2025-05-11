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

// Lazy Loading, Import only if controller is requested
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const BanController = () => import('#controllers/ban_controller')
const ProfileController = () => import('#controllers/profile_controller')
const QuestionsController = () => import('#controllers/questions_controller')
const AdminController = () => import('#controllers/admin_controller')
const LobbyController = () => import('#controllers/lobby_controller')
const GameController = () => import('#controllers/game_controller')
const DisconnectController = () => import('#controllers/disconnect_controller')

//Public routes
router.on('/').renderInertia('home').as('home.show')
router.on('/rules').renderInertia('rules').as('rules.show')

//Authentication
router
  .group(() => {
    router.get('/login', [AuthController, 'showLogin']).as('auth.login.show')
    router.post('/login', [AuthController, 'handleLogin']).as('auth.login.post')
    router.get('/register', [AuthController, 'showRegister']).as('auth.register.show')
    router.post('/register', [AuthController, 'handleRegister']).as('auth.register.post')
  })
  .use(middleware.guest())

// Authenticated routes
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

    //Lobby
    router.get('/lobby/public', [LobbyController, 'showPublic']).as('lobby.public.show')
    router
      .get('/lobby/create-private', [LobbyController, 'showCreatePrivate'])
      .as('lobby.create-private.show')
    router
      .get('/lobby/join-private', [LobbyController, 'showJoinPrivate'])
      .as('lobby.join-private.show')

    //Game

    router
      .group(() => {
        router.get('/game/start/:id', [GameController, 'showStartGame']).as('game.start.show')
        router.get('/game/draft/:id', [GameController, 'showDraftGame']).as('game.draft.show')
        router.get('/game/play/:id', [GameController, 'showPlayGame']).as('game.play.show')
      })
      .where('id', {
        match: /^gid.{15}$/,
      })
      .use(middleware.game())

    router
      .post('/disconnect/player', [DisconnectController, 'handlePlayerDisconnected'])
      .as('disconnect.player')
    router
      .post('/disconnect/game', [DisconnectController, 'handleGameDisconnected'])
      .as('disconnect.game')

    router.post('/logout', [AuthController, 'logout']).as('auth.logout')
  })
  .use(middleware.auth())
  .use(middleware.sanction())

//Admin
router
  .group(() => {
    router.get('/admin', [AdminController, 'showDashboard']).as('admin.show')

    router
      .delete('/admin/delete-question', [QuestionsController, 'deleteQuestion'])
      .as('admin.question.delete')

    router
      .post('/admin/approve-question', [QuestionsController, 'approveQuestion'])
      .as('admin.question.approve')
  })
  .use(middleware.auth())
  .use(middleware.admin())

//BAN
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
