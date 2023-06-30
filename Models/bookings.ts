
export type BookingType = {
   id: string,
   orderDate: number,
   inDate: number,
   outDate: number,
   specialRequest: string,
   guest: {
      name: string,
      lastname: string,
      profileUrl: string,
   },
}
