import { Request, Response } from "express";
import handleError from "../Errors/handleError";


export const infoController = async (req: Request, res: Response) => {
   try {
      console.log('inside info controller')
      const info = {
         name: 'Hotel Miranda',
         privateEnpoints: {
            user: ['get', 'get/:id', 'post', 'put', 'delete'],
            rooms: ['get', 'get/:id', 'post', 'put', 'delete'],
            contacts: ['get', 'get/:id', 'post', 'put', 'delete'],
            bookings: ['get', 'get/:id', 'post', 'put', 'delete'],
         }
      }
      res.send(info)
   } catch (error) {
      const handledError = handleError(error)
      return res.status(handledError.status).send(error)
   }
}