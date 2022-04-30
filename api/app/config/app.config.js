const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const cors = require('cors');

//Importación de rutas
const user = require('../routes/user.routes');
const auth = require('../routes/auth.routes');
const clases = require('../routes/clases.routes');
const cursos = require('../routes/cursos.routes');
const materias = require('../routes/materias.routes');
const anuncios = require('../routes/anuncios.routes');

require('../config/db.config');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
// server.use(cors())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://fundacioncrearte.online'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//simple route
server.get('/api', (req, res, next) =>{
  try {
    res.send('API Aula Virtual Profesorado en Ritmos Caribeños');
  } catch (error) {
    next(error);
  }
});

// routes
server.use('/api', auth);
server.use('/api', user);
server.use('/api', anuncios);
server.use('/api', clases);
server.use('/api', materias);
server.use('/api', cursos);


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
