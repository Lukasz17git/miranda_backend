import express from 'express'
import { createReviewsController, deleteReviewsController, getReviewByIdController, getReviewsController, updateReviewsController } from '../Controllers/reviewsController'

const contactsRouter = express.Router()

contactsRouter.get('/', getReviewsController)
contactsRouter.get('/:id', getReviewByIdController)
contactsRouter.post('/', createReviewsController)
contactsRouter.put('/:id', updateReviewsController)
contactsRouter.delete('/:id', deleteReviewsController)

export default contactsRouter