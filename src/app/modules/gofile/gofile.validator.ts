import { SchemaDefinition } from 'validate'

const createFolder = <SchemaDefinition>{
  folderName: {
    type: String,
    match: /[a-z0-9_-]+/i,
    required: true,
    message: { match: 'Invalid folder name', required: 'Folder name is required' },
  },
}

const uploadFile = <SchemaDefinition>{
  folderName: {
    type: String,
    match: /[a-z0-9_-]+/i,
    required: true,
    message: { match: 'Invalid folder name', required: 'Folder name is required' },
  },
  file: {
    required: true,
    message: { required: 'File is required' },
  },
}

const deleteFile = <SchemaDefinition>{
  folderName: {
    type: String,
    match: /[a-z0-9_-]+/i,
    required: true,
    message: { match: 'Invalid folder name', required: 'Folder name is required' },
  },
  filename: {
    type: String,
    match: /[a-z0-9_\-.]+/i,
    required: true,
    message: { match: 'Invalid filename', required: 'Filename is required' },
  },
}

export default { createFolder, uploadFile, deleteFile }
