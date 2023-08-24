import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import generateError from '../Errors/generateError'
import { CookieOptions, Response } from 'express'
import { authCookieName } from '../Controllers/authController'

const sessionSecret = process.env.JWT_SECRET_SESSION as string

export const createJWTandCookie = (userID: string) => {
   const expireTime = 60 * 60 * 24 * 7 //seconds
   const maxAge = expireTime * 1000 //milliseconds
   const jwtToken = jwt.sign({ userID }, sessionSecret, { expiresIn: expireTime })
   const cookieOptions: CookieOptions = { httpOnly: true, maxAge, sameSite: 'none', secure: true }
   const expireDate = Date.now() + maxAge
   return { jwtToken, cookieOptions, expireDate }
}

export const comparePasswords = async (reqPassword: string, password: string) => new Promise(async (resolve, reject) => {
   const result = await bcrypt.compare(reqPassword, password)
   if (!result) return reject(generateError('login', 'password', 'invalid'));
   resolve(true)
})

export const verifyJWT = (token: string) => new Promise((resolve, reject) => {
   jwt.verify(token, sessionSecret, (err, decoded) => {
      if (!err) return resolve(decoded)
      if (err.name === 'TokenExpiredError') return reject(generateError('app', 'session', 'expired'))
      if (err.name === 'JsonWebTokenError' || err.name === 'NotBeforeError') return reject(generateError('app', 'session', 'invalid'))
      return reject(err)
   })
})

export const removeAllCookies = (res: Response) => {
   res.cookie(authCookieName, '', { maxAge: 0, sameSite: 'lax' })
}
