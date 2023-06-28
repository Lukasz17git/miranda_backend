import { Request, Response } from "express";
import handleError from "../Errors/handleError";


export const getContactsController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const createContactsController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const updateContactsController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteContactsController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}