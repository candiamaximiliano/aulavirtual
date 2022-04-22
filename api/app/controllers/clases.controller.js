const { Clase, Curso, Materia } = require('../config/db.config');

const getClases = async () => {
  try {
    return await Clase.findAll({
    attributes: ['id', 'nombre', 'url', 'profesores', 'recursos'],
    include: [{
        model: Curso,
        attributes: ['nombre']
    },
    {
        model: Materia,
        attributes: ['nombre']
    }],
});
  } catch (error) {
    console.error(error);
  }
};

const getClaseById = async (req, res, next) =>{
  const { claseId } = req.params;
  try {
    const totalClases = await getClases();
    if(claseId) {
      const claseById = await totalClases.filter(clase => clase.id.toLowerCase().includes(claseId.toLowerCase()));
      claseById.length?
      res.status(200).send(claseById):
      res.status(404).send('No existe un video con ese identificador');
    } else {
      res.status(404).send('Por favor ingrese un identificador por params');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

const getClaseByCurse = async (req, res, next) => {
  const { curso } = req.query;
  try {
    const totalClases = await getClases();
    if(curso) {
      const clasesPorCurso = await Clase.findAll({
        where: {
          Curso: curso,
        }
      })
      if (clasesPorCurso.length <=0) return res.status(404).send('Clases no encontradas, probablemente el curso que busque no exista.')
      return clasesPorCurso;
    } else {
      totalClases.length > 0 ? res.status(200).send(totalClases) : res.status(404).send('No se encontraron clases');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const postClase = async (req, res, next) =>{
  try {
    const {
      curso,
      materia,  
      nombre, 
      url, 
      profesores, 
      recursos, 
    } = req.body;

    const parseStringToArray = (str) => {
      let array = str.split(", ")
    return array;
 }  

    console.log({
      curso,
      materia,  
      nombre, 
      url, 
      profesores, 
      recursos, 
    })
    
    const newClase = await Clase.create({
      nombre, 
      url, 
      profesores: parseStringToArray(profesores), 
      recursos: parseStringToArray(recursos),
    });

    const cursoDB = await Curso.findOne({
      where: {
        nombre: curso
      }
    });

    await Materia.findOrCreate({
      where: {
        nombre: materia
      }
    })

    const materiaDB = await Materia.findOne({
      where: {
        nombre: materia
      }
    });

    newClase.setCurso(cursoDB);
    newClase.setMaterium(materiaDB); //No se porque es materium en vez de materia XD
    materiaDB.setCurso(cursoDB);

    res.send('Clase subida correctamente');

  } catch (error) {
    console.error(error);
    next(error);
  }
};

const putClase = async (req, res, next) =>{
  try {
    const { id } = req.params;
    const { nombre, url, profesores, recursos } = req.body;

//     const parseStringToArray = (str) => {
//       let array = str.split(", ")
//     return array;
//  }  

    const claseEncontrada = await Clase.findOne({
      where: { id: id },
    });

    claseEncontrada === null
    ? res.status(404).send('No se encontró una clase con ese id')
    : await Clase.update({
        nombre: nombre,
        url: url,
        profesores: profesores,
        recursos: recursos,
      },
      { where: { id: id}
      });
    res.send('Clase actualizada correctamente')
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteClase = async (req, res, next) =>{
  try {
    const { id } = req.params;
    console.log(id)
    await Clase.destroy({
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
  getClaseByCurse, getClaseById, postClase, putClase, deleteClase
}