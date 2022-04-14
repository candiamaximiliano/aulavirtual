const { Router } = require('express');
const { getClases, getClaseById, postClase, putClase, deleteClase } = require('../controllers/clases.controller')

const router = Router();

// router.get('/', getClases);

router.get('/', getClaseById);

router.post('/Lomocompleto1', postClase);

router.post('/Lomocompleto1', postClase);

router.put('/', putClase);

router.delete('/', deleteClase);

module.exports = router;