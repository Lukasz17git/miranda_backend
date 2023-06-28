import { BookingType } from "./bookings"

export type RoomTypeType = 'single' | 'double' | 'superior' | 'suite'

export type RoomStatusType = 'available' | 'occupied'

export type BookingStatusType = 'in' | 'out' | 'progress'


export type RoomType = {
   id: string,
   name: string,
   roomType: 'single' | 'double' | 'superior' | 'suite',
   roomNumber: number, //or string?
   price: number, // integer
   discount: number, //integer 0-100
   // status: 'available' | 'occupied', //no hace falta no?
   description: string,
   cancellationPolicy: string,

   amenities: AmenitiesType,
   images: string[],

   bookings: BookingType[]

}


type AmenitiesType = {
   airConditioner: boolean,
   wifi: boolean,
   breakfast: boolean,
   kitchen: boolean,
   cleaning: boolean,
   shower: boolean,
   grocery: boolean,
   singleBed: boolean,
   nearShop: boolean,
   towels: boolean,
   onlineSupport: boolean,
   strongLocker: boolean,
   smartSecurity: boolean,
   expertTeam: boolean
}