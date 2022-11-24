const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const User = require('../models/user.model');

const checkToken = async (req, res, next) => {
    // Check included token
    if (!req.headers['authorization']) {
        return res.status(401)
            .json({ fatal: 'Debes incluir el token de autenticación' });
    }

    const { authorization: token } = req.headers;

    // Check valid token
    let obj;
    try {
        obj = jwt.verify(token, process.env.SECRET_KEY);
        req.data = obj;
    } catch (error) {
        console.log(error);
        return res.status(401)
            .json({ fatal: 'El token incluido no es válido' });
    }

    // Check expiration date
    if (obj.expiration_date < dayjs().unix()) {
        return res.status(401)
            .json({ fatal: 'El token está caducado' });
    }

    // Add user info to the request
    req.user = await User.getById(req.data.user_id);

    next();
}

const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.title !== role) {
            return res.status(401).json({ fatal: `Restringido el acceso. Solo usuarios con role: ${role}` });
        }

        next();
    };
};

module.exports = {
    checkToken, checkRole
}