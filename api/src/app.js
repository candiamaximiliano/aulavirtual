const express = require ('express');

const cors = require('cors');
const morgan = require ('morgan');

require('./db.js');

const server = express();

server.name = 'API';

// const userExtractor = require('./src/middleware/userExtractor') //usar este middleware para rutas privadas.
const notFound = require('./middleware/notFound');
const handdleErrors = require('./middleware/handleErrors');

//Importación de rutas
const login = require('./routes/login.routes');
const home = require('./routes/home.routes');
const clases = require('./routes/clases.routes');
const users = require('./routes/users.routes');

//first line middlewares
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//routes
server.use('/login', login);
server.use('/home', home);
server.use('/clases', clases);
server.use('/users', users);

//controllers
server.get('/', (req, res) =>{
  res.send('Ingresar al Aula');
});

server.use(notFound)
server.use(handdleErrors)

module.exports = server;