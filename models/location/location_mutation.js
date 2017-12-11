const graphql = require('graphql');
const { 
  GraphQLID,
  GraphQLString, 
  GraphQLNonNull
} = graphql;
const mongoose = require('mongoose');
const Organization = mongoose.model('organization');
const Location = mongoose.model('location');
const OrganizationType = require('../organization/organization_type');
const LocationType = require('./location_type');
let googlePlaces = require('./google_places');

exports.add = {
  type: LocationType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    organizationId: { type: GraphQLID }
  },
  async resolve(parentValue, { name, address, organizationId}) {
    await googlePlaces.convertToLatLng(address, next)
    async function next(location) {
      let currentDateTime = new Date().today() + " - " + new Date().timeNow();
      let newLocation = new Location({ name, latitude: location.lat, longitude: location.lng, address, createdAt: currentDateTime, organizationId })
      Organization.findById(organizationId, (err, org) => {
        if (org) {
          org.locations.push(newLocation);
          org.save(newLocation);
        }
      })
      return await newLocation.save();
    }
  }
}

exports.edit = {
  type: LocationType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    organizationId: { type: GraphQLID }
  },
  async resolve(parentValue, args) {
    let currentDateTime = new Date().today() + " - " + new Date().timeNow();
    await Location.findByIdAndUpdate(args.id, { ...args, updatedAt: currentDateTime } );
    return Location.findById(args.id);
  }
}

exports.delete = {
  type: LocationType,
  args: { 
    id: { type: new GraphQLNonNull(GraphQLID) } 
  },
  resolve(parentValue, { id }) {
    Location.findById(id, (err, location) => {
      Organization.findById(location.organizationId, (err, org) => {
        org.locations.splice(org.locations.indexOf(location.id), 1)
        org.save()
        return Location.remove({ _id: id})
      })
    })
  }
}

// For todays date;
Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

