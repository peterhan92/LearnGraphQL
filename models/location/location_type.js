const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString
} = graphql;
const Organization = mongoose.model('organization');
const Location = mongoose.model('location');

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    latitude: { type: GraphQLString },
    longitude: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    organization: {
      type: require('../organization/organization_type'),
      resolve(parentValue, args) {
        return Organization.findById(parentValue.organizationId)
      }
    }
  })
});

module.exports = LocationType;
