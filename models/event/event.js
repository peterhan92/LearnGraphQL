const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	name: { type: String },
	dateTime: { type: String },
	description: { type: String },
	createdAt: { type: String },
	updatedAt: { type: String },
	organizationId: {
		type: Schema.Types.ObjectId,
		ref: 'organization'
	}
})

mongoose.model('event', EventSchema)