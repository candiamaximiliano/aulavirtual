const { Router } = require('express');
const { getCursos, getCursoById, postCurso, putCurso, deleteCurso } = require('../controllers/cursos.controller')

const router = Router();

router.get('/', getCursos);

router.get('/', getCursoById);

router.post('/', postCurso);

router.put('/', putCurso);

router.delete('/', deleteCurso);

module.exports = router;