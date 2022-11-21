const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const checkToken = (req, res, next) => {
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
        req.data = obj
    } catch (error) {
        console.log(error);
        return res.status(401)
            .json({ fatal: 'El token incluido no es válido' });
    }

    // Chack expiration date
    if (obj.expiration_date < dayjs().unix()) {
        return res.status(401)
            .json({ fatal: 'El token está caducado' });
    }

    next();
}

module.exports = {
    checkToken
}