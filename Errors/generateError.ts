type ErrorLocation = 'unknown' | 'app' | 'register' | 'login'
type ErrorField = 'unknown' | 'password' | 'session'
type ErrorType = 'unknown' | 'invalid' | 'expired'
type ErrorStatus = 400

const generateError = (
   location: ErrorLocation = 'unknown',
   field: ErrorField = 'unknown',
   type: ErrorType = 'unknown',
   status: ErrorStatus = 400,
   additionalData: any = null) => {
   return {
      location,
      field,
      type,
      status,
      additionalData
   }
}
export type AppError = ReturnType<typeof generateError>

export default generateError