const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alkemy'
});

//CHECK CONNECT
connection.connect(error =>{
    if (error) throw error;
    console.log("CONEXION OK");
});

module.exports = connection;