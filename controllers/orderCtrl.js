import Order from '../models/orders'
import 'express-async-errors'
import { extend } from 'lodash'


const list = async (req, res) => {
	const { end, order, sort, start } = req.query
	const documentCount = await Order.collection.countDocuments()
	if (end && order && sort && start) {
		const query = Order.find({})
		query.sort({ [sort]: order })
		query.limit(Number(end) - Number(start))
		query.skip(Number(start))
		console.log(req.auth)

		const orders = await query.exec()
		res.set('xTotalCount', documentCount.toString())
		return res.json(orders)
	}
	let { filter } = req.query
	filter = JSON.parse(filter)
	if (filter) {
		const orders = await Order.find({ _id: { $in: filter.id } })
		res.set('xTotalCount', documentCount.toString())
		return res.json(orders)
	}

}

const orderById = async (req, res, next, id) => {
	const order = await Order.findById(id)
	if (!order) return res.status(400).json({ error: 'Order not found' })
	req.order = order
	next()
}

const read = async (req, res) => {
	return res.json(req.order)
}

const update = async (req, res) => {
	let order = req.order
	order = extend(order, req.body)
	await order.save()
	res.json(order)
}



export default { list, orderById, read, update }