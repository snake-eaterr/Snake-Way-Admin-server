import express from 'express'
import authCtrl from './authCtrl'
import productCtrl from './productCtrl'

const productRouter = express.Router()

productRouter.route('/products')
	.get(authCtrl.requireLogin, productCtrl.list)
	.delete(authCtrl.requireLogin, productCtrl.removeMany)
	.post(authCtrl.requireLogin, productCtrl.create)

productRouter.route('/products/:productId')
	.get(authCtrl.requireLogin, productCtrl.read)
	.delete(authCtrl.requireLogin, productCtrl.remove)
	.put(authCtrl.requireLogin, productCtrl.update)

productRouter.route('/products/image/:productId')
	.get(productCtrl.image)

productRouter.param('productId', productCtrl.productById)

export default productRouter
