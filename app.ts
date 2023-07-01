import express, { Express, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './Routes/authRouter'
import usersRouter from './Routes/userRouter'
import roomsRouter from './Routes/roomsRouter'
import contactsRouter from './Routes/contactsRouter'
import bookingsRouter from './Routes/bookingsRouter'
import authorizationMiddleware from './Middlewares/auth'
import infoRouter from './Routes/infoRouter'

//INITIALIZING THE APP
const app: Express = express()
app.use(cors({ origin: 'http://localhost:5173', credentials: true })) //
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50kb' }));
app.use(cookieParser())

// PUBLIC ROUTES
app.get('/', (_, res: Response) => {
   res.send('Hello, World!');
});

app.use(authRouter)
app.use('/info', infoRouter)


// PROTECTED ROUTES
app.use(authorizationMiddleware)

app.use('/user', usersRouter)
app.use('/rooms', roomsRouter)
app.use('/contacts', contactsRouter)
app.use('/bookings', bookingsRouter)

export default app