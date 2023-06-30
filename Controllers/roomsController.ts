import { Request, Response } from "express";
import handleError from "../Errors/handleError";
import { getRooms, saveRooms } from "../Utils/localSave";
import generateError from "../Errors/generateError";
import { v4 as nanoid } from 'uuid'
import { RoomType } from "../Models/rooms";

export const getRoomsController = async (req: Request, res: Response) => {
   try {
      const rooms = getRooms()
      res.send(rooms)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const getRoomByIdController = async (req: Request, res: Response) => {
   try {
      const roomID = req.params.id
      const rooms = getRooms()
      const room = rooms.find(room => room.id === roomID)
      if (!room) throw generateError('database', 'room', 'nonexistent')
      res.send(room)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}
export const createRoomsController = async (req: Request, res: Response) => {
   try {
      const data = req.body
      const newRoom = { id: nanoid(), ...data }
      const rooms = getRooms()
      rooms.push(newRoom)
      saveRooms(rooms)
      res.send(newRoom)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const updateRoomsController = async (req: Request, res: Response) => {
   try {
      const data = req.body as Partial<RoomType>
      const roomID = req.params.id
      const rooms = getRooms()
      const roomIndex = rooms.findIndex(room => room.id === roomID)
      if (roomIndex === -1) throw generateError('database', 'room', 'nonexistent')
      const updatedRoom = { ...rooms[roomIndex], ...data }
      rooms[roomIndex] = updatedRoom
      saveRooms(rooms)
      res.send(updatedRoom)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteRoomsController = async (req: Request, res: Response) => {
   try {
      const roomID = req.params.id
      const rooms = getRooms()
      const roomIndex = rooms.findIndex(room => room.id === roomID)
      if (roomIndex === -1) throw generateError('database', 'room', 'nonexistent')
      rooms.splice(roomIndex, 1)
      saveRooms(rooms)
      res.sendStatus(200)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}