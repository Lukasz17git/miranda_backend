import { Request, Response } from "express";
import handleError from "../Errors/handleError";
import { v4 as nanoid } from 'uuid'
import { BookingType } from "../Models/bookings";
import { createBookingInDB, deleteBookingInDB, getBookingByIdInDB, getBookingsFromDB, updateBookingInDB } from "../MySql/bookings";
import { validateCreateBooking, validateUpdateBooking } from "../Validators/bookings";


// añadir para r
export const getBookingsController = async (_: Request, res: Response) => {
   try {
      const bookings = await getBookingsFromDB()
      res.send(bookings)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const getBookingByIdController = async (req: Request, res: Response) => {
   try {
      const bookingID = req.params.id
      const booking = await getBookingByIdInDB(bookingID)
      res.send(booking)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const createBookingsController = async (req: Request, res: Response) => {
   try {
      const data = req.body
      validateCreateBooking(data)
      const newBooking: BookingType = { id: nanoid(), ...data }
      await createBookingInDB(newBooking)
      res.send(newBooking)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const updateBookingsController = async (req: Request, res: Response) => {
   try {
      const data = req.body as Partial<BookingType>
      const bookingID = req.params.id
      validateUpdateBooking(data)
      await updateBookingInDB(bookingID, data)
      res.sendStatus(200)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteBookingsController = async (req: Request, res: Response) => {
   try {
      const bookingID = req.params.id
      await deleteBookingInDB(bookingID)
      res.sendStatus(200)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}