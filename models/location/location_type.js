const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLFloat,
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
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
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
