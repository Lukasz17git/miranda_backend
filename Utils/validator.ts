import Joi from "joi"
import generateError, { ErrorLocation } from "../Errors/generateError"

export type GeneralValidatorType<T> = (p: Partial<T>) => unknown

const validateData = (data: unknown, location: ErrorLocation, schema: Joi.ObjectSchema) => {
   const { error } = schema.validate(data)
   if (error) throw generateError(location, 'fields', 'invalid')
}

export default validateData