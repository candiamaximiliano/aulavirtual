const { DataTypes, INTEGER } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('alumno', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fotoDePerfil: {
      type: DataTypes.STRING,
      defaultValue: 'zunzuncito',
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fechaDeNacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numeroDeContacto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consentimientoWhatsapp: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    instructorado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    especializacion: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    profesorado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};