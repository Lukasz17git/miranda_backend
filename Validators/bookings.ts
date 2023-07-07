import Joi from 'joi'
import { BookingType } from '../Models/bookings';
import validateData, { GeneralValidatorType } from '../Utils/validator';

const bookingCreateSchema = Joi.object<Omit<BookingType, 'id'>>({
   roomId: Joi.number().required(),
   orderDate: Joi.number().required(),
   inDate: Joi.number().required(),
   outDate: Joi.number().required(),
   specialRequest: Joi.string().required(),
   guestName: Joi.string().required(),
   guestLastname: Joi.string().required(),
   guestProfileUrl: Joi.string().required()
});

const bookingUpdateSchema = Joi.object<Omit<BookingType, 'id'>>({
   roomId: Joi.number(),
   orderDate: Joi.number(),
   inDate: Joi.number(),
   outDate: Joi.number(),
   specialRequest: Joi.string(),
   guestName: Joi.string(),
   guestLastname: Joi.string(),
   guestProfileUrl: Joi.string()
});

type BookingValidator = GeneralValidatorType<BookingType>

export const validateCreateBooking: BookingValidator = (review) => validateData(review, 'booking', bookingCreateSchema)
export const validateUpdateBooking: BookingValidator = (review) => validateData(review, 'booking', bookingUpdateSchema)

