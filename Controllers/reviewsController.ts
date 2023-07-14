import { Request, Response } from "express";
import handleError from "../Errors/handleError";
import { v4 as nanoid } from 'uuid'
import { ReviewType } from "../Models/reviews";
// import { createReviewInDB, deleteReviewInDB, getReviewByIdInDB, getReviewsFromDB, updateReviewInDB } from "../MySql/reviews";
import { validateCreateReview, validateUpdateReview } from "../Validators/reviews";
import { createReviewInDB, deleteReviewInDB, getReviewByIdInDB, getReviewsFromDB, updateReviewInDB } from "../Mongo/reviews";



export const getReviewsController = async (req: Request, res: Response) => {
   try {
      const reviews = await getReviewsFromDB()
      res.send(reviews)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const getReviewByIdController = async (req: Request, res: Response) => {
   try {
      const reviewID = req.params.id
      const review = await getReviewByIdInDB(reviewID)
      res.send(review)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const createReviewsController = async (req: Request, res: Response) => {
   try {
      const data = req.body
      validateCreateReview(data)
      const review = await createReviewInDB(data)
      res.send(review)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const updateReviewsController = async (req: Request, res: Response) => {
   try {
      const data = req.body as Partial<ReviewType>
      const reviewID = req.params.id
      validateUpdateReview(data)
      await updateReviewInDB(reviewID, data)
      res.sendStatus(200)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteReviewsController = async (req: Request, res: Response) => {
   try {
      const reviewID = req.params.id
      await deleteReviewInDB(reviewID)
      res.sendStatus(200)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}