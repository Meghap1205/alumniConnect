const express = require('express');
const router = express.Router();
const { getAllAlumni, getAlumniByCompany } = require('../controllers/officeBearerController');

router.get('/', getAllAlumni);
router.get('/:companyname', getAlumniByCompany);

module.exports = router;
