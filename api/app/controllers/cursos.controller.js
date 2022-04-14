const { Curso } = require('../config/db.config');

const getCursos = async (req, res) => {
  try {
    const cursos = Curso.findAll();
    res.send(cursos);
  } catch (error) {
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

const postCurso = async (req, res) => {
  try {
    const { nombre } = req.body;
    const cursoCreado = Curso.create({
      nombre,
    })
    res.send('Curso creado exitosamente')
  } catch (error) {
    next(error);
  }
};

const postCurso_Materia_Clase = async (req, res) => {
  try {
    const { cursoId, materiaId, claseId } = req.params
    const curso = await Curso.findByPk(cursoId);

  } catch (error) {
    next(error);
  }
};

const putCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    Curso.update({
      nombre: nombre,
    }, {
      where: {
        id: id,      }
    })
    res.send('Curso actualizado correctamente')
  } catch (error) {
    next(error);
  }
};

const deleteCurso = async (req, res) => {
  try {
    const {id} = req.params;
    await Curso.destroy({
      where:{
        id: id,
      }
    })
    res.send('Curso borrado exitosamente!')
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCursos, getCursoById, postCurso, putCurso, deleteCurso
}