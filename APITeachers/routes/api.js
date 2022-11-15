var express = require('express');
var router = express.Router();

/* Using the admin.js file in the api folder. */
router.use('/admin', require('./api/admin.js'));

router.use('/students', require('./api/students'));
router.use('/classes', require('./api/classes'));

module.exports = router;