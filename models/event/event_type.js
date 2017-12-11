const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,

} = graphql;
const Organization = mongoose.model('organization');
const Event = mongoose.model('event');

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    dateTime: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    organization: {
      type: require('../organization/organization_type'),
      resolve(parentValue) {
        return Organization.findById(parentValue.organizationId)
      }
    }
  })
});

module.exports = EventType;
