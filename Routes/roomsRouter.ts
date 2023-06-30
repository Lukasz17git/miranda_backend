import express from 'express'
import { createRoomsController, deleteRoomsController, getRoomByIdController, getRoomsController, updateRoomsController } from '../Controllers/roomsController'

const roomsRouter = express.Router()

roomsRouter.get('/', getRoomsController)
roomsRouter.get('/:id', getRoomByIdController)
roomsRouter.post('/', createRoomsController)
roomsRouter.put('/:id', updateRoomsController)
roomsRouter.delete('/:id', deleteRoomsController)

export default roomsRouter