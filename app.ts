import express, { Express, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './Routes/authRouter'
import usersRouter from './Routes/usersRouter'
import roomsRouter from './Routes/roomsRouter'
import reviewsRouter from './Routes/reviewsRouter'
import bookingsRouter from './Routes/bookingsRouter'
import authorizationMiddleware from './Middlewares/auth'
import infoRouter from './Routes/infoRouter'
import { initialDatabaseConnection } from './MySql/connection'

//create db tables
initialDatabaseConnection().then(() => {
   console.log('connected to database')
}).catch(() => {
   console.log('error connecting to database')
})

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
app.use('/reviews', reviewsRouter)
app.use('/bookings', bookingsRouter)

export default app