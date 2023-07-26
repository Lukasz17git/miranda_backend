import { Schema, model } from "mongoose"
import { Room } from "./rooms"
import generateError from "../Errors/generateError"
import { BookingType } from "../Models/bookings"
import generateMongoArrayFilterUpdateObject from "../Utils/mongoArrayFilter"

export const bookingSchema = new Schema({
   orderDate: { type: String, default: '' },
   inDate: { type: String, default: '' },
   outDate: { type: String, default: '' },
   specialRequest: { type: String, default: '' },
   guest: {
      name: { type: String, default: '' },
      lastname: { type: String, default: '' },
      profileUrl: { type: String, default: '' },
   }
})

export const getBookingsFromDB = async () => {
   const projection = { bookings: true }
   const rooms = await Room.find({}, projection).exec()
   const bookings = rooms.map(room => room.toObject().bookings)
   return bookings
}

export const getBookingByIdInDB = async (bookingID: string) => {
   const query = { 'bookings._id': bookingID }
   const projection = { bookings: { $elemMatch: { '_id': bookingID } } }
   const room = await Room.findOne(query, projection).exec()
   if (!room) throw generateError('database', 'room', 'nonexistent')
   const booking = room.toObject().bookings[0]
   if (!booking) throw generateError('database', 'booking', 'nonexistent')
   return booking
}

export const createBookingInDB = async (roomID: string, booking: Omit<BookingType, '_id'>) => {
   const query = { _id: roomID }
   const projection = { booking: { $slice: -1 } }
   const toUpdate = { $push: { bookings: booking } }
   const room = await Room.findOneAndUpdate(query, toUpdate, projection).exec()
   if (!room) throw generateError('database', 'room', 'nonexistent')
   const newBooking = room.toObject().bookings[0]
   if (!newBooking) throw generateError('database', 'booking', 'nonexistent')
   return newBooking
}

export const updateBookingInDB = async (bookingID: string, booking: Partial<BookingType>) => {
   const query = { 'bookings._id': bookingID }
   const projection = { bookings: { $elemMatch: { '_id': bookingID } } }
   const arrayFilterName = 'array'
   const arrayFilters = [{ [`${arrayFilterName}._id`]: bookingID }]
   const toReturn = { new: true, projection, arrayFilters }
   const updateObject = generateMongoArrayFilterUpdateObject(booking, 'bookings', arrayFilterName)
   const toUpdate = { $set: updateObject }
   const room = await Room.findOneAndUpdate(query, toUpdate, toReturn).exec()
   if (!room) throw generateError('database', 'room', 'nonexistent')
   const newBooking = room.toObject().bookings[0]
   if (!newBooking) throw generateError('database', 'booking', 'nonexistent')
   return newBooking
}

export const deleteBookingInDB = async (bookingID: string) => {
   const query = { 'bookings._id': bookingID }
   const toUpdate = { $pull: { bookings: { _id: bookingID } } }
   const toReturn = { new: true, projection: { _id: 1 } }
   const room = await Room.findOneAndUpdate(query, toUpdate, toReturn).exec()
   if (!room) throw generateError('database', 'room', 'nonexistent')
   return room
}