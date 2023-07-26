

export type ReviewsSubjects = 'Subject A' | 'Subject B' | 'Subject C'

export type ReviewType = {
   _id: string,
   sentAt: string,
   viewed: boolean,
   archived: boolean,
   subject: ReviewsSubjects,
   comment: string,
   person: {
      name: string,
      lastname: string,
      email: string,
      phone: string
   }
}