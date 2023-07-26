import { faker } from '@faker-js/faker';
import { ReviewType, ReviewsSubjects } from '../Models/reviews';

const getRandomSubject = () => {
   const subjects: ReviewsSubjects[] = ['Subject A', 'Subject B', 'Subject C'];
   const randomIndex = Math.floor(Math.random() * subjects.length);
   return subjects[randomIndex];
}

export const generateRandomReview = (withId = false) => {
   const randomReview: Omit<ReviewType, '_id'> & { _id?: string } = {
      ...withId && { _id: faker.string.uuid() },
      sentAt: faker.date.past().toISOString(),
      viewed: faker.datatype.boolean(),
      archived: faker.datatype.boolean(),
      subject: getRandomSubject(),
      comment: faker.lorem.paragraph(),
      person: {
         name: faker.person.firstName(),
         lastname: faker.person.lastName(),
         email: faker.internet.email(),
         phone: faker.phone.number(),
      }
   }
   return randomReview
}

export default generateRandomReview

