const mysql = require('mysql2');

// create the connection
const connection = mysql.createConnection({ 
  host: '127.0.0.1',
  user: 'root', 
  database: 'groupomania' 
});

module.exports = connection.promise();