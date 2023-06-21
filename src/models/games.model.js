"use strict"
// Model definition for games table based on sequelize
const games = (sequelize, DataTypes) => sequelize.define('games',{
    // The games table has these attributes(columns)
    game: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category:{
        type: DataTypes.STRING
    }
})

module.exports = games;