<<<<<<< HEAD
var express = require('express');
var router = express.Router();

/* Using the admin.js file in the api folder. */
router.use('/admin', require('./api/admin.js'));
<<<<<<< HEAD:APITeachers/routes/api.js
=======
const router = require('express').Router();

=======
>>>>>>> 4af7c4d (Express Login):ApiTeachers/routes/api.js
router.use('/students', require('./api/students'));
>>>>>>> e90ee12 (Acciones de getAll y getById)

router.use('/students', require('./api/students'));

module.exports = router;