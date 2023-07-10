import request from 'supertest'
import app from '../app'
import { createAuthTestingSessionCookie } from '../Tests/utils'
import { BookingType } from '../Models/bookings'

const endpoint = '/bookings'

const booking: Omit<BookingType, 'id'> = {
   roomId: '1',
   orderDate: new Date().toISOString(),
   inDate: new Date(1651564800000).toISOString(),
   outDate: new Date(1654156800000).toISOString(),
   specialRequest: "Non-smoking room",
   guestName: "John",
   guestLastname: "Doe",
   guestProfileUrl: "https://example.com/profile/johndoe",
};


describe('get all bookings', () => {
   it('should retrieve all bookings if the user is authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).get(endpoint).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
   })

   it('shoud throw an error if there user is not authenticated', async () => {
      const res = await request(app).get(endpoint)
      expect(res.status).toEqual(400)
   })
})


describe('get booking by id', () => {
   it('should retrieve the booking if the user is authenticated and the id exists', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const bookingId = (await request(app).post(endpoint).set('Cookie', authCookie).send(booking)).body.id
      const res = await request(app).get(`${endpoint}/${bookingId}`).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
      expect(res.body).toMatchObject({ id: bookingId, ...booking })

   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).get(`${endpoint}/nonexistentid`).set('Cookie', authCookie)
      expect(res.status).toEqual(400)

   })
   it('shoud throw an error if there user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const bookingId = (await request(app).post(endpoint).set('Cookie', authCookie).send(booking)).body.id
      const res = await request(app).get(`${endpoint}/${bookingId}`)
      expect(res.status).toEqual(400)
   })
})


describe('create new booking', () => {
   it('should create new booking if the user is authenticated and the provided data is valid', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).post(endpoint).set('Cookie', authCookie).send(booking)
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('id')
   })

   it('should throw an error if the provided data is invalid', async () => {

   })

   it('shoud throw an error if there user is not authenticated', async () => {
      const res = await request(app).post(endpoint).send(booking)
      expect(res.status).toEqual(400)
   })
})


describe('update booking by id', () => {
   it('should update the booking if the user is authenticated, the id exists and the provided data is valid', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const bookingId = (await request(app).post(endpoint).set('Cookie', authCookie).send(booking)).body.id
      const res = await request(app).put(`${endpoint}/${bookingId}`).set('Cookie', authCookie).send({
         specialRequest: "nothing"
      })
      expect(res.status).toEqual(200)
   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).put(`${endpoint}/nonexistentid`).set('Cookie', authCookie).send({
         specialRequest: "nothing"
      })
      expect(res.status).toEqual(400)
   })
   it('should throw an error if the provided data is invalid', async () => {

   })
   it('shoud throw an error if there user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const bookingId = (await request(app).post(endpoint).set('Cookie', authCookie).send(booking)).body.id
      const res = await request(app).put(`${endpoint}/${bookingId}`).send({
         specialRequest: "nothing"
      })
      expect(res.status).toEqual(400)
   })
})


describe('delete booking by id', () => {
   it('should delete the booking if the user is authenticated and the id exists', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const bookingId = (await request(app).post(endpoint).set('Cookie', authCookie).send(booking)).body.id
      const res = await request(app).delete(`${endpoint}/${bookingId}`).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).delete(`${endpoint}/nonexistentid`).set('Cookie', authCookie)
      expect(res.status).toEqual(400)
   })
   it('shoud throw an error if there user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const bookingId = (await request(app).post(endpoint).set('Cookie', authCookie).send(booking)).body.id
      const res = await request(app).delete(`${endpoint}/${bookingId}`)
      expect(res.status).toEqual(400)
   })
})