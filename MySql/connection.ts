import mysql, { OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { createUsersTable } from './users'
import { createRoomsTable } from './rooms'
import { createBookingsTable } from './bookings'
import { createReviewsTable } from './reviews'
import generateError, { ErrorField } from '../Errors/generateError'

const mysqlConnectionOptions = {
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: '123123',
}
const databaseName = 'miranda'

export const queryDB = async <T>(errorField: ErrorField, mysqlQuery: string, values?: any[]): Promise<T[]> => {
   const dbConnectionOptions = { ...mysqlConnectionOptions, database: databaseName }
   const connection = await mysql.createConnection(dbConnectionOptions)
   const [rows, fields] = await (values ? connection.execute<RowDataPacket[]>(mysqlQuery, values) : connection.execute<RowDataPacket[]>(mysqlQuery))
   if (rows.length === 0) throw generateError('database', errorField, 'nonexistent')
   return rows as T[]
}

export const commandDB = async (errorField: ErrorField, mysqlQuery: string, values: any[]) => {
   const dbConnectionOptions = { ...mysqlConnectionOptions, database: databaseName }
   const connection = await mysql.createConnection(dbConnectionOptions)
   const [rows, fields] = await (values ? connection.execute<ResultSetHeader>(mysqlQuery, values) : connection.execute<ResultSetHeader>(mysqlQuery))
   if (rows.affectedRows === 0) throw generateError('database', errorField, 'nonexistent')
   return rows
}

const createDatabase = async () => {
   try {
      await queryDB('unknown', `CREATE DATABASE IF NOT EXISTS ${databaseName}`)
   } catch (error) {
      throw 'error creating database'
   }
}

export const initialDatabaseConnection = async () => {
   await Promise.all([
      createDatabase(),
      createUsersTable(),
      createRoomsTable(),
      createBookingsTable(),
      createReviewsTable()
   ])
}

export default queryDB