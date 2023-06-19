'use strict'

const { Sequelize, DataTypes } = require("sequelize");

const DB_URL = process.env.NODE_ENV === 'test'?'sqlite:memory:' :process.env.DB_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
    }
    
}
:{}

let sequelize = new Sequelize(DB_URL,sequelizeOptions);

let records = require('./report.model')
let games = require('./games.model')

module.exports = {
    db: sequelize,
    Records: records(sequelize,DataTypes),
    Games: games(sequelize,DataTypes)
}