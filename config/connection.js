//import the sequalize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config()

//create connection to out database, pass in your MySQL information for username and password
const sequelize = new Sequelize(prcoess.env.DB_NAME,prcoess.env.DB_USER , prcoess.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql', 
    port: 3306
})

module.exports = sequelize