'use strict'

// requiring environment variables.
require('dotenv').config();

// importing the required dependencies.
const {start} = require('./src/server');
const { db } = require('./src/models');

//Assign the Port value.
const PORT = process.env.PORT || 5000;

// Synchronized Database
db.sync().then(()=>{
    start(PORT);
}).catch(err => console.log(err))