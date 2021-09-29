import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

const saltRounds = 10


const adminSchema = new mongoose.Schema({
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

adminSchema.plugin(uniqueValidator)

adminSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

adminSchema.methods.comparePasswords = async function(candidatePassword) {
	return bcrypt.compare(candidatePassword, this.passwordHash)
}

const Admin = mongoose.model('Admin', adminSchema)
export default Admin
