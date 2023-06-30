import { Request, Response } from "express";
import handleError from "../Errors/handleError";
import { getUsers, saveUsers } from "../Utils/localSave";
import generateError from "../Errors/generateError";
import { UserType } from "../Models/users";


export const updateUserController = async (req: Request, res: Response) => {
   try {
      const dataToUpdate = req.body as Partial<UserType>
      const userID = req.userID
      const users = getUsers()
      const userIndex = users.findIndex(user => user.id === userID)
      if (userIndex === -1) throw generateError('database', 'user', 'nonexistent')
      const updatedUser = { ...users[userIndex], ...dataToUpdate }
      users[userIndex] = updatedUser
      saveUsers(users)
      res.send(updatedUser)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteUserController = async (req: Request, res: Response) => {
   try {
      const userID = req.userID
      const users = getUsers()
      const userIndex = users.findIndex(user => user.id === userID)
      if (userIndex === -1) throw generateError('database', 'user', 'nonexistent')
      users.splice(userIndex, 1)
      saveUsers(users)
      res.sendStatus(200)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}