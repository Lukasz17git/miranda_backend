import { AppError } from "./generateError"


const handleError = (error: any): AppError => {
   if (typeof error === "object"
      && typeof error.location === 'string'
      && typeof error.field === 'string'
      && typeof error.type === 'string'
      && typeof error.status === 'number') {
      return error
   }
   const newUnknownError: AppError = {
      location: 'unknown',
      field: 'unknown',
      type: 'unknown',
      status: 400,
      additionalData: error
   }
   return newUnknownError
}

export default handleError