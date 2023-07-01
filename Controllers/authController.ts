import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { comparePasswords, createJWTandCookie, removeAllCookies } from '../Utils/authUtils'
import handleError from '../Errors/handleError'
import { UserType } from '../Models/users'
import generateError from '../Errors/generateError'
import { getUsers, saveUsers } from '../Utils/localSave'
import { v4 as nanoid } from 'uuid'

export const authCookieName = 'auth'

export const registerController = async (req: Request, res: Response) => {
   try {
      const { email, name, lastname, password } = req.body
      //validate fields
      if (!email || !name || !lastname || !password) throw generateError('register', 'fields', 'invalid')
      //end of validation
      const encryptedPassword = await bcrypt.hash(password, 10)
      //save user in db and retrieve his id
      const newUser: UserType = { id: nanoid(), name, lastname, email, password: encryptedPassword }

      //local save
      const users = getUsers()
      users.push(newUser)
      saveUsers(users)
      //done

      const { jwtToken, cookieOptions } = createJWTandCookie(newUser.id)
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
      if (!email || !password) throw generateError('login', 'fields', 'invalid')
      //retrieve user data from db using email
      const users = getUsers()
      const dbUser = users.find(user => user.email === email)
      if (!dbUser) throw generateError('login', 'user', 'nonexistent')
      await comparePasswords(password, dbUser.password)

      const { jwtToken, cookieOptions } = createJWTandCookie(dbUser.id)
      removeAllCookies(res)
      res.cookie(authCookieName, jwtToken, cookieOptions).send(dbUser)

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