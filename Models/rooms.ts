import { BookingType } from "./bookings"

export type RoomsTypes = 'single' | 'double' | 'superior' | 'suite'

export type RoomType = {
   id: string,
   name: string,
   type: RoomsTypes,
   number: number,
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