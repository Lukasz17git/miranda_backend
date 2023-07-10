import request from 'supertest'
import app from '../app'
import { createAuthTestingSessionCookie } from '../Tests/utils'

describe('Delete usere Endpoint: delete', () => {
   it('should delete the user if the user is the one thats sending the request', async () => {
      const authCookie = await createAuthTestingSessionCookie(`test_${Date.now()}@test.com`)
      const res = await request(app).delete('/user').set('Cookie', authCookie) //add authCookie here
      expect(res.status).toEqual(200)
   })
   it('should return an error for any other case', async () => {
      const res = await request(app).delete('/user')
      expect(res.status).toEqual(400)
   })
})

describe('Update user endpoint: put', () => {
   it('should update the user if the user is the one thats sending the request', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const newName = 'new_test_name'
      const res = await request(app).put('/user').set('Cookie', authCookie).send({
         name: newName
      })
      expect(res.status).toEqual(200)
   })
})