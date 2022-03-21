const { Router } = require('express');
const {msgHome} = require('../controllers/home.controller');

const router = Router();

router.get('/home', msgHome );

module.exports = router;