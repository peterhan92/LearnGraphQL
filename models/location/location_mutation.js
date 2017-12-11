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

exports.add = {
  type: LocationType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) },
    organizationId: { type: GraphQLID }
  },
  resolve(parentValue, { name, address, organizationId}) {
    let currentDateTime = new Date().today() + " - " + new Date().timeNow();
    let newLocation = new Location({ name, address, createdAt: currentDateTime, organizationId })
    Organization.findById(organizationId, (err, org) => {
      if (org) {
        org.locations.push(newLocation);
        org.save(newLocation);
      }
    })
    return (newLocation.save());
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
  resolve(parentValue, { id, name, address, organizationId}) {
    let currentDateTime = new Date().today() + " - " + new Date().timeNow();
    return Location.findById(id, (err, location) => {
      if (err) { 
        return Error('No Location Found');
      } else {
        if (name) {
          location.name = name;
        }
        if (address) {
          location.address = address;
        }
        if (organizationId) {
          location.organizationId = organizationId;
        }
        location.updatedAt = currentDateTime;
        location.save();
      }
    })
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

