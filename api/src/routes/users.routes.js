const { Router } = require('express');
const { postUser, getUser } = require('../controllers/users.controller');

const router = Router();

router.get('/', getUser);

router.post('/', postUser);

module.exports = router;