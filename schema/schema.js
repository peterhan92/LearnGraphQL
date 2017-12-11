const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('./root_query_type');
const mutations = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});






// const graphql = require('graphql');
// const axios = require('axios');
// const mongoose = require('mongoose');
// const { GraphQLSchema } = graphql;
// const {
// 	GraphQLObjectType,
// 	GraphQLID,
// 	GraphQLString,
// 	GraphQLFloat,
// 	GraphQLList,
// 	GraphQLNonNull
// } = graphql;


// const OrganizationType = new GraphQLObjectType({
// 	name: 'Organization',
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		name: { type: GraphQLString },
// 		createdAt: { type: GraphQLString },
// 		updatedAt: { type: GraphQLString },
// 		locations: {
// 			type: new GraphQLList(LocationType),
// 			resolve(parentValue, args) {
// 				return axios.get(`http://localhost:3000/organization/${parentValue.id}/locations`)
// 					.then(res => res.data)
// 			}
// 		},
// 		events: {
// 			type: new GraphQLList(EventType),
// 			resolve(parentValue, args) {
// 				return axios.get(`http://localhost:3000/organization/${parentValue.id}/locations`)
// 					.then(res => res.data)
// 			}
// 		}
// 	})
// });

// const LocationType = new GraphQLObjectType({
// 	name: 'Location',
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		name: { type: GraphQLString },
// 		address: { type: GraphQLString },
// 		latitude: { type: GraphQLFloat },
// 		longitude: { type: GraphQLFloat },
// 		createdAt: { type: GraphQLString },
// 		updatedAt: { type: GraphQLString },
// 		organization: {
// 			type: OrganizationType,
// 			resolve(parentValue, args) {
// 				return axios.get(`http://localhost:3000/organizations/${parentValue.organizationId}`)
// 					.then(res => res.data)
// 			}
// 		}
// 	})
// });

// const EventType = new GraphQLObjectType({
// 	name: 'Event',
// 	fields: () => ({
// 		id: { type: GraphQLID },
// 		name: { type: GraphQLString },
// 		date: { type: GraphQLString },
// 		time: { type: GraphQLString }
// 		description: { type: GraphQLString },
// 		createdAt: { type: GraphQLString },
// 		updatedAt: { type: GraphQLString },
// 		organization: {
// 			type: OrganizationType,
// 			resolve(parentValue, args) {
// 				return axios.get(`http://localhost:3000/organizations/${parentValue.organizationId}`)
// 					.then(res => res.data)
// 			}
// 		}
// 	})
// });


// const RootQuery = new GraphQLObjectType({
// 	name: "RootQueryType",
// 	fields: {
// 		organization: {
// 			type: OrganizationType,
// 			args: { id: { type: GraphQLID } },
// 			resolve(parentValue, args) {
// 				return axios.get(`http://localhost:3000/organizations/${args.id}`)
// 					.then(res => res.data)
// 			}
// 		},
// 		location: {
// 			type: LocationType,
// 			args: { id: { type: GraphQLID } },
// 			resolve(parentValue, args) {
// 				return axios.get(`http://localhost:3000/locations/${args.id}`)
// 					.then(res => res.data)
// 			}
// 		},
// 		event: {
// 			type: EventType,
// 			args: { id: { type: GraphQLID } },
// 			resolve(parentValue, args) {
// 				return axios.get(`http://localhost:3000/events/${args.id}`)
// 					.then(res => res.data)
// 			}
// 		}, 
// 	}
// });

// const mutation = new GraphQLObjectType({
// 	name: 'Mutation',
// 	fields: {
// 		addLocation: {
// 			type: LocationType,
// 			args: {
// 				name: { type: new GraphQLNonNull(GraphQLString) },
// 				address: { type: new GraphQLNonNull(GraphQLString) },
// 				organizationId: { type: GraphQLID }
// 			},
// 			resolve(parentValue, { name, address }) {
// 				return axios.post('http://localhost:3000/locations', { name, address })
// 					.then(res => res.data)
// 			}
// 		},
// 		deleteLocation: {
// 			type: LocationType,
// 			args: { 
// 				id: { type: new GraphQLNonNull(GraphQLID) } 
// 			},
// 			resolve(parentValue, { id }) {
// 				return axios.delete(`http://localhost:3000/locations/${id}`)
// 				.then(res => res.data)
// 			}
// 		},
// 		editLocation: {
// 			type: LocationType,
// 			args: { 
// 				id: { type: new GraphQLNonNull(GraphQLID) },
// 				name: { type: GraphQLString },
// 				address: { type: GraphQLString },
// 				organizationId: { type: GraphQLID }
// 			},
// 			resolve(parentValue, args) {
// 				return axios.patch(`http://localhost:3000/locations/${args.id}`, args)
// 				.then(res => res.data)
// 			}
// 		},
// 		addEvent: {
// 			type: EventType,
// 			args: {
// 				name: { type: new GraphQLNonNull(GraphQLString) },
// 				date: { type: new GraphQLNonNull(GraphQLString) },
// 				time: { type: new GraphQLNonNull(GraphQLString) },
// 				description: { type: new GraphQLNonNull(GraphQLString ) },
// 				organizationId: { type: GraphQLID }
// 			},
// 			resolve(parentValue, { name, date, time, description }) {
// 				return axios.post('http://localhost:3000/events', { name, date, time, description })
// 					.then(res => res.data)
// 			}
// 		},
// 		deleteEvent: {
// 			type: EventType,
// 			args: { 
// 				id: { type: new GraphQLNonNull(GraphQLID) } 
// 			},
// 			resolve(parentValue, { id }) {
// 				return axios.delete(`http://localhost:3000/events/${id}`)
// 				.then(res => res.data)
// 			}
// 		},
// 		editEvent: {
// 			type: EventType,
// 			args: { 
// 				id: { type: new GraphQLNonNull(GraphQLID) },
// 				name: { type: GraphQLString },
// 				date: { type: GraphQLString },
// 				time: { type: GraphQLString },
// 				description: { type: GraphQLString },
// 				organizationId: { type: GraphQLID }
// 			},
// 			resolve(parentValue, args) {
// 				return axios.patch(`http://localhost:3000/events/${args.id}`, args)
// 				.then(res => res.data)
// 			}
// 		}
// 	}
// })

// module.exports = new GraphQLSchema({
// 	query: RootQuery,
// 	mutation
// })