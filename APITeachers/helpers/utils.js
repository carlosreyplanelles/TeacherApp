const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const executeQuery = (sql, params = []) => {    
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

const executeQueryOne = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) return resolve(null);
            resolve(result[0]);
        });
    });
}

const createToken = (user) => {
    const obj = {
        user_id: user.id,
        user_role: user.role,
        expiration_date: dayjs().add(5, 'minutes').unix()
    }

    return jwt.sign(obj, process.env.SECRET_KEY);
}

module.exports = { executeQuery, executeQueryOne, createToken };