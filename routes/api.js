const express = require('express');
const router = express.Router();
const { getPersonalityInsight, getHomePage } = require('../controllers');

router.get('/', getHomePage);
router.get('/:handle', getPersonalityInsight);


module.exports = router;


