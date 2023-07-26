import Joi from 'joi'
import { RoomType, RoomsTypes } from '../Models/rooms';
import validateData, { GeneralValidatorType } from '../Utils/validator';

const amenitiesSchema = Joi.object<RoomType['amenities']>({
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

const roomCreateSchema = Joi.object<Omit<RoomType, '_id'>>({
   name: Joi.string().allow('').required(),
   type: Joi.string().allow('').valid(...roomsTypes).required(),
   number: Joi.string().allow('').required(),
   price: Joi.number().required(),
   discount: Joi.number().required(),
   description: Joi.string().allow('').required(),
   cancellationPolicy: Joi.string().allow('').required(),
   amenities: amenitiesSchema.required(),
   images: Joi.array().items(Joi.string().allow('')).required(),
   bookings: Joi.array().items(Joi.object()).optional(),
});

const roomUpdateSchema = Joi.object<Omit<RoomType, 'id'>>({
   name: Joi.string().allow(''),
   type: Joi.string().allow('').valid(...roomsTypes),
   number: Joi.string().allow(''),
   price: Joi.number(),
   discount: Joi.number(),
   description: Joi.string().allow(''),
   cancellationPolicy: Joi.string().allow(''),
   amenities: amenitiesSchema,
   images: Joi.array().items(Joi.string().allow('')),
   bookings: Joi.array().items(Joi.object()),
});

type RoomValidator = GeneralValidatorType<RoomType>

export const validateCreateRoom: RoomValidator = (review) => validateData(review, 'room', roomCreateSchema)
export const validateUpdateRoom: RoomValidator = (review) => validateData(review, 'room', roomUpdateSchema)


