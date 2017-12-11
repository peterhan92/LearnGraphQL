Go to: localhost:4000/graphiql

and

Enter GraphQL Queries

# CREATE ORGANIZATION
example: mutation {
 	addOrganization(name: "Econify") {
    id,
		name,
    createdAt,
    updatedAt,
    locations {
      id
    },
    events {
      id
    } 
  }
}

# READ ORGexample: 
{
  organization(id: "5a2e68cdaf7e068a989a95a3") {
    id,
    name,
    createdAt,
    updatedAt,
    locations {
      id,
      name
    },
    events {
      id,
      name
    }
  }
}

# EDIT ORGANIZATION
example: mutation {
 	editOrganization(id: "5a2e68cdaf7e068a989a95a3", name: "Dropbox") {
    id,
    name,
    createdAt,
    updatedAt,
    locations {
      id,
      name
    },
    events {
      id,
      name
    }
  }
}

# DELETE ORGANIZATION
example: mutation {
 	deleteOrganization(id: "5a2e68cdaf7e068a989a95a3") {
    id
  }
}

# CREATE LOCATION
example: mutation {
 	addLocation(name: "Workspace", address: "Manhattan, NY", organizationId: "5a2e68cdaf7e068a989a95a3") {
    id,
		name,
    address,
    latitude,
    longitude,
    createdAt,
    updatedAt
    organization {
      id,
      name
    }
  }
}

# READ LOCATIONexample: 
{
  location(id: "5a2e68e8af7e068a989a95a4") {
    id,
		name,
    address,
    latitude,
    longitude,
    createdAt,
    updatedAt
    organization {
      id,
      name
    }
  }
}

# EDIT LOCATION
example: mutation {
  editLocation(id: "5a2e68e8af7e068a989a95a4" organizationId: "5a2e55998fd13a8513184920") {
    id,
		name,
    address,
    latitude,
    longitude,
    createdAt,
    updatedAt
    organization {
      id,
      name
    }
  }
}


# DELETE LOCATION 
example: mutation {
 	deleteLocation(id: "5a2e68e8af7e068a989a95a4") {
    id,
		name,
    address
  }
}


# CREATE EVENT
example: mutation {
 	addEvent(name: "First Meet Up", dateTime: "11/28/17 - 18:00:00", description: "Learn, Code and Eat Pizza", organizationId: "5a2e68cdaf7e068a989a95a3") {
    id,
		name,
    dateTime,
		description,
    createdAt,
    updatedAt
    organization {
      id,
      name
    }
  }
}

# READ EVENTexample: 
{
  event(id: "5a2e695daf7e068a989a95a5") {
     id,
     name,
     dateTime,
     description,
     createdAt,
     updatedAt
     organization {
       id,
       name
     }
  }
}

# EDIT EVENT
example: mutation {
  editEvent(id: "5a2e695daf7e068a989a95a5", name: "Meet Up 1", dateTime: "11/28/17 - 18:00:00", description: "Learn, Code, and Eat pizza") {
    id,
     name,
     dateTime,
     description,
     createdAt,
     updatedAt
     organization {
       id,
       name
     }
  }
}


# DELETE EVENT 
example: mutation {
 	deleteEvent(id: "5a2e695daf7e068a989a95a5") {
    id,
		name
  }
}