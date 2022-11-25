const router = require('express').Router();

const { getTeacherClasses } = require('../../models/teacher.model');

router.get('/:teacherId', async (req, res) => {
    const { teacherId } = req.params;

    try {
        const classData = await getTeacherClasses(teacherId);

        if (classData) {
            res.status(200).json(classData);
        }
        else {
            res.status(400).json({ error: 'El profesor con Id ' + teacherId + ' no tiene clases en la agenda.'});
        }

       
    } 
    catch (error) {
        res.status(400).json({ error: "Error " + error.errno + ": " + error.message});
    }
});

module.exports = router;