const router = require('express').Router();

const Class = require('../../models/class.model');

router.get('/:studentId', async (req, res) => {
    const { studentId } = req.params;

    try {
        const classInfo = await Class.getByStudent(studentId);
        res.json(classInfo);
    } catch (err) {
        res.json({ error: err.message });
    }
});

module.exports = router;