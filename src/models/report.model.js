"use strict"

// Model definition for records table based on sequelize
const records = (sequelize, DataTypes) => sequelize.define('records',{
    // The records table has these attributes(columns)
    plate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cuisine:{
        type: DataTypes.STRING
    }
})

module.exports = records;