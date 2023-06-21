'use strict'
// importing the required dependencies.
const { Sequelize, DataTypes } = require("sequelize");

// Defining DATABASE_URL based on NODE_ENV && Defining the options for each environment.
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

// Establishing the connection using sequelize.
let sequelize = new Sequelize(DB_URL,sequelizeOptions);

// importing the required dependencies.
let profile = require('../models/lib/patient-profile')

let records = require('./report.model')
let games = require('./games.model')
let medicines = require('./medicines.model')
let patient = require('./patient.model')

const patientModel = patient(sequelize,DataTypes);
const medsModel = medicines(sequelize,DataTypes);

patientModel.hasMany(medsModel, {foreignKey: 'patientId', sourceKey: 'id'})
medsModel.belongsTo(patientModel, {foreignKey: 'patientId', targetKey: 'id'})

let patientProfile = new profile(patientModel)
let medsProfile = new profile(medsModel)

//exporing functionalities objects.
module.exports = {
    db: sequelize,
    Records: records(sequelize,DataTypes),
    Games: games(sequelize,DataTypes),
    // Medicines: medicines(sequelize,DataTypes),
    // Patient: patient(sequelize,DataTypes),
    patientProfile,
    medsProfile
}