import express from 'express'
import { infoController } from '../Controllers/infoController'

const infoRouter = express.Router()

infoRouter.get('/', infoController)

export default infoRouter