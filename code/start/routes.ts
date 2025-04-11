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

const AuthController = () => import('#controllers/auth_controller');
const DashboardController = () => import('#controllers/dashboard_controller');


router.on('/').renderInertia('home')

//Auth
router.group(() => {
    router.get('/login', [AuthController, 'showLogin'])
    router.post('/login', [AuthController, 'handleLogin'])
    router.get('/register', [AuthController, 'showRegister'])
    router.post('/register', [AuthController, 'handleRegister'])
}).use(middleware.guest())

router.get('/dashboard', [DashboardController, 'showDashboard'])

router.get('/logout', [AuthController, 'logout']).use(middleware.auth())