const router = require('express').Router();

const dayjs = require('dayjs');
const { sendMailAPiTeachers } = require('../../helpers/email')
const { checkSchema } = require('express-validator');


const { checkError, checkUser, checkCity, checkLocation, checkRole } = require('../../helpers/common.validators');
const { newTeacherData, updateTeacherData, checkTeacher, checkBranch, checkEmptyFields } = require('../../helpers/teacher.validator');

const { createUser, getUserById, updateUser, cancelUser } = require('../../models/user.model');
const { createLocation, updateLocation } = require('../../models/location.model');
const { getAllTeachers, getTeachersByPage, getAllTeachersByFilters, getTeacherById, createTeacher, invalidateTeacher, updateTeacher, getTeacherHours, validateTeacher } = require('../../models/teacher.model');
const { getAverageRatingByTeacher } = require('../../models/rating.model');
const bcrypt = require('bcryptjs');
const Auth = require('../../helpers/midelwares');

/* GET - READ */
router.get('/', async (req, res) => {
 
    let teachers;
   
    try {

        if (Object.keys(req.query).length !== 0) {            
            const { page = 1 , limit = 10 } = req.query;
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
        const teacher = await getTeacherById(teacherId);

        if (teacher) {
            //Añadir su puntuación media
            const averageRating = await getAverageRatingByTeacher(teacherId);
            teacher.avg_rating = Math.round((averageRating.avg_rating !== null ? averageRating.avg_rating : 0));        
            res.status(200).json(teacher);
        } 
        else {
            res.status(400).json({ error: 'No existe el profesor con Id ' + teacherId });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Error " + error.errno + ": " + error.message});
    }   
});

router.get('/hours/:teacherId', async (req, res) => {

    const { teacherId } = req.params;
    
    try {
        const teacher = await getTeacherHours(teacherId);

        if (teacher) {            
            res.status(200).json(teacher);
        } 
        else {
            res.status(400).json({ error: 'No existe el profesor con Id ' + teacherId });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Error " + error.errno + ": " + error.message});
    }   
});

router.get('/filters/:filterId', async (req, res) => {
   
    const { filterId } = req.params;

    /**TODO: A una tabla en BBDD numero - filtro*/
    const arrayFilters = [
                            'order by price_hour asc, experience desc',
                            'order by branch_id, price_hour asc, experience desc',
                            'order by teacher_id'
                        ];

    try {
       
        const filter = arrayFilters[parseInt(filterId)-1];

        //Control de undefined arrayFilter[parseInt(filterId)-1] 
        if (filter) {
            const teachers = await getAllTeachersByFilters(filter);
            res.status(200).json(teachers);
        } 
        else {
             res.status(400).json({ error: "Error: No se ha establecido el filtro de búsqueda correcto. El filtro " + filterId + " no existe."});
        }
              
    } catch (error) {
        res.status(400).json({ error: "GET Teacher Filtered Error " + error.errno + ": " + error.message});
    }
});

/* POST - INSERT*/ 
router.post('/',     
   checkSchema(newTeacherData),
   checkError,   
   checkBranch,
   checkCity,
   checkEmptyFields,
    async (req, res) => {

        // Info Teacher to Email
        const  dataTeacherMail  = req.body

        /**TODO: Mysql transaction process*/

        try {
            
            req.body.password = bcrypt.hashSync(req.body.password, 8);
                     
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

            // Send email to activate Teacher
            try {
                await sendMailAPiTeachers(dataTeacherMail);      
            } 
            catch (error) {
                console.log('Mail no enviado:', error.message);
            } 

        } 
        catch (error) {            
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

/* PUT - UPDATE GENERAL*/
router.put('/:teacherId', 
    Auth.checkToken,
    checkTeacher,
    checkSchema(updateTeacherData),    
    checkError,
    checkUser,
    checkRole,
    checkBranch,
    checkLocation,
    checkCity,
    checkEmptyFields,
    async (req, res) => {

        const { teacherId } = req.params;

        /**TODO: Mysql transaction process*/

        try {
           
            //Encripto password
            req.body.password = bcrypt.hashSync(req.body.password, 8);

            //Actualizo user
            const resultUser = await updateUser(req.body.user_id,req.body);
           
            //Actualizo location
            const resultLocation = await updateLocation(req.body.location_id,req.body);
          
            //Actualizo teacher
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

router.put('/validate/:teacherId', 
    checkTeacher,   
    async (req, res) => {

        const { teacherId } = req.params;
       
        try {          
            
            //Validar profesor
            const resultTeacher = await validateTeacher(teacherId);

            if (resultTeacher.affectedRows !== 1) {
                res.status(400).json({ error:  "No se pudo validar al profesor " + teacherId });
            }
          
            //Recupero los datos del profesor
            const teacherData = await getTeacherById(teacherId);
            
            //Y lo habilito en usuarios
            const resultUser = await cancelUser(teacherData.user_id, null);  
                
            if (resultUser.affectedRows !== 1) {
                res.status(400).json({ 
                    error:  "Se ha validado el profesor " + teacherId + " pero ocurrió un error al quitar la baja en usuarios. Contacte con el administrador", 
                    data: teacherData
                });
            }
               
           teacherData.leaving_date = null;          
           res.status(200).json(teacherData);
        } 
        catch (error) {      
           
           res.status(400).json({ error: "PUT Error " + error.errno + ": " + error.message,
                                   result: "No se pudo validar al profesor " + teacherId
                                });
        }
    }
);

/* DELETE */
router.delete('/:teacherId',
    Auth.checkToken,
    Auth.checkRole('admin'),
    checkTeacher,
    async (req, res) => {

        const { teacherId } = req.params;

        /**TODO: mysql transaction*/

        try {    
            //Recupero al profesor
            const teacher = await getTeacherById(teacherId);

            if (teacher.leaving_date !== null) {
                res.status(400).json({ error: "El profesor " + teacherId + " ya fue dado de baja en el sistema el " + dayjs(teacher.leaving_date).format('DD/MM/YYYY HH:mm:ss') });
            }

            //Fecha de baja  
            const leavingDate = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
          
            //update user
            const resultUser = await cancelUser(teacher.user_id, leavingDate);  
                     
            //Ya el profesor no es válido  //update teacher
            const resultTeacher = await invalidateTeacher(teacherId);
            
            teacher.leaving_date = leavingDate;

            res.status(200).json(teacher);
        } 
        catch (error) {        
            res.status(400).json({ error: "DELETE Error " + error.errno + ": " + error.message,
                                   result: "No se pudo dar de baja al profesor " + teacherId
                                });
        }
    }
);


module.exports = router;