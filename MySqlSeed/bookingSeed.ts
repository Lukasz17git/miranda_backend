import { faker } from '@faker-js/faker';
import { BookingType } from '../Models/bookings';

const getRandomRoomId = (roomIds: string[]) => {
   const randomIndex = Math.floor(Math.random() * roomIds.length);
   return roomIds[randomIndex];
};

export const generateRandomBooking = (roomIds: string[]) => {
   const randomBooking: BookingType = {
      id: faker.string.uuid(),
      roomId: getRandomRoomId(roomIds),
      orderDate: faker.date.past().toISOString(),
      inDate: faker.date.past().toISOString(),
      outDate: faker.date.future().toISOString(),
      specialRequest: faker.lorem.sentence(),
      guestName: faker.person.firstName(),
      guestLastname: faker.person.lastName(),
      guestProfileUrl: faker.image.avatar(),
   };
   return randomBooking;
};

export default generateRandomBooking;
