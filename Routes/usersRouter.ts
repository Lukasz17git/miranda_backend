import express from 'express'
import { createUserController, deleteUserController, getUsersController, updateUserController } from '../Controllers/userController'

const usersRouter = express.Router()
//el create user lo he movido a register, para que tengan contraseña y puedan loguear
// usersRouter.get('/', getUsersController) //no tiene sentido, lo envio al loguear
// usersRouter.get('/:id', getUserByIdController) // no tiene sentido hacer request de un usuario por id
usersRouter.get('/', getUsersController)
usersRouter.post('/', createUserController)
usersRouter.put('/', updateUserController)
usersRouter.put('/:id', updateUserController)
usersRouter.delete('/', deleteUserController)
usersRouter.delete('/:id', deleteUserController)

export default usersRouter