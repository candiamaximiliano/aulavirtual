const { Router } = require('express');
const { getMaterias, getMateriaById, putMateria, deleteMateria } = require('../controllers/materias.controller')

const router = Router();

router.get('/materias', getMaterias);

router.get('/materias', getMateriaById);

router.put('/materias/:id', putMateria);

router.delete('/materias/:id', deleteMateria);

module.exports = router;