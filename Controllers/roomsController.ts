import { Request, Response } from "express";
import handleError from "../Errors/handleError";
import { v4 as nanoid } from 'uuid'
import { RoomType } from "../Models/rooms";
import { createRoomInDB, deleteRoomInDB, getRoomByIdInDB, getRoomsFromDB, updateRoomInDB } from "../MySql/rooms";
import { validateCreateRoom, validateUpdateRoom } from "../Validators/rooms";

export const getRoomsController = async (req: Request, res: Response) => {
   try {
      const rooms = await getRoomsFromDB()
      res.send(rooms)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const getRoomByIdController = async (req: Request, res: Response) => {
   try {
      const roomID = req.params.id
      const room = await getRoomByIdInDB(roomID)
      res.send(room)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}
export const createRoomsController = async (req: Request, res: Response) => {
   try {
      const data = req.body
      validateCreateRoom(data)
      const newRoom: RoomType = { ...data, id: nanoid() }
      await createRoomInDB(newRoom)
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
      validateUpdateRoom(data)
      await updateRoomInDB(roomID, data)
      res.sendStatus(200)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteRoomsController = async (req: Request, res: Response) => {
   try {
      const roomID = req.params.id
      await deleteRoomInDB(roomID)
      res.sendStatus(200)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}