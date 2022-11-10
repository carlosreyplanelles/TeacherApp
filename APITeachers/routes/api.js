const router = require('express').Router();

router.use('/students', require('./api/students'));

module.exports = router;