var express = require('express');
var router = express.Router();
let { getUserByEmail } = require('../models/user.model')

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

    if (same) {
        res.json({ success: "Login correcto", token: createToken(user)})
    } else {
        res.json({ error: "Error en email y/o contraseña" })
    }
})


//¿Registro?

router.post('/login', async (req, res) => {
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

router.get('/:email',async  (req, res) =>{
  try{
      const user = await getUserByEmail(req.params.email);
      res.json(user);
  } catch (error) {
      res.json({ fatal: error.message });
  }
})

module.exports = router;

