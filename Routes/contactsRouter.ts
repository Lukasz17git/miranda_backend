import express from 'express'
import { createContactsController, deleteContactsController, getContactByIdController, getContactsController, updateContactsController } from '../Controllers/contactController'

const contactsRouter = express.Router()

contactsRouter.get('/', getContactsController)
contactsRouter.get('/:id', getContactByIdController)
contactsRouter.post('/', createContactsController)
contactsRouter.put('/:id', updateContactsController)
contactsRouter.delete('/:id', deleteContactsController)

export default contactsRouter