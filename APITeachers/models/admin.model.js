const { executeQuery, executeQueryOne } = require('../helpers/utils');

/**
 * It returns all the users with the role of admin
 * @returns An array of objects.
 */
const getAllAdmin = () => {
    return executeQuery(
        'SELECT * FROM users AS u INNER JOIN roles AS r ON r.id = u.role_id WHERE r.title = "admin"',
        []
    );
};

/**
 * Get the admin user by id.
 * @param adminid - The id of the admin to get.
 * @returns An object with the admin's information.
 */
const getAdminById = (adminid) => {
    return executeQueryOne(
        'SELECT * FROM users AS u INNER JOIN roles AS r ON r.id = u.role_id WHERE r.title = "admin" AND u.id = ?',
        [adminid]
    );
};

/**
 * It creates a new admin user in the database
 * @returns The result of the query.
 */
const createAdmin = ({ name, surname, email, password, role_id }) => {
    return executeQuery(
        'INSERT INTO users (name, surname, email, password, role_id) VALUES (?,?,?,?,?)',
        [name, surname, email, password, role_id]
    );
};

/**
 * It updates the admin with the given id with the given data
 * @param adminid - The id of the admin you want to update
 */
const updateAdminById = (adminid, { name, surname, email, password, role_id }) => {
    return executeQuery('UPDATE users SET name = ?, surname = ?, email = ?, password = ?, role_id = ? WHERE id = ?',
        [name, surname, email, password, role_id, adminid]

    );
}

/**
 * It updates the teacher's validated status in the database
 * @param teacherid - the id of the teacher to update
 * @returns The result of the query.
 */
const validateTeacherById = (teacherid, { validated }) => {
    return executeQuery('UPDATE teachers SET validated = ? WHERE user_id = ?',
        [validated, teacherid]
    );
}

/**
 * It deletes an admin user from the database by their id
 * @param adminid - The id of the admin to delete.
 * @returns The result of the query.
 */
const deleteAdminById = (adminid) => {
    return executeQuery(
        'DELETE u FROM users AS u INNER JOIN roles AS r ON r.id = u.role_id WHERE r.title = "admin" AND u.id = ?',
        [adminid]
    );
};

/**
 * It deletes all users with the role of admin
 * @returns The result of the query.
 */
const deleteAllAdmin = () => {
    return executeQuery(
        'DELETE u FROM users AS u INNER JOIN roles AS r ON r.id = u.role_id WHERE r.title = "admin"',
        []
    );
};

module.exports = {
    getAllAdmin, getAdminById, createAdmin, updateAdminById, validateTeacherById, deleteAdminById, deleteAllAdmin
};