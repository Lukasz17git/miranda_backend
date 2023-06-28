
export type GuestType = {
   // id: string, no hace falta no?
   name: string,
   lastname: string,
   profileUrl: string,
}


export type BookingType = {
   id: string, // he movido el id del guest a aqui, tiene más sentido
   orderDate: number,
   inDate: number,
   outDate: number,
   // state: 'in' | 'out' | 'progress', //no hace falta no?
   specialRequest: string,
   guest: GuestType,
}
