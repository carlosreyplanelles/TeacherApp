const router = require('express').Router();

const { create, update, getAll, getById, getByEmail } = require('../../models/user.model');

const { checkSchema } = require("express-validator");
const { newUser, checkUser, checkError, checkEmail } = require("../../helpers/validators");

/* GET ALL USERS*/
router.get("/", async (req, res) => {
    try {
        const arrUsers = await getAll();
        if (arrUsers.length === 0) {
            res.json({ Message: 'There is no admin users', arrUsers });
        } else {
            res.json(arrUsers);
        }
    } catch (error) {
        res.json({ Error: error.message });
    }
});

/* GET USER BY ID */
router.get("/user=:userid", checkUser, async (req, res) => {
    const { userid } = req.params;
    try {
        const user = await getById(userid);
        res.json(user);
    } catch (error) {
        res.json({ Error: error.message });
    }
});

/* GET USER BY EMAIL */
router.get("/email=:useremail", checkEmail, async (req, res) => {
    const { useremail } = req.params;
    try {
        const user = await getByEmail(useremail);
        res.json(user);
    } catch (error) {
        res.json({ Error: error.message });
    }
});

/*  CREATE NEW USER */
router.post("/new", checkSchema(newUser), checkError, async (req, res) => {
    const newuser = req.body;
    try {
        const result = await create(newuser);
        const user = await getById(result.insertId);
        res.json(user);
    } catch (error) {
        res.json({ Error: error.message });
    }
});

/*  UPDATE USER BY ID */
router.put("/update/user=:userid", checkUser, async (req, res) => {
    const { userid } = req.params;
    const newData = req.body;
    try {
        const result = await update(userid, newData);
        const user = await getByID(userid);
        res.json(user);
    } catch (error) {
        res.json({ Error: error.message });
    }
});

/*  DELETE USER BY ID */
// router.delete("/delete/user=:userid", checkUser, async (req, res) => {
//     const { userid } = req.params;
//     try {
//         const result = await delete(userid);
//         const arrUsers = await getAll();
//         res.json(arrUsers);
//     } catch (error) {
//         res.json({ Error: error.message });
//     }
// });

module.exports = router;