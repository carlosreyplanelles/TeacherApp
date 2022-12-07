const { executeQuery, executeQueryOne } = require('../helpers/utils');

/**TODO: Probar este método porque cambia la fecha class_datetime de la tabla*/
const getByStudent = (studentId) => {
    return executeQuery('SELECT c.id, u.name as teacher_name, u.surname as teacher_surname, c.teacher_id, b.title as branch, ' +
                        'DATE_FORMAT(c.creation_datetime,\'%d/%m/%Y %H:%i\') as booking_creation, DATE_FORMAT(c.start_date,\'%d/%m/%Y\') as start_date, c.start_hour as start_hour, c.end_hour as end_hour ' +
                        'FROM classes as c JOIN teachers as t ON c.teacher_id = t.id ' +
                        'JOIN students as s ON c.student_id = s.id JOIN branches as b ON t.branch_id = b.id ' +
                        'JOIN users as u ON t.user_id = u.id WHERE s.id = ?;', [studentId]);
};

const createBooking = ({ start_hour, end_hour, start_date, teacherId, studentId }) => {
    return executeQuery('insert into classes (start_hour, end_hour, start_date, teacher_id, student_id) '+
                        'values  (?, ?, ?, ?, ?)',
                       [start_hour, end_hour, start_date, teacherId, studentId]);
}

const  getClassBooked = (classId) => {
    return executeQueryOne('select id, DATE_FORMAT(creation_datetime,\'%d/%m/%Y %H:%i\') as creation_datetime, '+
                           'teacher_id, student_id, title, start_hour, end_hour, ' +
                           'DATE_FORMAT(start_date,\'%d/%m/%Y\') as start_date, DATE_FORMAT(cancel_date,\'%d/%m/%Y %H:%i\') as cancel_date '+
                           'from classes where id = ?', [classId]);
};

const  getActiveClassesBooked = (teacherId, date) => {
    return executeQuery('select id, DATE_FORMAT(creation_datetime,\'%d/%m/%Y %H:%i\') as creation_datetime, '+
                           'teacher_id, student_id, title, start_hour, end_hour, ' +
                           'DATE_FORMAT(start_date,\'%d/%m/%Y\') as start_date, DATE_FORMAT(cancel_date,\'%d/%m/%Y %H:%i\') as cancel_date '+
                           'from classes where (cancel_date is null) and (teacher_id = ?) and (start_date = ?)', [teacherId, date]);
};


module.exports = { getByStudent, createBooking, getClassBooked, getActiveClassesBooked };