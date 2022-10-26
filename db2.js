const { Sequelize } = require ('sequelize');

const sequelize = new Sequelize('cac_22006','root','',{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql' 
});//instancio el objeto sequelize con los datos de la base de datos

module.exports = sequelize;