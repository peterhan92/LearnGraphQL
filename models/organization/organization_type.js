const mongoose = require('mongoose');
const graphql = require('graphql');
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLID, 
  GraphQLList 
} = graphql;
const LocationType = require('../location/location_type');
const EventType = require('../event/event_type');
const Organization = mongoose.model('organization');

const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parentValue) {
        return Organization.findLocations(parentValue.id)
      }
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parentValue) {
        return Organization.findEvents(parentValue.id)
      }
    }
  })
});

module.exports = OrganizationType;
