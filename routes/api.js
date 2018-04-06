const express = require('express');
const router = express.Router();
const { getPersonalityInsight } = require('../controllers');

router.get('/');
router.get('/:handle', getPersonalityInsight);


module.exports = router;


