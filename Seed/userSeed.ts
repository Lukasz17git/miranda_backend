import { UserStatusType, UserType, UsersJobType } from "../Models/users";
import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'

const getRandomStatus = () => {
   const statuses: UserStatusType[] = ['active', 'inactive', 'vacation'];
   const randomIndex = Math.floor(Math.random() * statuses.length);
   return statuses[randomIndex];
}

const getRandomJob = () => {
   const jobs: UsersJobType[] = ['manager', 'receptionist', 'roomsService'];
   const randomIndex = Math.floor(Math.random() * jobs.length);
   return jobs[randomIndex];
}

const generateRandomUser = (withId = false) => {
   const password = faker.internet.password()
   const encryptedPassword = bcrypt.hashSync(password, 10)
   const user: Omit<UserType, '_id'> & { _id?: string } = {
      ...withId && { _id: faker.string.uuid() },
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      password: encryptedPassword,
      phone: faker.phone.number(),
      description: faker.lorem.sentences(),
      status: getRandomStatus(),
      job: getRandomJob(),
      dischargeDate: faker.date.future().toISOString(),
      profileImg: faker.image.avatar(),
   };

   return user;
}

export default generateRandomUser
