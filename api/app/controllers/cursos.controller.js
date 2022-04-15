const { Curso, Materia } = require('../config/db.config');

const getCursos = async (req, res, next) => {
  try {
    const totalCursos = await Curso.findAll({
      attributes: ['id', 'nombre'],
      include: [{
        model: Materia,
        attributes: ['id', 'nombre']
      }],
    });
    totalCursos.length?
      res.status(200).send(totalCursos):
      res.status(404).send('No existen cursos agregados');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getCursoById = async (req, res) => {
  try {
    const {id} = req.params;
    const cursoById = Curso.findByPk(id);
    res.send(cursoById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCursos, getCursoById
}