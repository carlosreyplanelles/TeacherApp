const { executeQuery, executeQueryOne } = require('../helpers/utils');

const getAll =() => {
    return executeQuery("SELECT * FROM branches")
}

module.exports = {
    getAll
}