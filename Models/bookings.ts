import { ObjectId } from "mongoose"

export type BookingType = {
   _id: string,
   roomId: string,
   orderDate: string,
   inDate: string,
   outDate: string,
   specialRequest: string,
   guest: {
      name: string,
      lastname: string,
      profileUrl: string,
   }
}
