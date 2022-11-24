const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getById = (ratingId) => {
    return executeQueryOne('SELECT * FROM ratings WHERE id = ?', [ratingId]);
};

const getByTeacherAndStudent = (teacher_id, student_id) => {
    return executeQueryOne('SELECT * FROM ratings WHERE teacher_id = ? AND student_id = ?', [teacher_id, student_id]);
};

const create = ({ rating, comment, teacher_id, student_id }) => {
    return executeQuery('INSERT INTO ratings (rating, comment, teacher_id, student_id) VALUES (?, ?, ?, ?)', [rating, comment, teacher_id, student_id]);
};

const update = (ratingId, { rating, comment, teacher_id, student_id }) => {
    return executeQuery('UPDATE ratings SET rating = ?, comment = ?, teacher_id = ?, student_id = ? WHERE id = ?', [rating, comment, teacher_id, student_id, ratingId]);
};

const getAverageRatingByTeacher = (teacher_id) => {
    return executeQueryOne('select CAST(AVG(rating) AS DECIMAL(10,2))  as avg_rating FROM ratings WHERE teacher_id = ?', [teacher_id]);
};

module.exports = {
    getById, getByTeacherAndStudent, create, update, getAverageRatingByTeacher
};