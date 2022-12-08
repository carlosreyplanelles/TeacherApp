const router = require('express').Router();

const { checkSchema } = require('express-validator');
const { checkStudent } = require('../../helpers/student.validators');
const { checkTeacher } = require('../../helpers/teacher.validator');
const { newBookingData } = require('../../helpers/class.validator');
const { checkError } = require('../../helpers/common.validators');

const { createBooking, getClassBooked, getActiveClassesBooked } = require('../../models/class.model');

/** GET datos de una clase reservada*/
router.get('/:classId', async (req, res) => {
    const { classId } = req.params;

    try {
        const classData = await getClassBooked(classId);
        
        if (classData) {
            res.status(200).json(classData);
        }
        else {
            res.status(400).json({ error: 'No exista reserva de clase con el Id ' + classId + '.'});
        }

       
    } 
    catch (error) {
        res.status(400).json({ error: "Error " + error.errno + ": " + error.message});
    }
});

/** GET clases por teacherId y fecha*/
router.get('/teacher/teacher=:teacherId&date=:startDate', async (req, res) => {
    
    const { teacherId, startDate } = req.params;

    try {
        /**TODO: Habría que comprobar formato fecha a ver como viene*/
        const classesData = await getActiveClassesBooked(teacherId, startDate);
        
        if (classesData) {
            res.status(200).json(classesData);
        }
        else {
            res.status(400).json({ error: 'No existen clases reservadas para el profesor con Id ' + teacherId + ' para la fecha ' + startDate + "."});
        }
       
    } 
    catch (error) {       
       res.status(400).json({ error: "Error " + error.errno + ": " + error.message});
    }
});

/*POST Insert reserva*/
router.post('/',     
   checkSchema(newBookingData),
   checkError,   
   checkTeacher,
   checkStudent,   
   async (req, res) => {

        try {
            //Añadir la hora de fin de la clase. Clases de 60 min
            req.body.end_hour = parseInt(req.body.start_hour) + 1;

            //Inserción en classes
            const result = await createBooking(req.body);

            const classBooked = await getClassBooked(result.insertId);
         
            res.status(200).json(classBooked);
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

/* PUT - UPDATE
router.put('/:classId', 
    async (req, res) => {

        const { classId } = req.params;

        try {
           
        
            //Actualizo reserva
            const result = await updateBooking(classId, req.body);

            //TODO: Respuesta: ¿Resultado de la operación o los datos getClassBooked?
            res.status(200).json(result);
        } 
        catch (error) {      
           
           res.status(400).json({ error: "PUT Error " + error.errno + ": " + error.message,
                                   result: "No se pudo actualizar la reserva de la clase  " + classId
                                });
        }
    }
);
*/
/** TODO DELETE 
router.delete('/:classId',
    checkClass,
    async (req, res) => {

        const { classId } = req.params;

      

        try {    
            //Recupera la clase
            const classData = await getClassBooked(classId);

            if (classData.cancel_date !== null) {
                res.status(400).json({ error: "El profesor " + teacherId + " ya fue dado de baja en el sistema el " + dayjs(teacher.leaving_date).format('DD/MM/YYYY HH:mm:ss') });
            }

            //Fecha de baja  
            const cancel_date = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
          
            //update class
            const resultClass = await cancelBooking(classId, cancel_date);  
                     
            res.status(200).json(resultClass);
        } 
        catch (error) {        
            res.status(400).json({ error: "DELETE Error " + error.errno + ": " + error.message,
                                   result: "No se pudo cancelar la reserva de la clase " + classId
                                });
        }
    }
);
*/


module.exports = router;