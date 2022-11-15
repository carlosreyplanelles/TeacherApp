var express = require('express');
var router = express.Router();

/* Using the admin.js file in the api folder. */
router.use('/admin', require('./api/admin.js'));

router.use('/students', require('./api/students'));
router.use('/student-classes', require('./api/student-classes'));

module.exports = router;