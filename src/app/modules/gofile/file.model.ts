import mongoose from 'mongoose'
import File from './file.protocol'

const Schema = new mongoose.Schema<File>(
  {
    id: { type: String, required: true, unique: true },
    folderId: { type: String, required: true },
    name: { type: String, required: true },
  },
  { versionKey: false, timestamps: true },
)

export default mongoose.model('files', Schema)
