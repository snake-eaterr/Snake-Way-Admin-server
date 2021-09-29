import express from 'express'
import compress from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './utils/config'
import userRouter from './controllers/userRoutes'
import authRouter from './controllers/authRoutes'
import productRouter from './controllers/productRoutes'
import orderRouter from './controllers/orderRoutes'
import middleware from './utils/middleware'
import helmet from 'helmet'

//modules for server side rendering. Rating from material-ui/lab breaks ssr. Migrate to v5 before implementing
/*
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './client/src/App'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core'
import theme from './client/src/theme'
*/
const app = express()

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
	.then(() => console.log('connected to mongodb'))
	.catch(error => {
		console.log(`error connecting to mongodb. error: ${error.message}`)
})
const corsOptions = {
	exposedHeaders: 'xTotalCount'
}
app.use(cors(corsOptions))
app.use(helmet())
app.use(express.static('build'))
app.use(express.json())

app.use('/api', userRouter)
app.use('/auth', authRouter)
app.use('/api', productRouter)
app.use('/api', orderRouter)

// server side rendering
/*
app.get('*', (req, res) => {
	const sheets = new ServerStyleSheets()
	const context = {}
	const markup = ReactDOMServer.renderToString(
		sheets.collect(
			<StaticRouter location={req.url} context={context}>
				<ThemeProvider theme={theme}>
					<MainRouter />
				</ThemeProvider>
			</StaticRouter>
		)
	)

	if (context.url) {
		return res.redirect(303, context.url)
	}



	const css = sheets.toString()
	let indexHTML = fs.readFileSync(path.resolve(__dirname, '../build/index.html'), {
		encoding: 'utf-8'
	})


	indexHTML = indexHTML.replace(`<div id="root"></div>`, `<div id="root">${markup}</div>`)
	indexHTML = indexHTML.replace(`<style id="jss-server-side"></style>`, `<style id="jss-server-side">${css}</style>`)

	res.send(indexHTML)
})
*/

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app