import generateError from "../Errors/generateError"
import { RoomType } from "../Models/rooms"
import { generateMySqlCreationKeys, generateMySqlUpdateKeys } from "../Utils/mySqlUtils"
import { commandDB, queryDB } from "./connection"

export const createRoomsTable = async () => {
   try {
      await queryDB('db_initialization', `
      CREATE TABLE IF NOT EXISTS rooms (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type ENUM('single', 'double', 'superior', 'suite') NOT NULL,
        number INT NOT NULL,
        price INT NOT NULL,
        discount INT NOT NULL,
        description TEXT,
        cancellationPolicy TEXT,
        amenities JSON NOT NULL,
        images JSON,
        bookings JSON
      );
    `)
   } catch (error) {
      console.log('error creating rooms table')
   }
}

export const getRoomsFromDB = async () => {
   const rows = await queryDB<RoomType>('room', `SELECT * FROM rooms`)
   return rows
}

export const getRoomByIdInDB = async (id: string) => {
   const rows = await queryDB<RoomType>('room', `SELECT * FROM rooms WHERE id = ?`, [id]);
   return rows[0]
}

export const createRoomInDB = async (room: RoomType) => {
   const keys = Object.keys(room);
   const values = Object.values(room);
   const { sqlKeys, sqlValues } = generateMySqlCreationKeys(keys);
   await commandDB('room', `INSERT INTO rooms ${sqlKeys} VALUES ${sqlValues}`, values);
}

export const updateRoomInDB = async (roomID: string, room: Partial<RoomType>) => {
   const keys = Object.keys(room);
   const values = Object.values(room);
   const { sqlKeyValue } = generateMySqlUpdateKeys(keys);
   await commandDB('room', `UPDATE rooms SET ${sqlKeyValue} WHERE id = ?`, [...values, roomID]);
}

export const deleteRoomInDB = async (roomID: string) => {
   console.log(roomID, 'deleting room');
   await commandDB('room', `DELETE FROM rooms WHERE id = ?`, [roomID]);
}
