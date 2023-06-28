import express from 'express'
import { createBookingsController, deleteBookingsController, getBookingsController, updateBookingsController } from '../Controllers/bookingsController'

const bookingsRouter = express.Router()

bookingsRouter.get('/bookings', getBookingsController)
bookingsRouter.post('/bookings', createBookingsController)
bookingsRouter.put('/bookings', updateBookingsController)
bookingsRouter.delete('/bookings', deleteBookingsController)

export default bookingsRouter