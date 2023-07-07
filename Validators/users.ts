import Joi from "joi";
import { UserStatusType, UserType, UsersJobType } from "../Models/users";
import validateData, { GeneralValidatorType } from "../Utils/validator";

const userStatus: UserStatusType[] = ['active', 'inactive', 'vacation']
const userJobs: UsersJobType[] = ['manager', 'receptionist', 'roomsService']

const userRegisterSchema = Joi.object<Omit<UserType, 'id'>>({
   name: Joi.string(),
   lastname: Joi.string(),
   email: Joi.string().email().required(),
   password: Joi.string().required(),
})

const userLoginSchema = Joi.object<Omit<UserType, 'id'>>({
   email: Joi.string().email().required(),
   password: Joi.string().required(),
})

const userUpdateSchema = Joi.object<Omit<UserType, 'id'>>({
   name: Joi.string(),
   lastname: Joi.string(),
   email: Joi.string().email(),
   password: Joi.string(),
   phone: Joi.string(),
   description: Joi.string(),
   status: Joi.string().valid(...userStatus),
   job: Joi.string().valid(...userJobs),
   dischargeDate: Joi.string().isoDate(),
   profileImg: Joi.string(),
})

type UserValidator = GeneralValidatorType<UserType>

export const validateRegisterUser: UserValidator = (user) => validateData(user, 'register', userRegisterSchema)
export const validateLoginUser: UserValidator = (user) => validateData(user, 'login', userLoginSchema)
export const validateUpdateUser: UserValidator = (user) => validateData(user, 'app', userUpdateSchema)