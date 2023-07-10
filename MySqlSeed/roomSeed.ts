import { faker } from '@faker-js/faker';
import { RoomType, RoomsTypes } from '../Models/rooms';

const getRandomRoomType = () => {
   const roomTypes: RoomsTypes[] = ['single', 'double', 'superior', 'suite'];
   const randomIndex = Math.floor(Math.random() * roomTypes.length);
   return roomTypes[randomIndex];
};

export const generateRandomRoom = () => {
   const randomRoom: RoomType = {
      id: faker.string.uuid(),
      name: faker.lorem.word(),
      type: getRandomRoomType(),
      number: faker.number.int({ min: 0, max: 999 }),
      price: faker.number.int({ min: 50, max: 200 }),
      discount: faker.number.int({ min: 0, max: 100 }),
      description: faker.lorem.paragraph(),
      cancellationPolicy: faker.lorem.sentence(),
      amenities: {
         airConditioner: faker.datatype.boolean(),
         wifi: faker.datatype.boolean(),
         breakfast: faker.datatype.boolean(),
         kitchen: faker.datatype.boolean(),
         cleaning: faker.datatype.boolean(),
         shower: faker.datatype.boolean(),
         grocery: faker.datatype.boolean(),
         singleBed: faker.datatype.boolean(),
         nearShop: faker.datatype.boolean(),
         towels: faker.datatype.boolean(),
         onlineSupport: faker.datatype.boolean(),
         strongLocker: faker.datatype.boolean(),
         smartSecurity: faker.datatype.boolean(),
         expertTeam: faker.datatype.boolean(),
      },
      images: [faker.image.url(), faker.image.url(), faker.image.url()],
      bookings: [],
   };
   return randomRoom;
};

export default generateRandomRoom;
