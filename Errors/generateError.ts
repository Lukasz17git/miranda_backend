export type ErrorLocation = 'unknown' | 'app' | 'register' | 'login' | 'database' | 'review' | 'booking' | 'room'
export type ErrorField = 'unknown' | 'password' | 'session' | 'fields' | 'user' | 'room' | 'review' | 'booking' | 'db_initialization'
type ErrorType = 'unknown' | 'invalid' | 'expired' | 'nonexistent'
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