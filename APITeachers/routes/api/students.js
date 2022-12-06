const router = require('express').Router();
const { checkSchema } = require('express-validator');
const dayjs = require('dayjs');
const bcrypt = require('bcryptjs');

const Student = require('../../models/student.model');
const Location = require('../../models/location.model');
const User = require('../../models/user.model');

const { newStudent, checkStudent } = require('../../helpers/student.validators');
const { checkError, checkUser, checkCity, checkLocation, checkRole } = require('../../helpers/common.validators');
const Auth = require('../../helpers/midelwares');

// GET ALL
router.get('/', async (req, res) => {
    try {
        const students = await Student.getAll();
        res.status(200).json(students);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// GET BY ID
router.get('/:studentId',
    checkStudent, async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.getById(studentId);
        res.status(200).json(student);
    } catch (err) {
        res.json({ error: err.message });
    }
});

// POST
router.post('/',
    checkSchema(newStudent),
    checkCity,
    checkError,
    async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8);

        // Insert location and get location_id
        const newLocation = await Location.create(req.body);
        req.body.location_id = newLocation.insertId;

        // Insert user and get user_id
        const newUser = await User.create(req.body);
        req.body.user_id = newUser.insertId;

        // Insert user and get data
        const response = await Student.create(req.body);
        const student = await Student.getById(response.insertId);

        res.status(200).json(student);
        
    } catch (err) {
        res.json({ error: err.message });
    }
});

// UPDATE
router.put('/:studentId',
    Auth.checkToken,
    checkStudent,
    checkSchema(newStudent),
    checkUser,
    checkRole,
    checkCity,
    checkError,
    async (req, res) => {
    const { studentId } = req.params;

    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8);

        console.log('update', req.body);

        // Get student data
        const student = await Student.get(studentId);
        req.body.location_id = student.location_id;
        req.body.user_id = student.user_id;
        
        // Update locations table
        await Location.update(student.location_id, req.body)

        // Update users table
        await User.update(student.user_id, req.body)

        // Update students table
        await Student.update(student.id, req.body);
        const newStudent = await Student.getById(student.id);

        res.status(200).json(newStudent);
    } catch (err) {
        res.status(400).json({ error: "PUT Error " + err.errno + ": " + err.message,
                                   result: "No se pudo actualizar el estudiante " + studentId
                                });
    }
});

// DELETE
// router.delete('/:studentId', checkStudent, async (req, res) => {
//     const { studentId } = req.params;

//     try {
//         const result = await Student.deleteById(studentId);
//         res.json(result);
//     } catch (err) {
//         res.json({ error: err.message });
//     }
// });
router.delete('/:studentId',
    Auth.checkToken,
    Auth.checkRole('admin'),
    checkStudent,
    async (req, res) => {

        const { studentId } = req.params;

        /**TODO: mysql transaction*/

        try {    
            // Recupero al estudiante
            const student = await Student.getById(studentId);

            if (student.leaving_date !== null) {
                res.status(400).json({ error: "El estudiante " + studentId + " ya fue dado de baja en el sistema el " + student.leaving_date });
            }

            // Fecha de baja  
            const leavingDate = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
          
            //update user
            const resultUser = await User.cancelUser(student.user_id, leavingDate);
                     
            // Se desactiva el estudiante
            const resultStudent = await Student.deactivate(studentId);
            
            // Datos actualizados del estudiante
            const deactivatedStudent = await Student.getById(studentId);

            res.status(200).json(resultStudent);
        } 
        catch (error) {        
            res.status(400).json({ error: "DELETE Error " + error.errno + ": " + error.message,
                                   result: "No se pudo dar de baja al estudiante " + studentId
                                });
        }
    }
);

module.exports = router;