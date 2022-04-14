const { Router } = require('express');
const { getClases, getClaseById, postClase, putClase, deleteClase } = require('../controllers/clases.controller')

const router = Router();

// router.get('/', getClases);

router.get('/clases/', getClaseById);

router.post('/clases/', postClase);

router.post('/clases/', postClase);

router.put('/clases/', putClase);

router.delete('/', deleteClase);

module.exports = router;