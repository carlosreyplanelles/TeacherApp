var express = require('express');
var router = express.Router();

/* Using the admin.js file in the api folder. */
router.use('/admin', require('./api/admin.js'));

/* Using the students.js file in the api folder. */
router.use('/students', require('./api/students'));

/* Using the teachers.js file in the api folder. */
router.use('/teachers', require('./api/teachers'));

module.exports = router;