import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { comparePasswords, createJWTandCookie, removeAllCookies } from '../Utils/authUtils'
import handleError from '../Errors/handleError'
import { UserType } from '../Models/users'
import { v4 as nanoid } from 'uuid'
// import { createUserInDB, getUserByEmailInDB } from '../MySql/users'
import { createUserInDB, getUserByEmailInDB, getUserFromDB } from '../Mongo/users'
import { validateLoginUser, validateRegisterUser } from '../Validators/users'

export const authCookieName = 'auth'

export const registerController = async (req: Request, res: Response) => {
   try {
      const data = req.body
      validateRegisterUser(data)
      const encryptedPassword = await bcrypt.hash(data.password, 10)
      const newUser = await createUserInDB({ ...data, password: encryptedPassword })
      const userID = newUser.toObject()._id.toString()
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
      const data = req.body
      validateLoginUser(data)
      const dbUser = await getUserByEmailInDB(data.email)
      await comparePasswords(data.password, dbUser.password)
      const { jwtToken, cookieOptions } = createJWTandCookie(dbUser._id.toString())
      removeAllCookies(res)
      const userWithoutPassword: UserType = { ...dbUser.toObject(), password: '' }
      res.cookie(authCookieName, jwtToken, cookieOptions).send(userWithoutPassword)

   } catch (error) {
      // maybe add some kind of max attempts
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const getAdminController = async (req: Request, res: Response) => {
   try {
      const managerId = req.userID!
      console.log('managerId', managerId)
      const user = await getUserFromDB(managerId)
      const userWithoutPassword: UserType = { ...user.toObject(), password: '' }
      res.send(userWithoutPassword)
   } catch (error) {
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