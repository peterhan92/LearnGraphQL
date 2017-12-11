const mongoose = require('mongoose');
const graphql = require('graphql');
const { 
	GraphQLObjectType, 
	GraphQLList, 
	GraphQLID, 
	GraphQLNonNull 
} = graphql;
const OrganizationType = require('../models/organization/organization_type');
const LocationType = require('../models/location/location_type');
const EventType = require('../models/event/event_type');
const Organization = mongoose.model('organization');
const Location = mongoose.model('location');
const Event = mongoose.model('event');

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		organization: {
			type: OrganizationType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, { id }) {
				return Organization.findById(id);
			}
		},
		location: {
			type: LocationType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, { id }) {
				return Location.findById(id);
			}
		},
		event: {
			type: EventType,
			args: { id: { type: GraphQLID } },
			resolve(parentValue, { id }) {
				return Event.findById(id);
			}
		}
	})
});

module.exports = RootQuery;