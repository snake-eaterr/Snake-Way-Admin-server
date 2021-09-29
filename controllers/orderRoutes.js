import express from 'express'
import authCtrl from './authCtrl'
import orderCtrl from './orderCtrl'

const orderRouter = express.Router()


orderRouter.route('/orders')
	.get(authCtrl.requireLogin, orderCtrl.list)

orderRouter.route('/orders/:orderId')
	.get(authCtrl.requireLogin, orderCtrl.read)
	.put(authCtrl.requireLogin, orderCtrl.update)


orderRouter.param('orderId', orderCtrl.orderById)
export default orderRouter