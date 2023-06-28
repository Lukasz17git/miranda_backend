

export type CommentType = {
   id: string,
   sentAt: number, //or better date?
   viewed: boolean,
   archived: boolean,
   subject: 'Subject A' | 'Subject B' | 'Subject C',
   comment: string,
   person: {
      name: string,
      lastname: string,
      email: string,
      phone: string
   }
}