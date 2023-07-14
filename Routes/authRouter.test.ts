import request from 'supertest'
import app from '../app'


describe('Auth Register Endpoint: /register', () => {
   it('should register an user if good fields are provided', async () => {
      const res = await request(app).post('/register').send({
         email: "lucas.m2295@gmail.com",
         name: "Lukasz",
         lastname: "Maraj",
         password: "123123"
      })
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('_id')
      expect(res.body).toHaveProperty('password')
   })
   it('should return an error if any of the fields is missing', async () => {
      const res = await request(app).post('/register').send({
         name: "Lukasz",
         lastname: "Maraj",
         password: "123123"
      })
      expect(res.status).toEqual(400)
   })
})

describe('Auth Login Endpoint: /login', () => {
   it('should login the user if the fields provided are good', async () => {
      const res = await request(app).post('/login').send({
         email: "lucas.m2295@gmail.com",
         password: "123123"
      })
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('_id')
   })

   it('should return an error if any of the fields is missing', async () => {
      const res = await request(app).post('/login').send({
         email: "lucas.m2295@gmail.com",
      })
      expect(res.status).toEqual(400)
   })

   it('should return an error for incorrect password', async () => {
      const res = await request(app).post('/login').send({
         email: "lucas.m2295@gmail.com",
         password: "incorrect"
      })
      expect(res.status).toEqual(400)
   })
})


describe('Auth Logout Endpoint: /logout', () => {
   it('should remove all cookies', async () => {
      const res = await request(app).get('/logout')
      expect(res.status).toEqual(200)
      expect(res.header).toHaveProperty('set-cookie');
      expect(Array.isArray(res.header['set-cookie'])).toBe(true);
      res.header['set-cookie'].forEach((cookie: string) => {
         expect(cookie).toMatch(/Max-Age=0|Expires=.*?;\s*?Expires=(.*?,\s*?|.*?\s+)?(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s*?\d{2}\s*?(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*?\d{4}\s*?\d{2}:\d{2}:\d{2}\s*?GMT/i);
      });
   })
})