const { executeQuery } = require('../helpers/utils');

const create = ({ name, surname, email, password, role_id }) => {
    return executeQuery('INSERT INTO users (name, surname, email, password, role_id) VALUES (?, ?, ?, ?, ?)', [name, surname, email, password, role_id]);
};

const update = (userId, { name, surname, email, password, role_id }) => {
    return executeQuery('UPDATE users SET name = ?, surname = ?, email = ?, password = ?, role_id = ? WHERE id = ?', [name, surname, email, password, role_id, userId]);
};

const getUserbyEmail = (email) =>{
    return executeQueryOne("SELECT email FROM users u WHERE u.email = ?", [email])
}

module.exports = {
    create, 
    update, 
    getUserbyEmail
}