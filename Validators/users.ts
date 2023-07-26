import Joi from "joi";
import { UserStatusType, UserType, UsersJobType } from "../Models/users";
import validateData, { GeneralValidatorType } from "../Utils/validator";

const userStatus: UserStatusType[] = ['active', 'inactive', 'vacation']
const userJobs: UsersJobType[] = ['manager', 'receptionist', 'roomsService']

const userRegisterSchema = Joi.object<Omit<UserType, '_id'>>({
   name: Joi.string(),
   lastname: Joi.string().allow(''),
   email: Joi.string().email().required(),
   password: Joi.string().required(),
})

const userLoginSchema = Joi.object<Omit<UserType, '_id'>>({
   email: Joi.string().email().required(),
   password: Joi.string().required(),
})

const userCreateSchema = Joi.object<Omit<UserType, '_id'>>({
   name: Joi.string().required(),
   lastname: Joi.string().allow(''),
   email: Joi.string().allow('').email(),
   phone: Joi.string().allow(''),
   description: Joi.string().allow(''),
   status: Joi.string().allow('').valid(...userStatus),
   job: Joi.string().allow('').valid(...userJobs),
   dischargeDate: Joi.string().allow('').isoDate(),
   profileImg: Joi.string().allow(''),
})

const userUpdateSchema = Joi.object<Omit<UserType, '_id'>>({
   name: Joi.string(),
   lastname: Joi.string().allow(''),
   email: Joi.string().allow('').email(),
   password: Joi.string(),
   phone: Joi.string().allow(''),
   description: Joi.string().allow(''),
   status: Joi.string().allow('').valid(...userStatus),
   job: Joi.string().allow('').valid(...userJobs),
   dischargeDate: Joi.string().allow('').isoDate(),
   profileImg: Joi.string().allow(''),
})

type UserValidator = GeneralValidatorType<UserType>

export const validateRegisterUser: UserValidator = (user) => validateData(user, 'register', userRegisterSchema)
export const validateLoginUser: UserValidator = (user) => validateData(user, 'login', userLoginSchema)
export const validateCreateUser: UserValidator = (user) => validateData(user, 'app', userCreateSchema)
export const validateUpdateUser: UserValidator = (user) => validateData(user, 'app', userUpdateSchema)