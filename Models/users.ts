
export type UserStateType = 'active' | 'inactive' | 'vacation'

export type EmployeeJobsType = 'receptionist' | 'rooms_service'

export const initialEmployeeState = {
   name: '',
   lastname: '',
   email: '',
   phone: '',
   dischargeDate: '2023-06-09',
   description: '',
   state: 'active' as UserStateType,
   job: 'receptionist' as EmployeeJobsType,
   profileUrl: ''
}

export type EmployeeType = typeof initialEmployeeState