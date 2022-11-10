const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(
        'SELECT s.id, s.active, s.phone, s.avatar, u.creation_date, u.name, u.surname, u.email, u.password, l.latitude, l.longitude, l.address, c.name as city, p.name as province, r.title as role FROM students as s JOIN users as u ON s.user_id = u.id JOIN locations as l ON s.location_id = l.id JOIN cities as c ON l.city_id = c.id JOIN provinces as p ON c.province_id = p.id JOIN roles as r ON u.role_id = r.id');
};

const getById = (studentId) => {
    return executeQueryOne('SELECT s.id, s.active, s.phone, s.avatar, u.creation_date, u.name, u.surname, u.email, u.password, l.latitude, l.longitude, l.address, c.name as city, p.name as province, r.title as role FROM students as s JOIN users as u ON s.user_id = u.id JOIN locations as l ON s.location_id = l.id JOIN cities as c ON l.city_id = c.id JOIN provinces as p ON c.province_id = p.id JOIN roles as r ON u.role_id = r.id WHERE s.id = ?', [studentId]);
};

const create = () => {
    return executeQuery('');
};

const update = (studentId) => {
    return executeQuery('', [studentId]);
};

const deleteById = (studentId) => {
    return executeQuery('', [studentId]);
};

module.exports = {
    getAll, getById, create, update, deleteById
};