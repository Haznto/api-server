"use strict"

const games = (sequelize, DataTypes) => sequelize.define('games',{
    game: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category:{
        type: DataTypes.STRING
    }
})

module.exports = games;