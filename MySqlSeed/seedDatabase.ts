import { createBookingInDB } from "../MySql/bookings"
import { createReviewInDB } from "../MySql/reviews"
import { createRoomInDB } from "../MySql/rooms"
import { createUserInDB } from "../MySql/users"
import generateRandomBooking from "./bookingSeed"
import generateRandomReview from "./reviewSeed"
import generateRandomRoom from "./roomSeed"
import generateRandomUser from "./userSeed"

const seedDatabase = () => {

   const users = Array(10).fill(0).map(_ => generateRandomUser())
   users.forEach(user => createUserInDB(user))
   console.log('users', users)

   const reviews = Array(20).fill(0).map(_ => generateRandomReview())
   reviews.forEach(review => createReviewInDB(review))
   console.log('reviews', reviews)

   const rooms = Array(10).fill(0).map(_ => generateRandomRoom())
   rooms.forEach(room => createRoomInDB(room))
   console.log('rooms', rooms)

   const roomIds = rooms.map(room => room.id)
   const bookings = Array(30).fill(0).map(_ => generateRandomBooking(roomIds))
   bookings.forEach(booking => createBookingInDB(booking))
   console.log('bookings', bookings)

}

export default seedDatabase