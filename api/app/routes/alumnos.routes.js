const { Router } = require('express');
const { getAlumnos, getAlumnoById, postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumnos.controller');

const router = Router();

// router.get('/', getAlumnos);

router.get('/', getAlumnoById);

router.post('/', postAlumno);

router.put('/', putAlumno);

router.delete('/', deleteAlumno);

module.exports = router;