var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const allUsers = require('../models/user.model')
const createToken = require('../helpers/utils').createToken


router.post('/login', async (req, res) => {
    const user = await allUsers.getUserByEmail(req.body.email)
    if(user == "") {
        return res.json({ error: "Error en email y/o contraseña" })
    }

    const same = bcrypt.compareSync(user[0].password, req.body.password)

    console.log(typeof user[0].password)
    console.log(typeof req.body.password)

    if (same) {
        res.json({ success: "Login correcto", token: createToken(user)})
    } else {
        res.json({ error: "Error en email y/o contraseña" })
    }
})

module.exports = router;