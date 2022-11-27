const router = require('express').Router();
const { checkSchema } = require('express-validator');

const Student = require('../../models/student.model');
const Location = require('../../models/location.model');
const User = require('../../models/user.model');
const { newStudent, checkError, checkStudent } = require('../../helpers/validators');
const { checkToken, checkRole } = require('../../helpers/midelwares');

// GET ALL
router.get('/', async (req, res) => {
    try {
        const students = await Student.getAll();
        res.json(students);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// GET BY ID
router.get('/:studentId',
            // checkToken,
            // checkRole('student'),
            checkStudent, async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.getById(studentId);
        res.json(student);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// POST
router.post('/', checkSchema(newStudent), checkError, async (req, res) => {
    try {
        // Insert location and get location_id
        const newLocation = await Location.create(req.body);
        req.body.location_id = newLocation.insertId;

        // Insert user and get user_id
        const newUser = await User.create(req.body);
        req.body.user_id = newUser.insertId;

        // Insert user and get data
        const response = await Student.create(req.body);
        const student = await Student.getById(response.insertId);

        res.json(student);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// UPDATE
router.put('/:studentId', checkSchema(newStudent), checkError, checkStudent, async (req, res) => {
    const { studentId } = req.params;

    try {
        // Get student data
        const student = await Student.get(studentId);
        req.body.location_id = student.location_id;
        req.body.user_id = student.user_id;
        
        // Update locations table
        await Location.update(student.location_id, req.body)

        // Update users table
        await User.update(student.user_id, req.body)

        // Update students table
        await Student.update(student.id, req.body);
        const newStudent = await Student.getById(student.id);

        res.json(newStudent);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// DELETE
router.delete('/:studentId', checkStudent, async (req, res) => {
    const { studentId } = req.params;

    try {
        const result = await Student.deleteById(studentId);
        res.json(result);
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;