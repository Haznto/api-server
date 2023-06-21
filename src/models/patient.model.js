'use strict'

const patient = (sequelize,DataTypes) => sequelize.define('patient',{
    patient: {
        type: DataTypes.STRING,
        allowNul: false
    },
    gender:{
        type: DataTypes.STRING
    }
})

module.exports = patient;