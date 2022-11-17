const router = require('express').Router();

const { checkSchema } = require('express-validator');

const { checkError, checkUser, checkCity, checkLocation, checkRole } = require('../../helpers/common.validators');
const { newTeacherData, updateTeacherData, checkTeacher, checkBranch } = require('../../helpers/teacher.validator');

const { createUser, getUserById, updateUser } = require('../../models/user.model');
const { createLocation, updateLocation } = require('../../models/location.model');
const { getAllTeachers, getTeachersByPage, getTeacherByUserId, getTeacherById, getTeacherByEmail, createTeacher, deleteTeacherById, updateTeacher } = require('../../models/teacher.model');


/**TODO: Conflicto con nombres de métodos iguales entre users y teachers por eso lo comenté para ver qué necesito y renombré un par mios*/
//const { getAll, getById, getByPage, create, update, deleteById } = require('../../models/user.model');


/* GET - READ */
router.get('/', async (req, res) => {
 
    let teachers;

    try {

        if (Object.keys(req.query).length !== 0) {            
            const { page , limit } = req.query;
            teachers = await getTeachersByPage(parseInt(page), parseInt(limit));
        }
        else {            
            teachers = await getAllTeachers();
        }
        
        res.status(200).json(teachers);
        
    } catch (error) {
        res.status(400).json({ error: "GET Error " + error.errno + ": " + error.message});
    }
});

router.get('/:teacherId', async (req, res) => {
    const { teacherId } = req.params;

    try {
        const teacher = await getById(teacherId);

        if (teacher) {
            res.status(200).json(teacher);
        } else {
            res.status(400).json({ error: 'No existe el profesor con Id ' + teacherId });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Error " + error.errno + ": " + error.message});
    }   
});


/* POST - INSERT*/ 
router.post('/',     
   checkSchema(newTeacherData),
   checkError,   
   checkBranch,
   checkCity,
    async (req, res) => {

        await db.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
        
        console.log(db);
        const conex = db.getConnection();
        await conex.beginTransaction();

        try {
            console.log("req.body - incio transaccion", req.body);           

            //Inserción en user
            const resultUser = await createUser(req.body);
            req.body.user_id = resultUser.insertId;

            //Insercion en location
            const resultLocation = await createLocation(req);       //req.body      
            req.body.location_id = resultLocation.insertId;
   
             //Insercion en teacher
            const result = await createTeacher(req.body);            
            const teacher = await getTeacherById(result.insertId);

            await conex.commit();
            console.log('Commit');

            res.status(200).json(teacher);            
        } 
        catch (error) {
            console.log(error);
            conex.rollback();
            console.log('Rollback');

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


/* PUT - UPDATE*/
router.put('/:teacherId', 
    checkTeacher,
    checkSchema(updateTeacherData),    
    checkError,
    checkUser,
    checkRole,
    checkBranch,
    checkLocation,
    checkCity,
    async (req, res) => {

        const { teacherId } = req.params;

        try {     
            //Actualizo user
            const resultUser = await updateUser(req.body.user_id,req.body);
            console.log("resultUser", resultUser);

            //Actualizo location
            const resultLocation = await updateLocation(req.body.location_id,req.body);          
            console.log("resultLocation", resultLocation);

            const result = await updateTeacher(teacherId, req.body);
            /**TODO: Respuesta: ¿Resultado de la operación o los datos getTeacherbyid?*/
            res.status(200).json(result);
        } 
        catch (error) {      
           
           res.status(400).json({ error: "PUT Error " + error.errno + ": " + error.message,
                                   result: "No se pudo actualizar el profesor " + teacherId
                                });
        }
    }
);

/* DELETE */
router.delete('/:teacherId',
    checkTeacher,
    async (req, res) => {

        const { teacherId } = req.params;

        try {      
            const result = await deleteTeacherByIdId(teacherId);
            res.status(200).json(result);
        } 
        catch (error) {        
            res.status(400).json({ error: "DELETE Error " + error.errno + ": " + error.message,
                                   result: "No se pudo eliminar el profesor " + teacherId
                                });
        }
    }
);


module.exports = router;