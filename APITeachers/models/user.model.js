const { executeQuery } = require('../helpers/utils');

const create = ({ name, surname, email, password, role_id }) => {
    return executeQuery('INSERT INTO users (name, surname, email, password, role_id) VALUES (?, ?, ?, ?, ?)', [name, surname, email, password, role_id]);
};

module.exports = {
    create
}