const mysql = require('mysql2/promise');


var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'apidouglas'
});

module.exports = connection;