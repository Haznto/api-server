'use strict'

const medicines = (sequelize,DataTypes) => sequelize.define('medicines',{
    drug: {
        type: DataTypes.STRING,
        allowNul: false
    },
    patientId:{
        type: DataTypes.INTEGER
    }
})

module.exports = medicines;