import Joi from 'joi'
import { BookingType } from '../Models/bookings';
import validateData, { GeneralValidatorType } from '../Utils/validator';

const guestSchema = Joi.object<BookingType['guest']>({
   name: Joi.string().allow(''),
   lastname: Joi.string().allow(''),
   profileUrl: Joi.string().allow(''),
})

const bookingCreateSchema = Joi.object<Omit<BookingType, '_id'>>({
   roomId: Joi.string().allow('').required(),
   orderDate: Joi.string().allow('').isoDate().required(),
   inDate: Joi.string().allow('').isoDate().required(),
   outDate: Joi.string().allow('').isoDate().required(),
   specialRequest: Joi.string().allow('').required(),
   guest: guestSchema.required()
});

const bookingUpdateSchema = Joi.object<Omit<BookingType, '_id'>>({
   roomId: Joi.string().allow(''),
   orderDate: Joi.string().allow('').isoDate(),
   inDate: Joi.string().allow('').isoDate(),
   outDate: Joi.string().allow('').isoDate(),
   specialRequest: Joi.string().allow(''),
   guest: guestSchema
});

type BookingValidator = GeneralValidatorType<BookingType>

export const validateCreateBooking: BookingValidator = (review) => validateData(review, 'booking', bookingCreateSchema)
export const validateUpdateBooking: BookingValidator = (review) => validateData(review, 'booking', bookingUpdateSchema)

