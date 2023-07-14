import mongoose from "mongoose"

const dbUri = process.env.DBURI || ''
console.log('dbUri', dbUri)

export const initialDatabaseConnection = () => new Promise((res, rej) => {
   mongoose.connect(dbUri)
   const database = mongoose.connection
   database.syncIndexes()
   database.on('error', error => rej(error))
   database.once('open', () => res(true))
}) 