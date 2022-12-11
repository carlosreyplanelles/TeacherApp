const router = require('express').Router();

const Rating = require('../../models/rating.model');

// GET BY ID
router.get('/:ratingId', async (req, res) => {
    const { ratingId } = req.params;

    try {
        const rating = await Rating.getById(ratingId);
        res.json(rating);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// GET http://localhost:3000/api/ratings?teacherid=85&studentid=108
router.get('/', async (req, res) => {
    const { teacherid: teacherId, studentid: studentId } = req.query;

    try {
        const rating = await Rating.getByTeacherAndStudent(teacherId, studentId);
        res.json(rating);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// POST
router.post('/', async (req, res) => {
    try {
        const result = await Rating.create(req.body);
        const rating = await Rating.getById(result.insertId);
        res.json(rating);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// PUT
router.put('/:ratingId', async (req, res) => {
    const { ratingId } = req.params;

    try {
        await Rating.update(ratingId, req.body);
        const ratingUpdated = await Rating.getById(ratingId);
        res.status(200).json(ratingUpdated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;