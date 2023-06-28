import { Request, Response } from "express";
import handleError from "../Errors/handleError";

export const getUsersController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const createUserController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const updateUserController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteUserController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}