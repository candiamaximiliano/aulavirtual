const { Router } = require('express');
const { postVideo, getVideos } = require('../controllers/clases.controller')

const router = Router();

router.get('/', getVideos);

router.post('/', postVideo);

module.exports = router;