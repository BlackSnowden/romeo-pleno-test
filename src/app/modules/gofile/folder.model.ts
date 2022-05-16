import mongoose from 'mongoose'
import Folder from './folder.protocol'

const Schema = new mongoose.Schema<Folder>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
)

export default mongoose.model('folders', Schema)
