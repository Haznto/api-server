'use strict'
// Model definition for medicines table based on sequelize
const medicines = (sequelize,DataTypes) => sequelize.define('medicines',{
     // The medicines table has these attributes(columns)
    drug: {
        type: DataTypes.STRING,
        allowNul: false
    },
    patientId:{
        type: DataTypes.INTEGER
    }
})

module.exports = medicines;