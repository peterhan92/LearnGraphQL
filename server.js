const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();

const MONGO_URI = 'mongodb://phan:jpak1014@ds135876.mlab.com:35876/econify-graphql'
if (!MONGO_URI) {
	throw new Error("Invalid MONGO URI");
}

mongoose.connect(MONGO_URI, { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.connection
	.once('open', () => console.log('Connected to MLab instance.'))
	.on('error', error => console.log('Error connecting to MLab: ', error))

app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('Listening on port 4000...')
})