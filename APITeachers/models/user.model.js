
const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getUserById = (userId) => {
    return executeQueryOne('select * from users where id = ?', [userId]);
};

const getRoleById = (roleId) => {
    return executeQueryOne('select * from roles where id = ?', [roleId]);
};

const createUser = ({ name, surname, email, password, role_id }) => {
    return executeQuery('INSERT INTO users (name, surname, email, password, role_id) VALUES (?, ?, ?, ?, ?)', [name, surname, email, password, role_id]);
};

const updateUser = (userId, { name, surname, email, password, role_id }) => {
    return executeQuery('UPDATE users SET name = ?, surname = ?, email = ?, password = ?, role_id = ? WHERE id = ?', [name, surname, email, password, role_id, userId]);
};

const cancelUser = (userId, leaving_date) => {
    return executeQuery('UPDATE users SET leaving_date = ? WHERE id = ?', [leaving_date, userId]);
};

const getAll = () => {
    return executeQuery(
        'SELECT * FROM users AS u INNER JOIN roles AS r ON r.id = u.role_id',
        []
    );
};

const getAllUsers = () => {
    return executeQuery('SELECT * FROM users')
}

const getById = (userid) => {
    return executeQueryOne(
        'SELECT u.id AS user_id,creation_date, leaving_date, name, surname, email, password, role_id, title, description FROM users AS u INNER JOIN roles AS r ON r.id = u.role_id WHERE u.id = ?',
        [userid]
    );
};

const getByEmail = (useremail) => {
    return executeQueryOne(
        'SELECT u.*, r.title, r.description FROM users AS u INNER JOIN roles AS r ON r.id = u.role_id WHERE u.email = ?',
        [useremail]
    );
};

const create = ({ name, surname, email, password, role_id }) => {
    return executeQuery(
        'INSERT INTO users (name, surname, email, password, role_id) VALUES (?, ?, ?, ?, ?)',
        [name, surname, email, password, role_id]
    );
};

const update = (userId, { name, surname, email, password, role_id }) => {
    return executeQuery(
        'UPDATE users SET name = ?, surname = ?, email = ?, password = ?, role_id = ? WHERE id = ?',
        [name, surname, email, password, role_id, userId]
    );
};

const getUserByEmail = (email) => {
    return executeQueryOne('SELECT * FROM users where email = ?', [email]);
};

const updateLocation = (userid, { role, lat, lon }) => {
    return executeQuery(
        'UPDATE users AS u INNER JOIN ' + role + 's AS r ON r.user_id = u.id INNER JOIN locations AS l ON l.id = r.location_id SET latitude = ?, longitude = ? WHERE u.id = ?',
        [lat, lon, userid]
    );
}

module.exports = {
    create, update, getUserByEmail, getAll, getById, getByEmail, getUserById, createUser, updateUser, getRoleById, cancelUser, getAllUsers, updateLocation
};
