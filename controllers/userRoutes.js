import express from 'express'
import userCtrl from './userCtrl'
import authCtrl from './authCtrl'



const userRouter = express.Router()

userRouter.route('/users')
							.get(authCtrl.requireLogin, userCtrl.list)
							.delete(authCtrl.requireLogin, userCtrl.removeMany)

userRouter.route('/users/:userId')
							.get(authCtrl.requireLogin, userCtrl.read)
							.delete(authCtrl.requireLogin, userCtrl.remove)

userRouter.param('userId', userCtrl.userById)

export default userRouter