import Joi from 'joi'
import { ReviewType, ReviewsSubjects } from '../Models/reviews';
import validateData, { GeneralValidatorType } from '../Utils/validator';

const reviewsSubjects: ReviewsSubjects[] = ['Subject A', 'Subject B', 'Subject C']

const reviewCreateSchema = Joi.object<Omit<ReviewType, 'id'>>({
   sentAt: Joi.number().required(),
   viewed: Joi.boolean().required(),
   archived: Joi.boolean().required(),
   subject: Joi.string().valid(...reviewsSubjects).required(),
   comment: Joi.string().required(),
   personName: Joi.string().required(),
   personLastname: Joi.string().required(),
   personEmail: Joi.string().email().required(),
   personPhone: Joi.string().required(),
});

const reviewUpdateSchema = Joi.object<Omit<ReviewType, 'id'>>({
   sentAt: Joi.number(),
   viewed: Joi.boolean(),
   archived: Joi.boolean(),
   subject: Joi.string().valid(...reviewsSubjects),
   comment: Joi.string(),
   personName: Joi.string(),
   personLastname: Joi.string(),
   personEmail: Joi.string().email(),
   personPhone: Joi.string(),
});

type ReviewValidator = GeneralValidatorType<ReviewType>

export const validateCreateReview: ReviewValidator = (review) => validateData(review, 'review', reviewCreateSchema)
export const validateUpdateReview: ReviewValidator = (review) => validateData(review, 'review', reviewUpdateSchema)
