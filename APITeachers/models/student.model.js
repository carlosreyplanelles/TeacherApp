const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(
        'SELECT s.id, s.active, s.phone, s.avatar, u.creation_date, u.name, u.surname, u.email, u.password, l.latitude, l.longitude, l.address, c.name as city, p.name as province, r.title as role FROM students as s JOIN users as u ON s.user_id = u.id JOIN locations as l ON s.location_id = l.id JOIN cities as c ON l.city_id = c.id JOIN provinces as p ON c.province_id = p.id JOIN roles as r ON u.role_id = r.id');
};

const getById = (studentId) => {
    return executeQueryOne('SELECT s.id, s.active, s.phone, s.avatar, u.creation_date, u.name, u.surname, u.email, u.password, l.latitude, l.longitude, l.address, c.name as city, c.id as city_id, c.province_id, p.name as province, r.title as role FROM students as s JOIN users as u ON s.user_id = u.id JOIN locations as l ON s.location_id = l.id JOIN cities as c ON l.city_id = c.id JOIN provinces as p ON c.province_id = p.id JOIN roles as r ON u.role_id = r.id WHERE s.id = ?', [studentId]);
};

const get = (studentId) => {
    return executeQueryOne('SELECT * FROM students WHERE id = ?', [studentId]);
};

const create = ({ phone, avatar, user_id, location_id }) => {
    return executeQuery('INSERT INTO students (phone, avatar, user_id, location_id) VALUES (?, ?, ?, ?)', [phone, avatar, user_id, location_id]);
};

const update = (studentId, { active, phone, avatar, user_id, location_id }) => {
    return executeQuery('UPDATE students SET active = ?, phone = ?, avatar = ?, user_id = ?, location_id = ? WHERE id = ?', [active, phone, avatar, user_id, location_id, studentId]);
};

const deleteById = (studentId) => {
    return executeQuery('DELETE s, u, l FROM students as s INNER JOIN users as u ON s.user_id = u.id INNER JOIN locations as l ON s.location_id = l.id WHERE s.id = ?', [studentId]);
};

module.exports = {
    getAll, getById, get, create, update, deleteById
};