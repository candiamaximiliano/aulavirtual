const { Router } = require('express');
const {msgHome} = require('../controllers/home.controller');

const router = Router();

router.get('/', msgHome );

module.exports = router;