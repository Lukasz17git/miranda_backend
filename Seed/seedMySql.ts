import { createBookingInDB } from "../MySql/bookings"
import { createReviewInDB } from "../MySql/reviews"
import { createRoomInDB } from "../MySql/rooms"
import { createUserInDB } from "../MySql/users"
import generateRandomBooking from "./bookingSeed"
import generateRandomReview from "./reviewSeed"
import generateRandomRoom from "./roomSeed"
import generateRandomUser from "./userSeed"

const seedDatabase = () => {

   const users = Array(10).fill(0).map(_ => generateRandomUser(true))
   users.forEach(user => createUserInDB(user))

   const reviews = Array(20).fill(0).map(_ => generateRandomReview(true))
   reviews.forEach(review => createReviewInDB(review))

   const rooms = Array(10).fill(0).map(_ => generateRandomRoom(true))
   rooms.forEach(room => createRoomInDB(room))

   const roomIds = rooms.map(room => room._id)
   const bookings = Array(30).fill(0).map(_ => generateRandomBooking(roomIds))
   bookings.forEach(booking => createBookingInDB(booking))

}

export default seedDatabase