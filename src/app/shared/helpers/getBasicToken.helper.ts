export default (username: string, password: string) => Buffer.from(`${username}:${password}`).toString('base64')
