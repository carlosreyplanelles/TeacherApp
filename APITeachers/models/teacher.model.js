
const { executeQuery, executeQueryOne } = require('../helpers/utils');

/**
 * Get the teacher with the given id.
 * @param teacherid - The id of the teacher you want to get.
 * @returns An object with the teacher's information.
 */
/**TODO: 
 * Consultar a Laura por esta query, si es para obtener un profesor en base a su user_id que no es el id teacher
 * Si es así para cambiar por getTeacherByUserId  u.id = ?
*/
const getTeacherById = (teacherid) => {
    return executeQueryOne(
        'SELECT * FROM teachers AS t '+
        'INNER JOIN users AS u ON t.user_id = u.id '+
        'INNER JOIN roles AS r ON r.id = u.role_id '+
        'WHERE r.title = "teacher" AND u.id = ?',
        [teacherid]
    );
}; 

const getAllTeachers = () => {
    //return executeQuery('select * from teachers');
    return executeQuery('select u.id as user_id, u.name,u.surname,u.email,u.creation_date,t.id as teacher_id,' +
                        't.phone, t.branch_id,b.title as branch_title,t.price_hour,t.experience,t.validated,t.location_id,' +
                        'l.address,c.name as city, p.name as province, l.latitude, l.longitude,t.avatar,t.subjects '+
                        'from users u, teachers t, branches b, locations l, cities c, provinces p ' +
                        'where (u.id=t.user_id) and (t.branch_id=b.id) and (t.location_id=l.id) and (l.city_id=c.id) and (c.province_id=p.id) and (u.role_id=2)');

}

const getTeachersByPage = (page, limit) => {
    return executeQuery('select * from teachers limit ? offset ?', [limit, (page - 1) * limit]);
}

const getById = (teacherId) => {
    return executeQueryOne('select * from teachers where id = ?', [teacherId]);
}

const getByEmail = (email) => {
    return executeQueryOne('select u.name, u.surname, u.email, t.id as idTeacher, t.phone, t.subjects, t.experience, t.avatar,t.location_id '+
                           'from users u, teachers t ' +
                           'where (u.id=t.user_id) and (u.role_id=2) and (u.email=?)', [email]);
}

const create = ({ phone, branch_id, price_hour, experience, validated, location_id, avatar, user_id ,subjects }) => {
    return executeQuery('insert into teachers (phone, branch_id, price_hour, experience, validated, location_id, avatar, user_id ,subjects) '+
                        'values  (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                       [phone, branch_id, price_hour, experience, validated, location_id, avatar, user_id ,subjects]);
}

const deleteById = (teacherId) => {
    return executeQuery('delete from teachers where id = ?', [teacherId]);
}

const update = (teacherId, { phone, branch_id, price_hour, experience, validated, location_id, avatar, user_id ,subjects }) => {
    return executeQuery('update teachers set phone = ?, branch_id = ?, price_hour = ?, experience =?, validated = ?, location_id = ?, avatar =?, user_id = ?, subjects = ? where id = ?', 
                       [phone, branch_id, price_hour, experience, validated, location_id, avatar, user_id ,subjects, teacherId]);
}

module.exports = {
    getAllTeachers, getTeachersByPage, getTeacherById, getById, getByEmail, create, deleteById, update
}
