import mongoose from 'mongoose'
import User from './user.protocol'

const Schema = new mongoose.Schema<User>(
  {
    id: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    addressNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
)

export default mongoose.model('users', Schema)
