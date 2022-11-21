const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll = () => {
    return executeQuery(
        'SELECT * FROM users AS u INNER JOIN roles AS r ON r.id = u.role_id',
        []
    );
};

const getById = (userid) => {
    return executeQueryOne(
        'SELECT * FROM users AS u INNER JOIN roles AS r ON r.id = u.role_id WHERE u.id = ?',
        [userid]
    );
};

const getByEmail = (useremail) => {
    return executeQueryOne(
        'SELECT * FROM users AS u INNER JOIN roles AS r ON r.id = u.role_id WHERE u.email = ?',
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
    return executeQuery('SELECT * FROM users where email = ?', [email])
}

module.exports = {
    create, update, getAll, getUserByEmail
}


    getAll, getById, getByEmail, create, update
};