import express from 'express'
import { createBookingsController, deleteBookingsController, getBookingByIdController, getBookingsController, updateBookingsController } from '../Controllers/bookingsController'

const bookingsRouter = express.Router()

bookingsRouter.get('/', getBookingsController)
bookingsRouter.get('/:id', getBookingByIdController)
bookingsRouter.post('/', createBookingsController)
bookingsRouter.put('/:id', updateBookingsController)
bookingsRouter.delete('/:id', deleteBookingsController)

export default bookingsRouter