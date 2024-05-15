const bcrypt = require('bcryptjs');
const connection = require('../db/conectiondb');
const jwt = require('jsonwebtoken');

const controllers = {};

controllers.register = (req, res) => {
  const data = req.body;
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [data.email],
    async (error, results) => {
      if (error) {
        res.send(error);
      }
      if (results.length > 0) {
        res.status(409).json({ error: 'El usuario ya está registrado' });
      } else {
        const hashedPassword = await bcrypt.hash(data.password, 8);
        const user = {
          email: data.email,
          name: data.name,
          lastname: data.lastname,
          password: hashedPassword,
        };
        connection.query('INSERT INTO users set ?', user, (err, result) => {
          if (err) throw err;
          res.json(result);
        });
      }
    },
  );
};

controllers.login = (req, res) => {
  const data = req.body;
  connection.query(
    'SELECT * FROM users WHERE email = ? ',
    [data.email],
    async (error, result) => {
      if (error) throw error;

      if (
        result.length === 0 ||
        !(await bcrypt.compare(data.password, result[0].password))
      ) {
        res.status(401).json('Contraseña o email incorrecto');
      } else {
        res.status(200).json('datos correctos');
      }
    },
  );
};

module.exports = controllers;
