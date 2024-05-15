/* eslint-disable import/no-extraneous-dependencies */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'database-1',
});

connection.connect((err) => {
  if (err) {
    console.log('error de conexion');
  } else {
    console.log('conexion exitosa');
  }
});

module.exports = connection;
