import Product from '../models/product'
import formidable from 'formidable'
import 'express-async-errors'
import fs from 'fs'
import { extend } from 'lodash'
import sharp from 'sharp'

const list = async (req, res) => {
	const { end, order, sort, start } = req.query
	const documentCount = await Product.collection.countDocuments()

	if (end && order && sort && start) {
		const query = Product.find({})
		query.sort({ [sort]: order })
		query.limit(Number(end) - Number(start))
		query.skip(Number(start))
    query.select('-image.data')  // Retrieve without image


		const products = await query.exec()
		res.set('xTotalCount', documentCount.toString())
		return res.json(products)
	}
	let { filter } = req.query
	filter = JSON.parse(filter)
	if (filter) {
		const products = await Product.find({ _id: { $in: filter.id } })
		res.set('xTotalCount', documentCount.toString())
		return res.json(products)
	}

}

const productById = async (req, res, next, id) => {
	const product = await Product.findById(id)
	if (!product) return res.status(400).json({ error: 'Product not found' })
	req.product = product
	next()
}

const read = async (req, res) => {

	return res.json(req.product)
}

const remove = async (req, res) => {
	const product = req.product
	const deletedProduct = await Product.remove()
	res.json(deletedProduct)
}

const removeMany = async (req, res) => {
	let { filter } = req.query
	console.log(filter)
	if (filter) {
		filter = JSON.parse(filter)
		console.log(filter)
		await Product.deleteMany({ _id: { $in: filter.id } })

		return res.json(filter.id)
	}
	return res.status(400).json({ error: 'Users not found' })
}

const create = async (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured' })
    }

    const product = new Product(fields)
    if (files.image) {
			const resizedImage = await sharp(fs.readFileSync(files.image.path))
				.resize({ height: 600, width: 600 })
				.toFile('./image')                        //resize image
      product.image.data = fs.readFileSync('./image') 
      product.image.contentType = files.image.type
    }

    await product.save()
    res.json({ id: product._id }) // react-admin only needs the id of the added resource
  })
}

const update = async(req, res) => {
	let form = new formidable.IncomingForm()
	form.keepExtensions = true
	form.parse(req, async (err, fields, files) => {
		if (err) {
			return res.status(400).json({ error: 'An error occured' })
		}

		let product = req.product
		product = extend(product, fields)
		if (files.image) {
			const resizedImage = await sharp(fs.readFileSync(files.image.path))
				.resize({ height: 600, width: 600 })
				.toFile('./image')
			product.image.data = fs.readFileSync('./image')
      product.image.contentType = files.image.type
		}
		await product.save()
		res.json(product)
	})
}

const image = async (req, res) => {
	res.set('Content-Type', req.product.image.contentType)
	return res.send(req.product.image.data)
}

export default { list, productById, read, remove, removeMany, create, image, update }