import Joi from 'joi'
import { BookingType } from '../Models/bookings';
import validateData, { GeneralValidatorType } from '../Utils/validator';

const bookingCreateSchema = Joi.object<Omit<BookingType, 'id'>>({
   roomId: Joi.string().required(),
   orderDate:  Joi.string().isoDate().required(),
   inDate:  Joi.string().isoDate().required(),
   outDate:  Joi.string().isoDate().required(),
   specialRequest: Joi.string().required(),
   guestName: Joi.string().required(),
   guestLastname: Joi.string().required(),
   guestProfileUrl: Joi.string().required()
});

const bookingUpdateSchema = Joi.object<Omit<BookingType, 'id'>>({
   roomId: Joi.string(),
   orderDate:  Joi.string().isoDate(),
   inDate:  Joi.string().isoDate(),
   outDate:  Joi.string().isoDate(),
   specialRequest: Joi.string(),
   guestName: Joi.string(),
   guestLastname: Joi.string(),
   guestProfileUrl: Joi.string()
});

type BookingValidator = GeneralValidatorType<BookingType>

export const validateCreateBooking: BookingValidator = (review) => validateData(review, 'booking', bookingCreateSchema)
export const validateUpdateBooking: BookingValidator = (review) => validateData(review, 'booking', bookingUpdateSchema)

