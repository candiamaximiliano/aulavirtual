const { Clase } = require('../config/db.config');

const getClases = async () => {
  try {
    return await Clase.findAll();
  } catch (error) {
    next(error);
  }
};

const getClaseById = async (req, res) =>{
  try {
    const { claseId } = req.query;
    const totalClases = await getClases();
    if(claseId) {
      const claseById = await totalClases.filter(clase => clase.id.toLowerCase().includes(claseId.toLowerCase()));
      claseById.length?
      res.status(200).send(claseById):
      res.status(404).send('No existe un video con ese identificador');
    } else {
      res.status(200).send(totalClases);
    }
  } catch (error) {
    console.error(error);
  }
}

const postClase = async (req, res) =>{
  try {
    const {  
      nombre, 
      url, 
      profesores, 
      recursos, 
    } = req.body;
    
    const claseUploaded = await Clase.create({
      nombre, 
      url, 
      profesores, 
      recursos,
    });
    res.send('Clase subida correctamente');

  } catch (error) {
    next(error);
  }
  
  };

const putClase = async (req, res) =>{
  try {
    const { id } = req.params;
    const { nombre, url, profesores, recursos} = req.body;
    const ClaseUpdated = Clase.update({
      nombre: nombre,
      url: url,
      profesores: profesores,
      recursos: recursos,
    })
    res.send('Clase actualizada correctamente')
  } catch (error) {
    next(error);
  }
};

const deleteClase = async (req, res) =>{
  try {
    const { id } = req.params;
    const ClaseEliminada = await Clase.destroy({
      where: {
        id: id,
      }
    })
    res.send('Clase eliminada correctamente')
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClases, getClaseById, postClase, putClase, deleteClase
}