import express from 'express'
import { deleteUserController, updateUserController } from '../Controllers/userController'

const usersRouter = express.Router()
//el create user lo he movido a register, para que tengan contraseña y puedan loguear
// usersRouter.get('/', getUsersController) //no tiene sentido, lo envio al loguear
// usersRouter.get('/:id', getUserByIdController) // no tiene sentido hacer request de un usuario por id
usersRouter.put('/', updateUserController)
usersRouter.delete('/', deleteUserController) //esto sería mejor cambiar el status a "deleted"

export default usersRouter