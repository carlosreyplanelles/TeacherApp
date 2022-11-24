var router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Student = require('../models/student.model');
const Teacher = require('../models/teacher.model');
const { getUserByEmail } = require('../models/user.model');
const { createToken } = require('../helpers/utils');


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Checks if email exists
    const user = await getUserByEmail(email);
    if(!user) {
        return res.json({ error: "Error en email y/o contraseña" });
    }

    // Checks if the passwords are the same
    //const same = bcrypt.compareSync(password, user.password)
    const same = (password === user.password);
    if (!same) {
        return res.json({ error: "Error en email y/o contraseña" });
    }
    
    // Login success
    let id;
    res_student = await Student.getIdByUserId(user.id);
    res_teacher = await Teacher.getIdByUserId(user.id);
    switch (user.role_id) {
        case 1:
            id = user.id;
            break;
        case 2:
            id = res_teacher.id;
            break;
        case 3:
            id = res_student.id;
            break;
    };


    res.json({
        success: true,
        // user_id: id,
        // user_role: user.role_id,
        token: createToken(id, user.role_id)
    });
})


// TODO: REGISTER

router.get('/:email',async  (req, res) =>{
  try{
      const user = await getUserbyEmail(req.params.email);
      res.json(user);
  } catch (error) {
      res.json({ fatal: error.message });
  }
})

module.exports = router;

