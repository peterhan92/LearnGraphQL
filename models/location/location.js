const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	name: { type: String },
	address: { type: String },
	latitude: { type: String },
	longitude: { type: String },
	createdAt: { type: String},
	updatedAt: { type: String},
	organizationId: {
		type: Schema.Types.ObjectId,
		ref: 'organization'
	}
})

mongoose.model('location', LocationSchema)