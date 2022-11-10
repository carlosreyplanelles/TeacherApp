<<<<<<< HEAD
var express = require('express');
var router = express.Router();

/* Using the admin.js file in the api folder. */
router.use('/admin', require('./api/admin.js'));
=======
const router = require('express').Router();

router.use('/students', require('./api/students'));
>>>>>>> e90ee12 (Acciones de getAll y getById)

router.use('/students', require('./api/students'));

module.exports = router;