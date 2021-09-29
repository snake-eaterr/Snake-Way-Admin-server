import User from '../models/user'
import 'express-async-errors'

const list = async (req, res) => {
	const { end, order, sort, start } = req.query
	const documentCount = await User.collection.countDocuments()
	if (end && order && sort && start) {
		const query = User.find({})
		query.sort({ [sort]: order })
		query.limit(Number(end) - Number(start))
		query.skip(Number(start))
		console.log(req.auth)

		const users = await query.exec()
		res.set('xTotalCount', documentCount.toString())
		return res.json(users)
	}
	let { filter } = req.query
	filter = JSON.parse(filter)
	if (filter) {
		const users = await User.find({ _id: { $in: filter.id } })
		res.set('xTotalCount', documentCount.toString())
		return res.json(users)
	}

}

const userById = async (req, res, next, id) => {
	const user = await User.findById(id)
	if (!user) return res.status(400).json({ error: 'User not found' })
	req.profile = user
	next()
}

const read = async (req, res) => {
	return res.json(req.profile)
}

const remove = async (req, res) => {
	const user = req.profile
	const deletedUser = await user.remove()
	res.json(deletedUser)
}

const removeMany = async (req, res) => {
	let { filter } = req.query
	console.log(filter)
	if (filter) {
		filter = JSON.parse(filter)
		console.log(filter)
		await User.deleteMany({ _id: { $in: filter.id } })

		return res.json(filter.id)
	}
	return res.status(400).json({ error: 'Users not found' })
}


export default { list, userById, read, remove, removeMany }