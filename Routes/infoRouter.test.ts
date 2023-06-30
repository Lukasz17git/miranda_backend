import request from 'supertest'
import app from '../app'


const endpoint = '/info'

describe('get hotel info', () => {
   it('should retrieve hotel name and its private http endpoints', async () => {
      const res = await request(app).get(endpoint)
      console.log('REEEEESSSS',res)
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('name')
      expect(res.body).toHaveProperty('privateEnpoints')
   })
})