var express = require('express');
var dayjs = require('dayjs');
var router = express.Router();

const { checkToken } = require('../helpers/midelwares')

const jwt = require('jsonwebtoken')

var allUsers = require('../models/user.model')

/* GET ALL USERS. */

router.get('/', async (req, res) => {
    try {
        const users = await allUsers.getAll();
        res.json(users);
    } catch (err) {
        res.json({ error: err.message });
    }
});

/* GET USER BY EMAIL. */

router.get('/signin', async (req, res) => {


    const { email, password } = req.body

    try {
        const users = await allUsers.getUserByEmail(email, password);
        let user = users[0]
        const token = jwt.sign(user, process.env.SECRET_KEY)
        res.json({token})
    } catch (err) {
        res.json("Usuario o clave incorrecta")
    }
});

router.post('/test', checkToken, (req, res) => {
    res.json(req.data)
})
    


module.exports = router;
