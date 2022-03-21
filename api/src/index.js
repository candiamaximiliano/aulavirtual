require('dotenvv').config()
require('mongodb')

const express = require ('express');
const app = express();
const cors = require('cors');
const morgan = require ('morgan');


//Importación de rutas
const login = require('./routes/login.routes');
const homeRoutes = require('./routes/home.routes');
const clases = require('./routes/clases.routes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(login);
app.use(homeRoutes);
app.use(clases);

app.get('/', (req, res) =>{
  res.send('Ingresar al Aula');
});

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));