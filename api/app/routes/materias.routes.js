const { Router } = require('express');
const { getMaterias, getMateriaById, postMateria, putMateria, deleteMateria } = require('../controllers/materias.controller')

const router = Router();

router.get('/', getMaterias);

router.get('/', getMateriaById);

router.post('/', postMateria);

router.put('/', putMateria);

router.delete('/', deleteMateria);

module.exports = router;