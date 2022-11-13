const { executeQuery, executeQueryOne } = require('../helpers/utils');

/**
 * Get the teacher with the given id.
 * @param teacherid - The id of the teacher you want to get.
 * @returns An object with the teacher's information.
 */
const getTeacherById = (teacherid) => {
    return executeQueryOne(
        'SELECT * FROM teachers AS t INNER JOIN users AS u ON t.user_id = u.id INNER JOIN roles AS r ON r.id = u.role_id WHERE r.title = "teacher" AND u.id = ?',
        [teacherid]
    );
};

module.exports = {
    getTeacherById
};