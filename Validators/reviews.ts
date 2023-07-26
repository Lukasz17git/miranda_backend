import Joi from 'joi'
import { ReviewType, ReviewsSubjects } from '../Models/reviews';
import validateData, { GeneralValidatorType } from '../Utils/validator';

const reviewsSubjects: ReviewsSubjects[] = ['Subject A', 'Subject B', 'Subject C']

const personSchema = Joi.object<ReviewType['person']>({
   name: Joi.string().allow(''),
   lastname: Joi.string().allow(''),
   email: Joi.string().allow('').email(),
   phone: Joi.string().allow(''),
})

const reviewCreateSchema = Joi.object<Omit<ReviewType, '_id'>>({
   sentAt: Joi.string().allow('').isoDate().required(),
   viewed: Joi.boolean().required(),
   archived: Joi.boolean().required(),
   subject: Joi.string().allow('').valid(...reviewsSubjects).required(),
   comment: Joi.string().allow('').required(),
   person: personSchema
});

const reviewUpdateSchema = Joi.object<Omit<ReviewType, '_id'>>({
   sentAt: Joi.string().allow('').isoDate(),
   viewed: Joi.boolean(),
   archived: Joi.boolean(),
   subject: Joi.string().allow('').valid(...reviewsSubjects),
   comment: Joi.string().allow(''),
   person: personSchema
});

type ReviewValidator = GeneralValidatorType<ReviewType>

export const validateCreateReview: ReviewValidator = (review) => validateData(review, 'review', reviewCreateSchema)
export const validateUpdateReview: ReviewValidator = (review) => validateData(review, 'review', reviewUpdateSchema)
