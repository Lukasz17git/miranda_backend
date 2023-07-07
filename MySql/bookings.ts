import generateError from "../Errors/generateError"
import { BookingType } from "../Models/bookings"
import { generateMySqlCreationKeys, generateMySqlUpdateKeys } from "../Utils/mySqlUtils"
import { commandDB, queryDB } from "./connection"

export const createBookingsTable = async () => {
   try {
      await queryDB('db_initialization', `
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(255) PRIMARY KEY,
        roomId VARCHAR(255) NOT NULL,
        orderDate VARCHAR(29) NOT NULL,
        inDate VARCHAR(29),
        outDate VARCHAR(29),
        specialRequest TEXT,
        guestName VARCHAR(255),
        guestLastname VARCHAR(255),
        guestProfileUrl VARCHAR(255)
      );
    `)
   } catch (error) {
      console.log('error creating bookings table')
   }
}

export const getBookingsFromDB = async () => {
   const rows = await queryDB<BookingType>('booking', `SELECT * FROM bookings`)
   return rows
}

export const getBookingByIdInDB = async (id: string) => {
   const rows = await queryDB<BookingType>('booking', `SELECT * FROM bookings WHERE id = ?`, [id])
   return rows[0]
}

export const createBookingInDB = async (booking: BookingType) => {
   const keys = Object.keys(booking);
   const values = Object.values(booking);
   const { sqlKeys, sqlValues } = generateMySqlCreationKeys(keys);
   await commandDB('booking', `INSERT INTO bookings ${sqlKeys} VALUES ${sqlValues}`, values);
}

export const updateBookingInDB = async (bookingID: string, booking: Partial<BookingType>) => {
   const keys = Object.keys(booking);
   const values = Object.values(booking);
   const { sqlKeyValue } = generateMySqlUpdateKeys(keys);
   await commandDB('booking', `UPDATE bookings SET ${sqlKeyValue} WHERE id = ?`, [...values, bookingID]);
}

export const deleteBookingInDB = async (bookingID: string) => {
   await commandDB('booking', `DELETE FROM bookings WHERE id = ?`, [bookingID]);
}
