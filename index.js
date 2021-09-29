import http from 'http'
import app from './app'

const server = http.createServer(app)
const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
	console.log(`server running at port ${PORT}`)
})