const router = require('express').Router();

const Class = require('../../models/class.model');

router.get('/:studentId', async (req, res) => {
    const { studentId } = req.params;
    
    try {

        const classInfo = await Class.getByStudent(studentId);       
        res.status(200).json(classInfo);
    } 
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;