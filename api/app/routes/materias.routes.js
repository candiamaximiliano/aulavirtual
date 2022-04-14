const { Router } = require('express');
const { getMaterias, getMateriaById, postMateria, putMateria, deleteMateria } = require('../controllers/materias.controller')

const router = Router();

router.get('/materias/', getMaterias);

router.get('/materias/', getMateriaById);

router.post('/materias/', postMateria);

router.put('/materias/', putMateria);

router.delete('/materias/', deleteMateria);

module.exports = router;