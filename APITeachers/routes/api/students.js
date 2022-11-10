const router = require('express').Router();

const Student = require('../../models/student.model');
const { getErrorMessagebyCode } = require('../../models/error.model');

// GET ALL
router.get('/', async (req, res) => {
    try {
        const students = await Student.getAll();
        res.json(students);
    } catch (err) {
        res.json({ error: err.message }); // TODO: Coger el error
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

module.exports = router;