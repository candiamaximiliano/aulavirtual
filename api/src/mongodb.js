const mongoose = require('mongoose');
const {model, Schema} = mongoose

const connectionString = process.env.MONGO_DB_URI;

//conexión a mongodb
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

  //Crear esquema con Scheme

  //Crear modelo con model