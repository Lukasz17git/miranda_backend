import express from 'express'
import { createRoomsController, deleteRoomsController, getRoomsController, updateRoomsController } from '../Controllers/roomsController'

const roomsRouter = express.Router()

roomsRouter.get('/rooms', getRoomsController)
roomsRouter.post('/rooms', createRoomsController)
roomsRouter.put('/rooms', updateRoomsController)
roomsRouter.delete('/rooms', deleteRoomsController)

export default roomsRouter