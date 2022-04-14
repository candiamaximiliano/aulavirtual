const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('clase', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profesores: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    recursos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};