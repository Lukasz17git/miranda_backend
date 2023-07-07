import request from 'supertest'
import app from '../app'
import { ReviewType } from "../Models/reviews";
import { createAuthTestingSessionCookie } from "../Tests/utils";

const endpoint = '/reviews'

const review: Omit<ReviewType, 'id'> = {
   sentAt: new Date(1672492800000).toISOString(),
   viewed: false,
   archived: false,
   subject: "Subject A",
   comment: "This is a sample comment.",
   personName: "Alice",
   personLastname: "Smith",
   personEmail: "alice@example.com",
   personPhone: "+1234567890",
};



describe('get all reviews', () => {
   it('should retrieve all reviews if the user is authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).get(endpoint).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
   })

   it('shoud throw an error if there user is not authenticated', async () => {
      const res = await request(app).get(endpoint)
      expect(res.status).toEqual(400)
   })
})



describe('get review by id', () => {
   it('should retrieve the review if the user is authenticated and the id exists', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const reviewId = (await request(app).post(endpoint).set('Cookie', authCookie).send(review)).body.id
      const res = await request(app).get(`${endpoint}/${reviewId}`).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
      res.body.archived = Boolean(res.body.archived)
      res.body.viewed = Boolean(res.body.viewed)
      expect(res.body).toMatchObject({ id: reviewId, ...review })

   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).get(`${endpoint}/nonexistentid`).set('Cookie', authCookie)
      expect(res.status).toEqual(400)

   })
   it('should throw an error if the user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const reviewId = (await request(app).post(endpoint).set('Cookie', authCookie).send(review)).body.id
      const res = await request(app).get(`${endpoint}/${reviewId}`)
      expect(res.status).toEqual(400)
   })
})



describe('create new review', () => {
   it('should create new review if the user is authenticated and the provided data is valid', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).post(endpoint).set('Cookie', authCookie).send(review)
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('id')
   })

   it('should throw an error if the provided data is invalid', async () => {

   })

   it('should throw an error if the user is not authenticated', async () => {
      const res = await request(app).post(endpoint).send(review)
      expect(res.status).toEqual(400)
   })
})



describe('update review by id', () => {
   it('should update the review if the user is authenticated, the id exists and the provided data is valid', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const reviewId = (await request(app).post(endpoint).set('Cookie', authCookie).send(review)).body.id
      console.log('reviewId', reviewId)
      const res = await request(app).put(`${endpoint}/${reviewId}`).set('Cookie', authCookie).send({
         comment: "nothing"
      })
      expect(res.status).toEqual(200)
   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).put(`${endpoint}/nonexistentid`).set('Cookie', authCookie).send({
         comment: "nothing"
      })
      expect(res.status).toEqual(400)
   })
   it('should throw an error if the provided data is invalid', async () => {

   })
   it('should throw an error if the user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const reviewId = (await request(app).post(endpoint).set('Cookie', authCookie).send(review)).body.id
      const res = await request(app).put(`${endpoint}/${reviewId}`).send({
         comment: "nothing"
      })
      expect(res.status).toEqual(400)
   })
})



describe('delete review by id', () => {
   it('should delete the review if the user is authenticated and the id exists', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const reviewId = (await request(app).post(endpoint).set('Cookie', authCookie).send(review)).body.id
      const res = await request(app).delete(`${endpoint}/${reviewId}`).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).delete(`${endpoint}/nonexistentid`).set('Cookie', authCookie)
      expect(res.status).toEqual(400)
   })
   it('should throw an error if the user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const reviewId = (await request(app).post(endpoint).set('Cookie', authCookie).send(review)).body.id
      const res = await request(app).delete(`${endpoint}/${reviewId}`)
      expect(res.status).toEqual(400)
   })
})
