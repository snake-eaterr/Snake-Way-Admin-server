import dotnev from 'dotenv'

dotnev.config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

export default { MONGODB_URI, JWT_SECRET }