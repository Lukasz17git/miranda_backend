import { faker } from '@faker-js/faker';
import { ReviewType, ReviewsSubjects } from '../Models/reviews';

const getRandomSubject = () => {
   const subjects: ReviewsSubjects[] = ['Subject A', 'Subject B', 'Subject C'];
   const randomIndex = Math.floor(Math.random() * subjects.length);
   return subjects[randomIndex];
}

export const generateRandomReview = () => {
   const randomReview: ReviewType = {
      id: faker.string.uuid(),
      sentAt: faker.date.past().toISOString(),
      viewed: faker.datatype.boolean(),
      archived: faker.datatype.boolean(),
      subject: getRandomSubject(),
      comment: faker.lorem.paragraph(),
      personName: faker.person.firstName(),
      personLastname: faker.person.lastName(),
      personEmail: faker.internet.email(),
      personPhone: faker.phone.number(),
   }
   return randomReview
}

export default generateRandomReview

