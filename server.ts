import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import authRouter from './Routes/authRouter'
import usersRouter from './Routes/usersRouter'
import roomsRouter from './Routes/roomsRouter'
import contactsRouter from './Routes/contactRouter'
import bookingsRouter from './Routes/bookingsRouter'
import authorizationMiddleware from './Middlewares/auth'

dotenv.config()

//SET PORT
const PORT = process.env.PORT || 4000

//INITIALIZING THE APP
const app: Express = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true })) //
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50kb' }));

// PUBLIC ROUTES
app.get('/', (req, res) => res.send('Express + Typescript'))

app.use(authRouter)

// PROTECTED ROUTES
app.use(authorizationMiddleware)

app.use(usersRouter)
app.use(roomsRouter)
app.use(contactsRouter)
app.use(bookingsRouter)

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})