const router = require('express').Router();
const { checkSchema } = require('express-validator');


const { newStudent} = require('../helpers/validators');
const { checkError, checkCity} = require('../helpers/common.validators');
const { newTeacherData, checkBranch } = require('../helpers/teacher.validator');

const { createUser } = require('../models/user.model');
const { createLocation } = require('../models/location.model');
const { getTeacherById, createTeacher } = require('../models/teacher.model');
const Student = require('../models/student.model');
const Location = require('../models/location.model');
const User = require('../models/user.model');

router.post('/student', checkSchema(newStudent), checkError, async (req, res) => {
    try {
        // Insert location and get location_id
        const newLocation = await Location.create(req.body);
        req.body.location_id = newLocation.insertId;

        // Insert user and get user_id
        const newUser = await User.create(req.body);
        req.body.user_id = newUser.insertId;

        // Insert user and get data
        const response = await Student.create(req.body);
        const student = await Student.getById(response.insertId);

        res.json(student);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

router.post('/teacher',     
   checkSchema(newTeacherData),
   checkError,   
   checkBranch,
   checkCity,
    async (req, res) => {

        /**TODO: Mysql transaction process*/

        try {
            console.log("req.body", req.body);

            //Inserción en user
            const resultUser = await createUser(req.body);
            req.body.user_id = resultUser.insertId;

            //Insercion en location
            const resultLocation = await createLocation(req.body);             
            req.body.location_id = resultLocation.insertId;
   
             //Insercion en teacher
            const result = await createTeacher(req.body);            
            const teacher = await getTeacherById(result.insertId);

            res.status(200).json(teacher);
        } 
        catch (error) {
            console.log(error);
            if (error.code === 'ECONNREFUSED') {
                res.status(503);
            }
            else {
                res.status(400);
            }
            res.json({ error: "POST Error " + error.errno + ": " + error.message});
        }
    }
);

module.exports = router