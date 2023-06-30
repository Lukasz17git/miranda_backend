import request from 'supertest'
import app from '../app'

export const createAuthTestingSessionCookie = async (email = 'test@test.test', password = 'test') => {
   let loginRes = await request(app).post('/login').send({ email, password })
   if (loginRes.status !== 200) {
      await request(app).post('/register').send({ email, password, name: `Test`, lastname: `Test` })
      loginRes = await request(app).post('/login').send({ email, password })

   }
   const authCookie = loginRes.header['set-cookie'].findLast((cookie: string) => cookie.startsWith("auth="))
   return authCookie
}

