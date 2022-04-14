const { Router } = require('express');
const { getCursos, getCursoById, postCurso, putCurso, deleteCurso } = require('../controllers/cursos.controller')

const router = Router();

router.get('/cursos/', getCursos);

router.get('/cursos/', getCursoById);

router.post('/cursos/', postCurso);

router.put('/cursos/', putCurso);

router.delete('/cursos/', deleteCurso);

module.exports = router;