import { Schema, model } from "mongoose"
import { UserType } from "../Models/users"
import generateError from "../Errors/generateError"

const userSchema = new Schema({
   name: { type: String },
   lastname: { type: String },
   email: { type: String, required: true, minlength: 5, maxlength: 60, lowercase: true },
   password: { type: String, required: true },
   phone: { type: String, minlength: 7, maxlength: 20 },
   description: { type: String },
   status: { type: String },
   job: { type: String },
   dischargeDate: { type: String },
   profileImg: { type: String },
})

const User = model('User', userSchema)

export const getUserByEmailInDB = async (email: string) => {
   const query = { email }
   const user = await User.findOne(query).exec()
   if (!user) throw generateError('database', 'user', 'nonexistent')
   console.log('user', user)
   return user
}

export const createUserInDB = async (user: Omit<UserType, '_id'>) => {
   const newUser = await new User(user).save()
   console.log('newUser', newUser)
   return newUser
}

export const updateUserInDB = async (userID: string, user: Partial<UserType>) => {
   const query = { _id: userID }
   const toUpdate = { $set: user }
   const updatedUser = await User.findOneAndUpdate(query, toUpdate).exec()
   if (!updatedUser) throw generateError('database', 'user', 'nonexistent')
   return updatedUser
}

export const deleteUserInDB = async (userID: string) => {
   const deletedUser = await User.findByIdAndDelete(userID).exec()
   console.log('deletedUser', deletedUser)
}