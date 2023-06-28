import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { nanoid } from 'nanoid'
import { comparePasswords, createJWTandCookie, removeAllCookies } from '../Utils/authUtils'
import handleError from '../Errors/handleError'

export const authCookieName = 'auth'

export const registerController = async (req: Request, res: Response) => {
   try {
      const { email, username, password } = req.body
      //validate fields
      const encryptedPassword = await bcrypt.hash(password, 10)
      const newUser = { email, username, password: encryptedPassword }
      //save user in db and retrieve his id
      const userID = nanoid()
      const { jwtToken, cookieOptions } = createJWTandCookie(userID)
      removeAllCookies(res)
      res.cookie(authCookieName, jwtToken, cookieOptions).send(newUser)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const loginController = async (req: Request, res: Response) => {
   try {
      const { email, password } = req.body
      //validate fields
      //retrieve user data from db using email
      const userDataFromDb = { _id: 'id', email: 'lucas.m2295@gmail.com', password: '' }
      await comparePasswords(password, userDataFromDb.password)

      const { jwtToken, cookieOptions } = createJWTandCookie(userDataFromDb._id)
      removeAllCookies(res)
      res.cookie(authCookieName, jwtToken, cookieOptions).send(userDataFromDb)

   } catch (error) {
      // maybe add some kind of max attempts
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const logoutController = async (req: Request, res: Response) => {
   try {
      removeAllCookies(res)
      res.sendStatus(200)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}