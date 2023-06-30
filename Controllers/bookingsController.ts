import { Request, Response } from "express";
import handleError from "../Errors/handleError";
import { getBookings, saveBookings } from "../Utils/localSave";
import generateError from "../Errors/generateError";
import { v4 as nanoid } from 'uuid'
import { BookingType } from "../Models/bookings";


// añadir para r
export const getBookingsController = async (req: Request, res: Response) => {
   try {
      const bookings = getBookings()
      res.send(bookings)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const getBookingByIdController = async (req: Request, res: Response) => {
   try {
      const bookingID = req.params.id
      const bookings = getBookings()
      const booking = bookings.find(booking => booking.id === bookingID)
      if (!booking) throw generateError('database', 'booking', 'nonexistent')
      res.send(booking)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const createBookingsController = async (req: Request, res: Response) => {
   try {
      const data = req.body
      const newBooking = { id: nanoid(), ...data }
      const bookings = getBookings()
      bookings.push(newBooking)
      saveBookings(bookings)
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
      const bookings = getBookings()
      const bookingIndex = bookings.findIndex(booking => booking.id === bookingID)
      if (bookingIndex === -1) throw generateError('database', 'booking', 'nonexistent')
      const updatedBooking = { ...bookings[bookingIndex], ...data }
      bookings[bookingIndex] = updatedBooking
      saveBookings(bookings)
      res.send(updatedBooking)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteBookingsController = async (req: Request, res: Response) => {
   try {
      const bookingID = req.params.id
      const bookings = getBookings()
      const bookingIndex = bookings.findIndex(booking => booking.id === bookingID)
      if (bookingIndex === -1) throw generateError('database', 'booking', 'nonexistent')
      bookings.splice(bookingIndex, 1)
      saveBookings(bookings)
      res.sendStatus(200)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}