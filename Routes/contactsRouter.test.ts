import request from 'supertest'
import app from '../app'
import { ContactType } from "../Models/contacts";
import { createAuthTestingSessionCookie } from "../Tests/utils";

const endpoint = '/contacts'

const contact: Omit<ContactType, 'id'> = {
   sentAt: 1672492800000, // March 1, 2023 (in milliseconds)
   viewed: false,
   archived: false,
   subject: "Subject A",
   comment: "This is a sample comment.",
   person: {
      name: "Alice",
      lastname: "Smith",
      email: "alice@example.com",
      phone: "+1234567890",
   },
};



describe('get all contacts', () => {
   it('should retrieve all contacts if the user is authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).get(endpoint).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
   })

   it('shoud throw an error if there user is not authenticated', async () => {
      const res = await request(app).get(endpoint)
      expect(res.status).toEqual(400)
   })
})



describe('get contact by id', () => {
   it('should retrieve the contact if the user is authenticated and the id exists', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const contactId = (await request(app).post(endpoint).set('Cookie', authCookie).send(contact)).body.id
      const res = await request(app).get(`${endpoint}/${contactId}`).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
      expect(res.body).toMatchObject({ id: contactId, ...contact })

   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).get(`${endpoint}/nonexistentid`).set('Cookie', authCookie)
      expect(res.status).toEqual(400)

   })
   it('should throw an error if the user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const contactId = (await request(app).post(endpoint).set('Cookie', authCookie).send(contact)).body.id
      const res = await request(app).get(`${endpoint}/${contactId}`)
      expect(res.status).toEqual(400)
   })
})



describe('create new contact', () => {
   it('should create new contact if the user is authenticated and the provided data is valid', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).post(endpoint).set('Cookie', authCookie).send(contact)
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('id')
   })

   it('should throw an error if the provided data is invalid', async () => {

   })

   it('should throw an error if the user is not authenticated', async () => {
      const res = await request(app).post(endpoint).send(contact)
      expect(res.status).toEqual(400)
   })
})



describe('update contact by id', () => {
   it('should update the contact if the user is authenticated, the id exists and the provided data is valid', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const contactId = (await request(app).post(endpoint).set('Cookie', authCookie).send(contact)).body.id
      const res = await request(app).put(`${endpoint}/${contactId}`).set('Cookie', authCookie).send({
         specialRequest: "nothing"
      })
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('specialRequest', 'nothing')
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
   it('should throw an error if the user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const contactId = (await request(app).post(endpoint).set('Cookie', authCookie).send(contact)).body.id
      const res = await request(app).put(`${endpoint}/${contactId}`).send({
         specialRequest: "nothing"
      })
      expect(res.status).toEqual(400)
   })
})



describe('delete contact by id', () => {
   it('should delete the contact if the user is authenticated and the id exists', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const contactId = (await request(app).post(endpoint).set('Cookie', authCookie).send(contact)).body.id
      const res = await request(app).delete(`${endpoint}/${contactId}`).set('Cookie', authCookie)
      expect(res.status).toEqual(200)
   })
   it('should throw an error if the provided id doesnt exist', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const res = await request(app).delete(`${endpoint}/nonexistentid`).set('Cookie', authCookie)
      expect(res.status).toEqual(400)
   })
   it('should throw an error if the user is not authenticated', async () => {
      const authCookie = await createAuthTestingSessionCookie()
      const contactId = (await request(app).post(endpoint).set('Cookie', authCookie).send(contact)).body.id
      const res = await request(app).delete(`${endpoint}/${contactId}`)
      expect(res.status).toEqual(400)
   })
})
