import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		minlength: 3
	},
	passwordHash: {
		type: String,
		required: true,
	}
})

userSchema.plugin(uniqueValidator)

userSchema.post('save', function(error, doc, next) {
	if (error.name) {
		next(new Error('Username already taken'))
	} else {
		next(error)
	}
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})



const User = mongoose.model('User', userSchema)


export default User