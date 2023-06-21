'use strict'

// Model definition for patient table based on sequelize
const patient = (sequelize,DataTypes) => sequelize.define('patient',{
    // The patient table has these attributes(columns)
    patient: {
        type: DataTypes.STRING,
        allowNul: false
    },
    gender:{
        type: DataTypes.STRING
    }
})

module.exports = patient;