import request from 'supertest'
import app from '../app'
import { createAuthTestingSessionCookie } from '../Tests/utils'
import { RoomType } from "../Models/rooms";

const endpoint = '/rooms'

const room: Omit<RoomType, '_id'> = {
   name: "Deluxe Room",
   type: "double",
   number: 101,
   price: 200,
   discount: 20,
   description: "A spacious and luxurious room.",
   cancellationPolicy: "Free cancellation up to 24 hours before check-in.",
   amenities: {
      airConditioner: true,
      wifi: true,
      breakfast: true,
      kitchen: false,
      cleaning: true,
      shower: true,
      grocery: false,
      singleBed: false,
      nearShop: true,
      towels: true,
      onlineSupport: true,
      strongLocker: false,
      smartSecurity: true,
      expertTeam: false,
   },
   images: [
      "https://example.com/images/room1.jpg",
      "https://example.com/images/room2.jpg",
      "https://example.com/images/room3.jpg",
   ],
   bookings: [],
};



describe('get all rooms', () => {
   it('should retrieve all rooms if the user is authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).get(endpoint).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
   })

   it('shoud throw an error if there user is not authenticated', async () => {
      const res = await request(app).get(endpoint)
      expect(res.status).toEqual(400)
   })
})


describe('get room by id', () => {
   it('should retrieve the room if the user is authenticated and the id exists', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const roomId = (await request(app).post(endpoint).set('Cookie', authCookie).send(room)).body._id
      const res = await request(app).get(`${endpoint}/${roomId}`).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
      expect(res.body).toMatchObject({ _id: roomId, ...room })

   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).get(`${endpoint}/nonexistentid`).set('Cookie', authCookie)
      expect(res.status).toEqual(400)

   })
   it('shoud throw an error if there user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const roomId = (await request(app).post(endpoint).set('Cookie', authCookie).send(room)).body._id
      const res = await request(app).get(`${endpoint}/${roomId}`)
      expect(res.status).toEqual(400)
   })
})



describe('create new room', () => {
   it('should create new room if the user is authenticated and the provided data is valid', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).post(endpoint).set('Cookie', authCookie).send(room)
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('_id')
   })

   it('should throw an error if the provided data is invalid', async () => {

   })

   it('shoud throw an error if there user is not authenticated', async () => {
      const res = await request(app).post(endpoint).send(room)
      expect(res.status).toEqual(400)
   })
})



describe('update room by id', () => {
   it('should update the room if the user is authenticated, the id exists and the provided data is valid', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const roomId = (await request(app).post(endpoint).set('Cookie', authCookie).send(room)).body._id
      const res = await request(app).put(`${endpoint}/${roomId}`).set('Cookie', authCookie).send({
         description: "new description for the room"
      })
      expect(res.status).toEqual(200)
   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).put(`${endpoint}/nonexistentid`).set('Cookie', authCookie).send({
         description: "new description for the room"
      })
      expect(res.status).toEqual(400)
   })
   it('should throw an error if the provided data is invalid', async () => {

   })
   it('shoud throw an error if there user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const roomId = (await request(app).post(endpoint).set('Cookie', authCookie).send(room)).body._id
      const res = await request(app).put(`${endpoint}/${roomId}`).send({
         description: "new description for the room"
      })
      expect(res.status).toEqual(400)
   })
})



describe('delete room by id', () => {
   it('should delete the room if the user is authenticated and the id exists', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const roomId = (await request(app).post(endpoint).set('Cookie', authCookie).send(room)).body._id
      const res = await request(app).delete(`${endpoint}/${roomId}`).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).delete(`${endpoint}/nonexistentid`).set('Cookie', authCookie)
      expect(res.status).toEqual(400)
   })
   it('shoud throw an error if there user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const roomId = (await request(app).post(endpoint).set('Cookie', authCookie).send(room)).body._id
      const res = await request(app).delete(`${endpoint}/${roomId}`)
      expect(res.status).toEqual(400)
   })
})
