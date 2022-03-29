const { User } = require('../db');

const getAllUsers = async () => {
    return await User.findAll();
  };

const getUser = async (req, res) =>{
  try {
    const { userId } = req.query;
    const totalUsers = await getAllUsers();
    if(userId) {
      const userById = await totalUsers.filter(user => user.id.toLowerCase().includes(userId.toLowerCase()));
      userById.length?
      res.status(200).send(userById):
      res.status(404).send('No existe ese usuario');
    } else {
      res.status(200).send(totalUsers);
    }
  } catch (error) {
    console.error(error);
  }
}

const postUser = async (req, res) =>{
  const { 
    fotoDePerfil, 
    nombre, 
    apellido, 
    usuario, 
    email, 
    contraseña, 
    dni, 
    fechaDeNacimiento, 
    direccion, 
    numeroDeContacto, 
    consentimientoWhatsapp, 
  } = req.body;
  
  const userCreated = await User.create({
    fotoDePerfil, 
    nombre, 
    apellido, 
    usuario, 
    email, 
    contraseña, 
    dni, 
    fechaDeNacimiento, 
    direccion, 
    numeroDeContacto, 
    consentimientoWhatsapp,
  });
  res.send('Usuario registrado correctamente');
  };

module.exports = {
  getUser,
  postUser,
}