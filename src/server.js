'use strict'

// importing the required dependencies.
const express = require('express');
const cors = require('cors');
const app = express();

// Using Libraries inside express.
app.use(cors());
app.use(express.json())

//require dependencies
const pageNotFound = require('./error-handlers/404')
const serverError = require('./error-handlers/500')
const recordsRouter = require('./routes/record')
const gamesRouter = require('./routes/games')
const medicineRouter = require('./routes/medicines')
const patientRouter = require('./routes/patient')

// using Router
app.get('/', handleHome)
app.use(recordsRouter)
app.use(gamesRouter)
app.use(medicineRouter)
app.use(patientRouter)

// using error handlers
app.use('*', pageNotFound);
app.use(serverError);

// defining route of Home
function handleHome(req,res){
    res.status(200).json({
        code : 200,
        message : ' you are in the home page'
    })
}

// start listening to the server.
function start (port) {
    app.listen(port,() => console.log(`up and running on port ${port}`));
}

//exporing functionalities objects.
module.exports = {
    start,
    app
}