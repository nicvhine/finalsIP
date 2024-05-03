const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 5,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'tasks',
    debug : false

    //DEPLOYED DB
    // connectionLimit : 5,
    // host : 'localhost',
    // user : 'tasks',
    // password : 'tasks',
    // database : 'tasks',
    // debug : false
});

module.exports = pool;      