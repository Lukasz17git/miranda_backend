import { Request, Response } from "express";
import handleError from "../Errors/handleError";
import { UserType } from "../Models/users";
// import { deleteUserInDB, updateUserInDB } from "../MySql/users";
import { validateCreateUser, validateUpdateUser } from "../Validators/users";
import { createUserInDB, deleteUserInDB, getUsersFromDB, updateUserInDB } from "../Mongo/users";
import bcrypt from 'bcryptjs'

export const getUsersController = async (req: Request, res: Response) => {
   try {
      const managerId = req.userID!
      const users = await getUsersFromDB(managerId)
      res.send(users)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const createUserController = async (req: Request, res: Response) => {
   try {
      const data = req.body
      validateCreateUser(data)
      const review = await createUserInDB(data)
      res.send(review)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}


export const updateUserController = async (req: Request, res: Response) => {
   try {
      const dataToUpdate = req.body as Partial<UserType>
      const userID = req.params.id || req.userID!
      validateUpdateUser(dataToUpdate)
      if (dataToUpdate.password) {
         const encryptedPassword = await bcrypt.hash(dataToUpdate.password, 10)
         dataToUpdate.password = encryptedPassword
      }
      await updateUserInDB(userID, dataToUpdate)
      res.sendStatus(200)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteUserController = async (req: Request, res: Response) => {
   try {
      const userID = req.params.id || req.userID!
      await deleteUserInDB(userID)
      res.sendStatus(200)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}