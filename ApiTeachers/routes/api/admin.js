const router = require('express').Router();

const { getAllAdmin, getAdminById, createAdmin, updateAdminById, validateTeacherById, deleteAdminById, deleteAllAdmin } = require("../../models/admin.model");

const { checkSchema } = require("express-validator");
const { newAdmin, updateAdmin, checkError, checkAdmin, checkTeacher } = require("../../helpers/validators");
const { getTeacherById } = require('../../models/teacher.model');

/* GET ALL ADMINS*/
router.get("/", async (req, res) => {
    try {
        /* Getting all the admins from the database. */
        const arrAdmin = await getAllAdmin();
        /* Sending the response to the client. */
        if (arrAdmin.length === 0) {
            res.json({ Message: 'There is no admin users', arrAdmin });
        } else {
            res.json(arrAdmin);
        }
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/* GET ADMIN BY ID */
router.get("/admin=:adminid", checkAdmin, async (req, res) => {
    /* Destructuring the adminid from the req.params. */
    const { adminid } = req.params;
    try {
        /* Getting the admin by the id. */
        const admin = await getAdminById(adminid);
        /* Sending the response to the client. */
        res.json(admin);
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/*  CREATE NEW ADMIN */
router.post("/new", checkSchema(newAdmin), checkError, async (req, res) => {
    const newadmin = req.body;
    try {
        /* Creating a new admin. */
        const result = await createAdmin(newadmin);
        const admin = await getAdminById(result.insertId);
        /* Sending the response to the client. */
        res.json(admin);
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/*  UPDATE ADMIN BY ID */
router.put("/update/admin=:adminid", checkSchema(updateAdmin), checkError, checkAdmin, async (req, res) => {
    const { adminid } = req.params;
    const newData = req.body;
    try {
        /* Updating the admin by the id. */
        const result = await updateAdminById(adminid, newData);
        const admin = await getAdminById(adminid);
        /* Sending the response to the client. */
        res.json(admin);
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/*  UPDATE TEACHER BY ID: Active/Inactive */
router.put("/validate/teacher=:teacherid", checkTeacher, async (req, res) => {
    const { teacherid } = req.params;
    const newData = req.body;
    try {
        /* Updating the teacher by the id. */
        const result = await validateTeacherById(teacherid, newData);
        const teacher = await getTeacherById(teacherid);
        res.json({ Message: 'The teacher status has been changed', teacher });
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/*  DELETE ADMIN BY ID */
router.delete("/delete/admin=:adminid", checkAdmin, async (req, res) => {
    const { adminid } = req.params;
    try {
        /* Deleting the admin by the id. */
        const result = await deleteAdminById(adminid);
        const arrAdmin = await getAllAdmin();
        /* Sending the response to the client. */
        res.json(arrAdmin);
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

/*  DELETE ALL ADMIN */
router.delete("/delete/all", async (req, res) => {
    try {
        /* Deleting all the admins from the database. */
        const result = await deleteAllAdmin();
        const arrAdmin = await getAllAdmin();
        /* Sending the response to the client. */
        res.json({ Message: 'There is no admin users', arrAdmin });
    } catch (error) {
        /* Sending the error message to the client. */
        res.json({ Error: error.message });
    }
});

module.exports = router;