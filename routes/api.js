const express = require('express');
const router = express.Router();
const { getPersonalityInsight, getHomePage, getPersonalityInsightButton } = require('../controllers');


router.get('/', getHomePage);
router.get('/person', getPersonalityInsightButton);
router.get('/:handle', getPersonalityInsight);


module.exports = router;


