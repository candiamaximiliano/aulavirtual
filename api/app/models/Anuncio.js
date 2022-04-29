const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('anuncio', {
    base64: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitulo: {
     type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    texto: {
      type: DataTypes.TEXT,
    },
    recursos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};