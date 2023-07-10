import { Request, Response } from "express";
import handleError from "../Errors/handleError";
import { UserType } from "../Models/users";
import { deleteUserInDB, updateUserInDB } from "../MySql/users";
import { validateUpdateUser } from "../Validators/users";


export const updateUserController = async (req: Request, res: Response) => {
   try {
      const dataToUpdate = req.body as Partial<UserType>
      const userID = req.userID!
      validateUpdateUser(dataToUpdate)
      await updateUserInDB(userID, dataToUpdate)
      res.sendStatus(200)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteUserController = async (req: Request, res: Response) => {
   try {
      const userID = req.userID!
      await deleteUserInDB(userID)
      res.sendStatus(200)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}