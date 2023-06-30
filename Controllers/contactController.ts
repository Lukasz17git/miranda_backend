import { Request, Response } from "express";
import handleError from "../Errors/handleError";
import { getContacts, saveContacts } from "../Utils/localSave";
import generateError from "../Errors/generateError";
import { v4 as nanoid } from 'uuid'
import { ContactType } from "../Models/contacts";


export const getContactsController = async (req: Request, res: Response) => {
   try {
      const contacts = getContacts()
      res.send(contacts)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}
export const getContactByIdController = async (req: Request, res: Response) => {
   try {
      const contactID = req.params.id
      const contacts = getContacts()
      const contact = contacts.find(contact => contact.id === contactID)
      if (!contact) throw generateError('database', 'contact', 'nonexistent')
      res.send(contact)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const createContactsController = async (req: Request, res: Response) => {
   try {
      const data = req.body
      const newContact = { id: nanoid(), ...data }
      const contacts = getContacts()
      contacts.push(newContact)
      saveContacts(contacts)
      res.send(newContact)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const updateContactsController = async (req: Request, res: Response) => {
   try {
      const data = req.body as Partial<ContactType>
      const contactID = req.params.id
      const contacts = getContacts()
      const contactIndex = contacts.findIndex(contact => contact.id === contactID)
      if (contactIndex === -1) throw generateError('database', 'contact', 'nonexistent')
      const updatedContact = { ...contacts[contactIndex], ...data }
      contacts[contactIndex] = updatedContact
      saveContacts(contacts)
      res.send(updatedContact)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}

export const deleteContactsController = async (req: Request, res: Response) => {
   try {
      const contactID = req.params.id
      const contacts = getContacts()
      const contactIndex = contacts.findIndex(contact => contact.id === contactID)
      if (contactIndex === -1) throw generateError('database', 'contact', 'nonexistent')
      contacts.splice(contactIndex, 1)
      saveContacts(contacts)
      res.sendStatus(200)

   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}