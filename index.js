'use-strict';
/******************
* API - INDEX.JS
******************/

// Imports
require('dotenv').config();
const bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// System configuration variables
const { DB_NAME, DB_URL, PORT } = require('./system/config');

// Middleware
app.use(morgan('common'));
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes'));
app.use('*', function(req, res, next) {
	res.status(404).send("Sorry, I can't find that!");
});

// Set some mongoose options by default to avoid errors
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Set DB options
const options = {
	dbName: `${DB_NAME}`,
	autoIndex: false, // Don't build indexes
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect --- Getting DeprecationWarning - incompatible with unified topology
  // reconnectInterval: 500, // Reconnect every 500ms --- Getting DeprecationWarning - incompatible with unified topology
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
	keepAlive: true, keepAliveInitialDelay: 300000,
	useNewUrlParser: true,
	useUnifiedTopology: true
}

// Connect to the database
mongoose.connect(DB_URL, options)
	.then(() => {
		console.log(`mongoose connected to ${DB_URL}`);
	})
	.catch(err => {
		console.log('mongoose is not connected', err);
	})

// Start the server
app.listen(process.env.PORT || 3001, function(err) {
	console.log(`SUCCESS: Your APP is listening on port ${process.env.PORT}`);
	if (err) {
		console.log(`FAILURE: Your app is not working properly`);
		reject(err);
	}
});
