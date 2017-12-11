const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
	name: { type: String },
	createdAt: { type: String },
	updatedAt: { type: String },
	locations: [{
		type: Schema.Types.ObjectId,
		ref: 'location'
	}],
	events: [{
		type: Schema.Types.ObjectId,
		ref: 'event'
	}]
})

OrganizationSchema.statics.findLocations = function(id) {
	return this.findById(id)
		.populate('locations')
		.then(org => org.locations)
}

OrganizationSchema.statics.findEvents = function(id) {
	return this.findById(id)
		.populate('events')
		.then(org => org.events)
}

mongoose.model('organization', OrganizationSchema)