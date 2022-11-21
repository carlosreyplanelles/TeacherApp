var express = require('express');
var router = express.Router();

router.use('/users', require('./api/users.js'));

router.use('/admin', require('./api/admin.js'));

router.use('/students', require('./api/students'));

module.exports = router;