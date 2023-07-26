import { faker } from '@faker-js/faker';
import { BookingType } from '../Models/bookings';
import { ObjectId } from 'mongoose';

const getRandomRoomId = (roomIds: ObjectId[]) => {
   const randomIndex = Math.floor(Math.random() * roomIds.length);
   return roomIds[randomIndex];
};

export const generateRandomBooking = (roomIds: ObjectId[]) => {
   const randomBooking: Omit<BookingType, '_id'> & { _id?: string } = {
      roomId: getRandomRoomId(roomIds),
      orderDate: faker.date.past().toISOString(),
      inDate: faker.date.past().toISOString(),
      outDate: faker.date.future().toISOString(),
      specialRequest: faker.lorem.sentence(),
      guest: {
         name: faker.person.firstName(),
         lastname: faker.person.lastName(),
         profileUrl: faker.image.avatar(),
      }
   };
   return randomBooking;
};

export default generateRandomBooking;
