
const { executeQuery, executeQueryOne } = require('../helpers/utils');

//sqlTeachersData para un profesor y luego consultar su rating avg
const sqlTeachersData = 'select u.id as user_id, u.name, u.surname, u.email, u.password,  DATE_FORMAT(u.creation_date,\'%d/%m/%Y %H:%i\') as creation_date, DATE_FORMAT(u.leaving_date,\'%d/%m/%Y   %H:%i\') as leaving_date, u.role_id, t.id as teacher_id, ' +
                        't.phone, t.branch_id, b.title as branch_title, b.description as branch_description, t.price_hour, t.experience, ' +
                        't.validated, t.location_id, l.address, l.latitude, l.longitude, l.city_id, c.name as city, c.province_id, p.name as province, t.avatar, t.subjects, t.start_class_hour, t.end_class_hour '+
                        'from users u, teachers t, branches b, locations l, cities c, provinces p ' +
                        'where (u.id=t.user_id) and (t.branch_id=b.id) and (t.location_id=l.id) and (l.city_id=c.id) and (c.province_id=p.id) and (u.role_id=2)';

//sqlAllTeachersData para todos                        
const sqlAllTeachersData = 'select u.id as user_id, u.name, u.surname, u.email, u.password, DATE_FORMAT(u.creation_date,\'%d/%m/%Y %H:%i\') as creation_date, DATE_FORMAT(u.leaving_date,\'%d/%m/%Y   %H:%i\') as leaving_date, u.role_id, t.id as teacher_id, ' +
                        't.phone, t.branch_id, b.title as branch_title, b.description as branch_description, t.price_hour, t.experience, ' +
                        't.validated, t.location_id, l.address, l.latitude, l.longitude, l.city_id, c.name as city, c.province_id, p.name as province, t.avatar, t.subjects, t.start_class_hour, t.end_class_hour, CAST(AVG(r.rating) AS DECIMAL(10,2)) as avg_rating ' +
                        'from users u, teachers t, branches b, locations l, cities c, provinces p, ratings r ' +                                                            
                        'where (u.id=t.user_id) and (t.branch_id=b.id) and (t.location_id=l.id) and (l.city_id=c.id) and (c.province_id=p.id) and (u.role_id=2) and (t.id=r.teacher_id) ' +
                        'group by teacher_id ' +
                        'UNION ' +
                        'select u.id as user_id, u.name, u.surname, u.email, u.password, DATE_FORMAT(u.creation_date,\'%d/%m/%Y %H:%i\') as creation_date, DATE_FORMAT(u.leaving_date,\'%d/%m/%Y   %H:%i\') as leaving_date, u.role_id, t.id as teacher_id, ' +
                        't.phone, t.branch_id, b.title as branch_title, b.description as branch_description, t.price_hour, t.experience, ' +
                        't.validated, t.location_id, l.address, l.latitude, l.longitude, l.city_id, c.name as city, c.province_id, p.name as province, t.avatar,t.subjects, t.start_class_hour, t.end_class_hour, 0 as avg_rating ' +
                        'from users u, teachers t, branches b, locations l, cities c, provinces p ' +
                        'where (u.id=t.user_id) and (t.branch_id=b.id) and (t.location_id=l.id) and (l.city_id=c.id) and (c.province_id=p.id) and (u.role_id=2) ' +
                        'and not exists (select distinct teacher_id from ratings where ratings.teacher_id = t.id) ';

const sqlTeacherClasses = 'select  c.id as class_id, c.student_id, u.name, u.surname, b.title as branch, DATE_FORMAT(c.creation_datetime,\'%d/%m/%Y %H:%i\') as booking_creation, c.title as subjects,DATE_FORMAT(c.start_date,\'%d/%m/%Y\') as start_date, c.start_hour as start_hour, c.end_hour as end_hour ' +
                          'from classes c, teachers t, students s, users u, branches b ' +
                          'where (c.cancel_date is null) and (c.teacher_id = t.id) and (c.student_id = s.id) and (t.branch_id = b.id) and (s.user_id = u.id) and (t.id=?) order by c.start_date';

const sqlTeacherHours = 'select start_class_hour, end_class_hour from teachers where id = ?';

/**
 * Get the teacher with the given id.
 * @param teacherid - The id of the teacher you want to get.
 * @returns An object with the teacher's information.
 */
/**TODO: 
 * Consultar a Laura por esta query, si es para obtener un profesor en base a su user_id que no es el id teacher
 * Si es así para cambiar por getTeacherByUserId  u.id = ?
*/
const getTeacherByUserId = (teacherid) => {
    return executeQueryOne(
        'SELECT * FROM teachers AS t '+
        'INNER JOIN users AS u ON t.user_id = u.id '+
        'INNER JOIN roles AS r ON r.id = u.role_id '+
        'WHERE r.title = "teacher" AND u.id = ?',
        [teacherid]
    );
}; 


const getAllTeachers = () => {    
    return executeQuery(sqlAllTeachersData + ' order by teacher_id');
}

/**TODO: Devolver los profesores paginados con filtros*/
const getTeachersByPage = (page, limit) => {   
   return executeQuery(sqlAllTeachersData + ' order by teacher_id' + ' limit ? offset ?', [limit, (page - 1) * limit]);
}

const getAllTeachersByFilters = (filter) => {    
    return executeQuery(sqlAllTeachersData + filter);
}

const getTeacherById = (teacherId) => {
    return executeQueryOne(sqlTeachersData + ' and (t.id=?)', [teacherId]);
}

const getTeacherByEmail = (email) => {
    return executeQueryOne(sqlTeachersData + ' and (u.email=?)', [email]);
}

const getBranchById = (branchId) => {
    return executeQueryOne('select * from branches where id=?', [branchId]);
}

const getIdByUserId = (userId) => {
    return executeQueryOne('SELECT id FROM teachers WHERE user_id = ?', [userId]);
};

const createTeacher = ({ phone, branch_id, price_hour, experience, validated, location_id, avatar, user_id ,subjects, start_class_hour, end_class_hour }) => {
    return executeQuery('insert into teachers (phone, branch_id, price_hour, experience, validated, location_id, avatar, user_id ,subjects, start_class_hour, end_class_hour) '+
                        'values  (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                       [phone, branch_id, price_hour, experience, validated, location_id, avatar, user_id ,subjects, start_class_hour, end_class_hour]);
}

const invalidateTeacher = (teacherId) => {    
    return executeQuery('update teachers set validated = 0 where id = ?', [teacherId]);
}

const validateTeacher = (teacherId) => {    
    return executeQuery('update teachers set validated = 1 where id = ?', [teacherId]);
}

const updateTeacher = (teacherId, { phone, branch_id, price_hour, experience, validated, location_id, avatar, user_id ,subjects, start_class_hour, end_class_hour }) => {
    return executeQuery('update teachers set phone = ?, branch_id = ?, price_hour = ?, experience =?, validated = ?, location_id = ?, avatar =?, user_id = ?, subjects = ?, start_class_hour = ?, end_class_hour = ? where id = ?', 
                       [phone, branch_id, price_hour, experience, validated, location_id, avatar, user_id ,subjects, start_class_hour, end_class_hour, teacherId]);
}

const getTeacherClasses = (teacherId) => {
    return executeQuery(sqlTeacherClasses, [teacherId]);    
}

const getTeacherHours = (teacherId) => {
    return executeQueryOne(sqlTeacherHours, [teacherId]);    
}

module.exports = {
    getAllTeachers, getTeachersByPage, getTeacherByUserId, getTeacherById, getAllTeachersByFilters, getTeacherByEmail, getBranchById, createTeacher, invalidateTeacher, 
    updateTeacher, getTeacherClasses, getIdByUserId, getTeacherHours, validateTeacher
}
