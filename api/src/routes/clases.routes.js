const { Router } = require('express');
const { msgClases } = require('../controllers/clases.controller')

const router = Router();

router.get('/clases', msgClases);

module.exports = router;