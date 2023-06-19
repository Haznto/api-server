'use strict'

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())


const pageNotFound = require('./error-handlers/404')
const serverError = require('./error-handlers/500')
const recordsRouter = require('./routes/record')
const gamesRouter = require('./routes/games')


app.get('/', handleHome)
app.use(recordsRouter)
app.use(gamesRouter)

app.use('*', pageNotFound);
app.use(serverError);

function handleHome(req,res){
    res.status(200).json({
        code : 200,
        message : ' you are in the home page'
    })
}
function start (port) {
    app.listen(port,() => console.log(`up and running on port ${port}`));
}

module.exports = {
    start,
    app
}