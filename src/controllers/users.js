const connection = require('../db/conectiondb');

const controllers = {};

controllers.getUsers = (req, res) => {
  try {
    connection.query('SELECT * FROM users', (error, results) => {
      if (error) {
        console.log('error en la query');
      }
      res.send(results);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

controllers.sendUser = (req, res) => {
  const data = req.body;
  try {
    connection.query('INSERT INTO users set ?', [data], (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

controllers.deleteUser = (req, res) => {
  const data = req.params.id;
  try {
    connection.query(
      'DELETE FROM users WHERE id = ?',
      [data],
      (error, results) => {
        if (error) throw error;
        res.send(results);
      },
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

controllers.updateUser = (req, res) => {
  const { nombre, apellido, direccion } = req.body;
  const { id } = req.params;
  const userUpdate = {
    nombre,
    apellido,
    direccion,
  };
  console.log('datos obtenidos:', userUpdate, 'id:', id);
  try {
    connection.query(
      'UPDATE users SET ? WHERE id_users = ?',
      [userUpdate, id],
      (error, results) => {
        if (error) {
          console.log('error al ejecutar la consulta sql:', error);
          res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
        console.log('Usuario actualizado correctamente');
        res.send(results);
      },
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = controllers;
