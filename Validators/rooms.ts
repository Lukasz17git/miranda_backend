import Joi from 'joi'
import { RoomType, RoomsTypes } from '../Models/rooms';
import validateData, { GeneralValidatorType } from '../Utils/validator';

const amenitiesSchema = Joi.object({
   airConditioner: Joi.boolean().required(),
   wifi: Joi.boolean().required(),
   breakfast: Joi.boolean().required(),
   kitchen: Joi.boolean().required(),
   cleaning: Joi.boolean().required(),
   shower: Joi.boolean().required(),
   grocery: Joi.boolean().required(),
   singleBed: Joi.boolean().required(),
   nearShop: Joi.boolean().required(),
   towels: Joi.boolean().required(),
   onlineSupport: Joi.boolean().required(),
   strongLocker: Joi.boolean().required(),
   smartSecurity: Joi.boolean().required(),
   expertTeam: Joi.boolean().required(),
});

const roomsTypes: RoomsTypes[] = ['single', 'double', 'suite', 'superior']

const roomCreateSchema = Joi.object<Omit<RoomType, 'id'>>({
   name: Joi.string().required(),
   type: Joi.string().valid(...roomsTypes).required(),
   number: Joi.number().required(),
   price: Joi.number().required(),
   discount: Joi.number().required(),
   description: Joi.string().required(),
   cancellationPolicy: Joi.string().required(),
   amenities: amenitiesSchema.required(),
   images: Joi.array().items(Joi.string()).required(),
   bookings: Joi.array().items(Joi.object()).optional(),
});

const roomUpdateSchema = Joi.object<Omit<RoomType, 'id'>>({
   name: Joi.string(),
   type: Joi.string().valid(...roomsTypes),
   number: Joi.number(),
   price: Joi.number(),
   discount: Joi.number(),
   description: Joi.string(),
   cancellationPolicy: Joi.string(),
   amenities: amenitiesSchema,
   images: Joi.array().items(Joi.string()),
   bookings: Joi.array().items(Joi.object()),
});

type RoomValidator = GeneralValidatorType<RoomType>

export const validateCreateRoom: RoomValidator = (review) => validateData(review, 'room', roomCreateSchema)
export const validateUpdateRoom: RoomValidator = (review) => validateData(review, 'room', roomUpdateSchema)


