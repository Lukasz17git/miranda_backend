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
import { initialDatabaseConnection } from './Mongo/connection'
import { getAdminController } from './Controllers/authController'

//create db tables
initialDatabaseConnection().then(() => {
   console.log('connected to database')
}).catch(() => {
   console.log('error connecting to database')
})

//INITIALIZING THE APP
const app: Express = express()
const dashboardUri = ['http://localhost:5173', 'http://miranda-dashboard-app.s3-website-eu-west-1.amazonaws.com']
app.use(cors({ origin: dashboardUri, credentials: true })) //credentials es para enviar cookies, no se si para Auth headers también
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

app.get('/authorization', getAdminController)
app.use('/users', usersRouter)
app.use('/rooms', roomsRouter)
app.use('/reviews', reviewsRouter)
app.use('/bookings', bookingsRouter)

export default app