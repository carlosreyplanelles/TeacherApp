var express = require('express');
var router = express.Router();

/* Using the admin.js file in the api folder. */
router.use('/admin', require('./api/admin.js'));

module.exports = router;