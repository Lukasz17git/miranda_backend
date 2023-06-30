import { BookingType } from "./bookings"

export type RoomType = {
   id: string,
   name: string,
   roomType: 'single' | 'double' | 'superior' | 'suite',
   roomNumber: number,
   price: number,
   discount: number,
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