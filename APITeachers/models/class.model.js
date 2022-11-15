const { executeQueryOne } = require('../helpers/utils');

const getByStudent = (studentId) => {
    return executeQueryOne('SELECT c.id, u.name as teacher_name, u.surname as teacher_surname, b.title as materia, c.class_datetime FROM classes as c JOIN teachers as t ON c.teacher_id = t.id JOIN students as s ON c.student_id = s.id JOIN branches as b ON t.branch_id = b.id JOIN users as u ON t.user_id = u.id WHERE s.id = ?;', [studentId]);
};

module.exports = {
    getByStudent
};