const graphql = require('graphql');
const { 
  GraphQLID,
  GraphQLString, 
  GraphQLNonNull
} = graphql;
const mongoose = require('mongoose');
const Organization = mongoose.model('organization');
const Event = mongoose.model('event');
const OrganizationType = require('../organization/organization_type');
const EventType = require('./event_type');

exports.add = {
  type: EventType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    dateTime: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString ) },
    organizationId: { type: GraphQLID }
  },
  resolve(parentValue, { name, dateTime, description, organizationId }) {
    let currentDateTime = new Date().today() + " - " + new Date().timeNow();
    let newEvent = new Event({ name, dateTime, description, createdAt: currentDateTime, organizationId })
    Organization.findById(organizationId, (err, org) => {
      if (org) {
        org.events.push(newEvent);
        org.save(newEvent);
      }
    })
    return (newEvent.save());
  }
}

exports.edit = {
  type: EventType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLString },
    dateTime: { type: GraphQLString },
    description: { type: GraphQLString },
    organizationId: { type: GraphQLID }
  },
  async resolve(parentValue, args) {
    let currentDateTime = new Date().today() + " - " + new Date().timeNow();
    await Event.findByIdAndUpdate(args.id, { ...args, updatedAt: currentDateTime } );
    return Event.findById(args.id);
  }
}

exports.delete = {
  type: EventType,
  args: { 
    id: { type: new GraphQLNonNull(GraphQLID) } 
  },
  resolve(parentValue, { id }) {
    Event.findById(id, (err, event) => {
      Organization.findById(event.organizationId, (err, org) => {
        org.events.splice(org.events.indexOf(event.id), 1)
        org.save()
        return Event.remove({ _id: id})
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

