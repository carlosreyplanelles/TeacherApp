const {executeQueryOne, executeQuery} = require('../helpers/utils');

const getErrorMessagebyCode = async (code) => {
    const error = await executeQueryOne('SELECT message FROM errors WHERE code = ?', [code])
    return error
} 

const getErrorMessagesByType = async (type) =>{
    const errors = await executeQuery('SELECT * FROM errors WHERE type =? ', [type])
    return errors
}

module.exports = {
    getErrorMessagebyCode,
    getErrorMessagesByType
}