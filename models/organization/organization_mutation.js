const graphql = require('graphql');
const {
  GraphQLID,
  GraphQLString, 
  GraphQLNonNull
} = graphql;
const mongoose = require('mongoose');
const Organization = mongoose.model('organization');
const OrganizationType = require('./organization_type');

exports.add = {
  type: OrganizationType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, { name }) {
    let dateTime = new Date().today() + " - " + new Date().timeNow();
    return (new Organization({ name, createdAt: dateTime })).save();
  }
}

exports.edit = {
  type: OrganizationType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(parentValue, { id, name }) {
    let dateTime = new Date().today() + " - " + new Date().timeNow();
    return Organization.findById(id, (err, org) => {
      if (err) { 
        return Error('No Organization Found');
      } else {
        org.name = name;
        org.updatedAt = dateTime;
        org.save();
      }
    })
  }
}

exports.delete = {
  type: OrganizationType,
  args: { 
    id: { type: new GraphQLNonNull(GraphQLID) } 
  },
  resolve(parentValue, { id }) {
    return Organization.remove({ _id: id})
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

