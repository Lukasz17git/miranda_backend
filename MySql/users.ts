import generateError from "../Errors/generateError"
import { UserType } from "../Models/users"
import { generateMySqlCreationKeys, generateMySqlUpdateKeys } from "../Utils/mySqlUtils"
import { commandDB, queryDB } from "./connection"

export const createUsersTable = async () => {
   try {
      await queryDB('db_initialization', `
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255),
        phone VARCHAR(255),
        description TEXT,
        status ENUM('active', 'inactive', 'vacation') DEFAULT 'active',
        job ENUM('manager', 'receptionist', 'roomsService') DEFAULT 'manager',
        dischargeDate VARCHAR(29),
        profileImg VARCHAR(255)
      );
    `)
   } catch (error) {
      console.log('error creating user table')
   }
}

export const getUserByEmailInDB = async (email: string) => {
   const rows = await queryDB<UserType>('user', `SELECT * FROM users WHERE email = ?`, [email])
   return rows[0]
}

export const createUserInDB = async (user: UserType) => {
   const keys = Object.keys(user)
   const values = Object.values(user)
   const { sqlKeys, sqlValues } = generateMySqlCreationKeys(keys)
   await commandDB('user', `INSERT INTO users ${sqlKeys} VALUES ${sqlValues}`, values)
}

export const updateUserInDB = async (userID: string, user: Partial<UserType>) => {
   const keys = Object.keys(user)
   const values = Object.values(user)
   const { sqlKeyValue } = generateMySqlUpdateKeys(keys)
   await commandDB('user', `UPDATE users SET ${sqlKeyValue} WHERE id = ?`, [...values, userID])
}

export const deleteUserInDB = async (userID: string) => {
   await commandDB('user', `DELETE FROM users WHERE id = ?`, [userID])
}