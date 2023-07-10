

export type ReviewsSubjects = 'Subject A' | 'Subject B' | 'Subject C'

export type ReviewType = {
   id: string,
   sentAt: string, //or better date?
   viewed: boolean,
   archived: boolean,
   subject: ReviewsSubjects,
   comment: string,
   personName: string,
   personLastname: string,
   personEmail: string,
   personPhone: string
}