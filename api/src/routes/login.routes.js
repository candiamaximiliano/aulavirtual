const { Router } = require('express');
const {msgLogin} = require('../controllers/login.controller');

const router = Router();

router.get('/login', msgLogin);

module.exports = router;