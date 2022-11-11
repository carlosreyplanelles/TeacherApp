const router = require('express').Router();

const Student = require('../../models/student.model');
const Location = require('../../models/location.model');
const User = require('../../models/user.model');

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
router.get('/:studentId', async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.getById(studentId);
        res.json(student);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// POST
router.post('/', async (req, res) => {
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

module.exports = router;