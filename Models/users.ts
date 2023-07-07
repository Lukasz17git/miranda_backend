

export type UserStatusType = 'active' | 'inactive' | 'vacation'
export type UsersJobType = 'manager' | 'receptionist' | 'roomsService'

export type UserType = {
   id: string,
   name: string,
   lastname: string,
   email: string,
   password: string,
   phone?: string,
   description?: string,
   status: UserStatusType,
   job: UsersJobType,
   dischargeDate?: string,
   profileImg?: string,
}
