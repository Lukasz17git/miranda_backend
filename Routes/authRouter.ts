import express from 'express'
import { loginController, logoutController, registerController } from '../Controllers/authController'

const authRouter = express.Router()

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/logout', logoutController)

export default authRouter