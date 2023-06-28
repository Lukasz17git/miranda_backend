import express from 'express'
import { createUserController, deleteUserController, getUsersController, updateUserController } from '../Controllers/usersController'

const usersRouter = express.Router()

usersRouter.get('/users', getUsersController)
usersRouter.post('/users', createUserController)
usersRouter.put('/users', updateUserController)
usersRouter.delete('/users', deleteUserController)

export default usersRouter