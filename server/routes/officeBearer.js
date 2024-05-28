const express = require('express');
const router = express.Router();
const { getAllAlumni } = require('../controllers/officeBearerController');

router.get('/', getAllAlumni);

module.exports = router;
