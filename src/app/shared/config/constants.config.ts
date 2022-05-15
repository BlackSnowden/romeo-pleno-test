import path from 'path'

const environment = <{ [x: string]: string | undefined }>{
  linkapi_gateway_username: process.env.LINKAPI_GATEWAY_USERNAME,
  linkapi_gateway_password: process.env.LINKAPI_GATEWAY_PASSWORD,

  output_path: process.env.OUTPUT_PATH,

  mongo_protocol: process.env.MONGO_PROTOCOL,
  mongo_host: process.env.MONGO_HOST,
  mongo_port: process.env.MONGO_PORT,
  mongo_collection: process.env.MONGO_COLLECTION,
  mongo_username: process.env.MONGO_USERNAME,
  mongo_password: process.env.MONGO_PASSWORD,

  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  redis_password: process.env.REDIS_PASSWORD,

  node_env: process.env.NODE_ENV,
  root_dir: path.resolve(__dirname, '../../../../'),

  server_port: process.env.SERVER_PORT,
}

export default environment
