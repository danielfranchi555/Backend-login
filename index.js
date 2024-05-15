/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const app = express();
const puerto = 3001;
const cors = require('cors');
const dotenv = require('dotenv');
const usersRoutes = require('./src/routes/users');
const authRoutes = require('./src/routes/auth');

app.use(cors());
dotenv.config();
app.use(express.json());

// Configurar rutas
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

app.listen(puerto, () => {
  console.log(`escuchando en el puerto ${puerto}`);
});
