import { Request, Response } from "express";
import handleError from "../Errors/handleError";

export const getRoomsController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const createRoomsController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const updateRoomsController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteRoomsController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}