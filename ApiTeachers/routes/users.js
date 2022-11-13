var express = require('express');
var router = express.Router();

const { checkToken } = require('../helpers/midelwares')

const jwt = require('jsonwebtoken')

var allUsers = require('../models/user.model')

router.get('/', async (req, res) => {
    try {
        const users = await allUsers.getAll();
        res.json(users);
    } catch (err) {
        res.json({ error: err.message });
    }
});

/* GET ALL USERS. */

router.get('/', async (req, res) => {
    try {
        const users = await allUsers.getAll();
        res.json(users);
    } catch (err) {
        res.json({ error: err.message });
    }
});

/* POST SIGNIN. */

router.post('/signin', async (req, res) => {

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


/* POST USER. */

router.post('/login', checkToken, async (req, res) => {
    res.json(req.data)
})
    


module.exports = router;
