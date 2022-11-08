const {executeQueryOne} = require('../helpers/utils');

const getErrorMessagebyCode = async (code) => {
    const error = await executeQueryOne('SELECT message FROM errors WHERE code = ?', [code])
    return error
} 

module.exports = {
    getErrorMessagebyCode
}