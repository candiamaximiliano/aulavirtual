const { Materia } = require('../db');

const getMaterias = async (req, res) => {
  try {
    const materias = Materia.findAll();
    res.send(materias);    
  } catch (error) {
    next(error);
  }
};

const getMateriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const materiaById = Materia.findByPk(id);
    res.send(materiaById);
  } catch (error) {
    next(error);
  }
};

const postMateria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const materiaCreada = await Materia.create({
      nombre: nombre,
    });
    res.send('Nueva materia creada correctamente')
  } catch (error) {
    next(error);
  }
};

const putMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const materiaUpdated = await Materia.update({
      nombre: nombre,
    }, {
      where: {
        id : id,
      }
    })
    res.send('Materia actualizada correctamente')
  } catch (error) {
    next(error);
  }
};

const deleteMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const materiaDestroyed = Materia.destroy({
      where: {
        id: id,
      }
    })
    res.send('Materia eliminada correctamente!')
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMaterias, getMateriaById, postMateria, putMateria, deleteMateria
}