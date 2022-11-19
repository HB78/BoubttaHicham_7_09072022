const mysql = require('mysql2');
//on importe dotenv pour avoir les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

// create the connection
const connection = mysql.createConnection({ 
  host: process.env.HOST,
  user: process.env.USER, 
  database: process.env.DATABASE
});

module.exports = connection.promise();