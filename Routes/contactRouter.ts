import express from 'express'
import { createContactsController, deleteContactsController, getContactsController, updateContactsController } from '../Controllers/contactController'

const contactsRouter = express.Router()

contactsRouter.get('/contacts', getContactsController)
contactsRouter.post('/contacts', createContactsController)
contactsRouter.put('/contacts', updateContactsController)
contactsRouter.delete('/contacts', deleteContactsController)

export default contactsRouter