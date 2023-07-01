import fs from 'fs'
import path from 'path'
import { UserType } from '../Models/users'
import { ContactType } from '../Models/contacts'
import { RoomType } from '../Models/rooms'
import { BookingType } from '../Models/bookings'


const folderPath = path.join(__dirname, '/JsonData')

const dbData: Record<string, any> = {}


const retrieveDataLocally = <T>(fileName: string): T[] => {

   if (dbData[fileName]) {
      return JSON.parse(dbData[fileName])
   }

   const fullFilePath = path.join(folderPath, `${fileName}.json`)
   if (!fs.existsSync(fullFilePath)) return []

   const jsonData = fs.readFileSync(fullFilePath, 'utf8');
   if (!jsonData) return []
   return JSON.parse(jsonData);
}


const saveDataLocally = (fileName: string, data: any) => {
   const jsonData = JSON.stringify(data)

   dbData[fileName] = jsonData

   // const fullFilePath = path.join(folderPath, `${fileName}.json`)

   // fs.writeFileSync(fullFilePath, jsonData)
}

const usersFileName = 'users'
export const getUsers = () => retrieveDataLocally<UserType>(usersFileName)
export const saveUsers = (updatedUsers: UserType[]) => saveDataLocally(usersFileName, updatedUsers)

const roomsFileName = 'rooms'
export const getRooms = () => retrieveDataLocally<RoomType>(roomsFileName)
export const saveRooms = (upadtedRooms: RoomType[]) => saveDataLocally(roomsFileName, upadtedRooms)

const bookingsFileName = 'bookings'
export const getBookings = () => retrieveDataLocally<BookingType>(bookingsFileName)
export const saveBookings = (updatedBookings: BookingType[]) => saveDataLocally(bookingsFileName, updatedBookings)

const contactsFileName = 'contacts'
export const getContacts = () => retrieveDataLocally<ContactType>(contactsFileName)
export const saveContacts = (updatedContacts: ContactType[]) => saveDataLocally(contactsFileName, updatedContacts)