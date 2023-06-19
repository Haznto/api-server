"use strict"

const records = (sequelize, DataTypes) => sequelize.define('records',{
    plate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cuisine:{
        type: DataTypes.STRING
    }
})

module.exports = records;