const { executeQuery } = require('../helpers/utils');

const getByStudent = (studentId) => {
    return executeQuery('SELECT c.id, u.name as teacher_name, u.surname as teacher_surname, c.teacher_id, b.title as branch, DATE_FORMAT(c.class_datetime,\'%d/%m/%Y %H:%i\') as class_datetime FROM classes as c JOIN teachers as t ON c.teacher_id = t.id JOIN students as s ON c.student_id = s.id JOIN branches as b ON t.branch_id = b.id JOIN users as u ON t.user_id = u.id WHERE s.id = ?;', [studentId]);
};

module.exports = {
    getByStudent
};