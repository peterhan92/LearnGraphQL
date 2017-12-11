const graphql = require('graphql');
const { 
  GraphQLObjectType
} = graphql;
const organizationMutation = require('../models/organization/organization_mutation');
const locationMutation = require('../models/location/location_mutation');
const eventMutation = require('../models/event/event_mutation');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addOrganization: organizationMutation.add,
    editOrganization: organizationMutation.edit,
    deleteOrganization: organizationMutation.delete,
    addLocation: locationMutation.add,
    editLocation: locationMutation.edit,
    deleteLocation: locationMutation.delete,
    addEvent: eventMutation.add,
    editEvent: eventMutation.edit,
    deleteEvent: eventMutation.delete
  }
})

module.exports = mutation;
