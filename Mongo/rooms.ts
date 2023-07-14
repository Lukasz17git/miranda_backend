import { Schema, model } from "mongoose"
import generateError from "../Errors/generateError"
import { RoomType } from "../Models/rooms"
import { bookingSchema } from "./bookings"

const roomSchema = new Schema({
   name: { type: String },
   type: { type: String },
   number: { type: Number },
   price: { type: Number },
   discount: { type: Number },
   description: { type: String },
   cancellationPolicy: { type: String },
   amenities: {
      airConditioner: { type: Boolean },
      wifi: { type: Boolean },
      breakfast: { type: Boolean },
      kitchen: { type: Boolean },
      cleaning: { type: Boolean },
      shower: { type: Boolean },
      grocery: { type: Boolean },
      singleBed: { type: Boolean },
      nearShop: { type: Boolean },
      towels: { type: Boolean },
      onlineSupport: { type: Boolean },
      strongLocker: { type: Boolean },
      smartSecurity: { type: Boolean },
      expertTeam: { type: Boolean }
   },
   images: [{ type: String }],
   bookings: [bookingSchema]
})

export const Room = model('Room', roomSchema)

export const getRoomsFromDB = async () => {
   const rooms = await Room.find({}).exec()
   return rooms
}

export const getRoomByIdInDB = async (id: string) => {
   const room = await Room.findById(id).exec()
   console.log('room', room)
   if (!room) throw generateError('database', 'room', 'nonexistent')
   return room
}

export const createRoomInDB = async (room: Omit<RoomType, '_id'>) => {
   const newRoom = await new Room(room).save()
   return newRoom
}

export const updateRoomInDB = async (roomID: string, room: Partial<RoomType>) => {
   const query = { _id: roomID }
   const toUpdate = { $set: room }
   const updatedRoom = await Room.findOneAndUpdate(query, toUpdate).exec()
   if (!updatedRoom) throw generateError('database', 'review', 'nonexistent')
   return updatedRoom
}

export const deleteRoomInDB = async (roomID: string) => {
   const deletedRoom = await Room.findByIdAndDelete(roomID).exec()
   console.log('deletedRoom', deletedRoom)
}