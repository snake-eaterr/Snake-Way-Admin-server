import Admin from '../models/admin'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import 'express-async-errors'
import config from '../utils/config'
import bcrypt from 'bcrypt'

const login = async (req, res) => {
	const body = req.body
	const admin = await Admin.findOne({ username: body.username })
	if (!admin) {
		return res.status(401).json({ error:'wrong credentials' })
	}

	const isMatch = await admin.comparePasswords(body.password)

	if (!isMatch) {
		return res.status(401).json({ error: 'wrong credentials' })
	}

	const token = jwt.sign({ id: admin._id }, config.JWT_SECRET)
	return res.json({ token })
}

const logout = async (req, res) => {
	return res.status(200).end()
}

const requireLogin = expressJwt({
	secret: config.JWT_SECRET,
	algorithms: ['HS256'],
	userProperty: 'auth'
})

/*const signup = async (req, res) => {
	const body = req.body
	const passwordHash = await bcrypt.hash(body.password, 10)

	const admin = new Admin({
		username: body.username,
		passwordHash
	})
	await admin.save()
	return res.status(200).json({ message: 'got it' })
} */

export default { login, logout, requireLogin }