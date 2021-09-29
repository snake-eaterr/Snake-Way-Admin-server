import express from 'express'
import authCtrl from './authCtrl'

const authRouter = express.Router()

authRouter.route('/login')
							.post(authCtrl.login)

authRouter.route('/logout')
					.get(authCtrl.logout)

export default authRouter