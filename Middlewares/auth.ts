import { NextFunction, Request, Response } from "express"
import { authCookieName } from "../Controllers/authController"
import generateError from "../Errors/generateError"
import { removeAllCookies, verifyJWT } from "../Utils/authUtils"
import handleError from "../Errors/handleError"

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {

   try {
      const sessionCookie = req.cookies[authCookieName]
      if (!sessionCookie) throw generateError('app', 'session', 'invalid')
      const { userID } = await verifyJWT(sessionCookie) as { userID: string }
      req.userID = userID
      next()
   } catch (error) {
      const handledError = handleError(error)
      removeAllCookies(res)
      res.status(handledError.status).send(handledError)
   }
}

export default authorizationMiddleware