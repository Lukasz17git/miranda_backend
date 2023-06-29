import { Request, Response } from "express";
import { nanoid } from "nanoid";
import handleError from "../Errors/handleError";


// añadir para r
export const getBookingsController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const createBookingsController = async (req: Request, res: Response) => {
   try {
      const booking = req.body
      // add booking to db
      const addedBooking = { _id: nanoid(), ...booking }
      res.send(addedBooking)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const updateBookingsController = async (req: Request, res: Response) => {
   try {
      const bookingUpdate = req.body
      // update booking to db

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteBookingsController = async (req: Request, res: Response) => {
   try {

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}