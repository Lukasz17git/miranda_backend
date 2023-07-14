import { Schema, model } from "mongoose";
import generateError from "../Errors/generateError";
import { ReviewType } from "../Models/reviews";


const reviewSchema = new Schema({
   sentAt: { type: String },
   viewed: { type: Boolean },
   archived: { type: Boolean },
   subject: { type: String },
   comment: { type: String },
   personName: { type: String },
   personLastname: { type: String },
   personEmail: { type: String },
   personPhone: { type: String },
})

const Review = model('Review', reviewSchema)

export const getReviewsFromDB = async () => {
   const reviews = await Review.find({}).exec()
   return reviews
}

export const getReviewByIdInDB = async (id: string) => {
   const review = await Review.findById(id).exec()
   if (!review) throw generateError('database', 'review', 'nonexistent')
   return review
}

export const createReviewInDB = async (review: Omit<ReviewType, '_id'>) => {
   const newReview = await new Review(review).save()
   return newReview
}

export const updateReviewInDB = async (reviewID: string, review: Partial<ReviewType>) => {
   const query = { _id: reviewID }
   const toUpdate = { $set: review }
   const updatedReview = await Review.findOneAndUpdate(query, toUpdate).exec()
   if (!updatedReview) throw generateError('database', 'review', 'nonexistent')
   return updatedReview
}

export const deleteReviewInDB = async (reviewID: string) => {
   const deletedReview = await Review.findByIdAndDelete(reviewID).exec()
   console.log('deletedReview', deletedReview)
}
