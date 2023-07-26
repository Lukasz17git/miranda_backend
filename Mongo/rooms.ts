import { Schema, model } from "mongoose"
import generateError from "../Errors/generateError"
import { RoomType } from "../Models/rooms"
import { bookingSchema } from "./bookings"

const roomSchema = new Schema({
   name: { type: String, default: '' },
   type: { type: String, default: 'single', enum: ['single', 'double', 'superior', 'suite'] },
   number: { type: String, default: '' },
   price: { type: Number, default: 0 },
   discount: { type: Number, default: 0 },
   description: { type: String, default: '' },
   cancellationPolicy: { type: String, default: '' },
   amenities: {
      airConditioner: { type: Boolean, default: false },
      wifi: { type: Boolean, default: false },
      breakfast: { type: Boolean, default: false },
      kitchen: { type: Boolean, default: false },
      cleaning: { type: Boolean, default: false },
      shower: { type: Boolean, default: false },
      grocery: { type: Boolean, default: false },
      singleBed: { type: Boolean, default: false },
      nearShop: { type: Boolean, default: false },
      towels: { type: Boolean, default: false },
      onlineSupport: { type: Boolean, default: false },
      strongLocker: { type: Boolean, default: false },
      smartSecurity: { type: Boolean, default: false },
      expertTeam: { type: Boolean, default: false }
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