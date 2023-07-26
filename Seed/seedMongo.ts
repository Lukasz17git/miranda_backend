import { ObjectId } from "mongoose"
import { createBookingInDB } from "../Mongo/bookings"
import { createReviewInDB } from "../Mongo/reviews"
import { createRoomInDB } from "../Mongo/rooms"
import { createUserInDB } from "../Mongo/users"
import generateRandomBooking from "./bookingSeed"
import generateRandomReview from "./reviewSeed"
import generateRandomRoom from "./roomSeed"
import generateRandomUser from "./userSeed"

const seedDatabase = async () => {

   const users = Array(10).fill(0).map(_ => generateRandomUser())
   users.forEach(user => createUserInDB(user))

   const reviews = Array(20).fill(0).map(_ => generateRandomReview())
   reviews.forEach(review => createReviewInDB(review))

   const rooms = Array(10).fill(0).map(_ => generateRandomRoom())
   const roomsPromise = rooms.map(room => createRoomInDB(room))
   const roomsInDb = await Promise.all(roomsPromise)
   
   const roomIds = roomsInDb.map(room => room._id)
   const bookings = Array(30).fill(0).map(_ => generateRandomBooking(roomIds))
   bookings.forEach(bookingWithRoom => {
      const { roomId, ...booking } = bookingWithRoom
      createBookingInDB(roomId, booking)
   })

}

export default seedDatabase