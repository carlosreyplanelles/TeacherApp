const { validationResult } = require('express-validator');
const { getTeacherById, getBranchById } = require("../models/teacher.model");
//const Student = require('../models/student.model');

//Schema Validation
const teacherData = {

    phone: {
        exists: {
            errorMessage: 'El campo número de teléfono es obligatorio'
        },
        trim: true,
        isLength: {
            options: { max: 12 },
            errorMessage: 'El número de teléfono no puede superar los 12 dígitos.'
        }
    },
    branch_id: {
        exists: {
            errorMessage: 'EL campo rama es obligatorio',
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'El campo identificador de la rama tiene que ser un número entero mayor que cero'
        }
    },
    price_hour: {
        exists: {
            errorMessage: 'EL campo precio/hora es obligatorio',
        },
        isDecimal: {
            errorMessage: 'The longitude field should be a decimal number'
        }
    },
    experience: {
        exists: true,
        trim: true,
        errorMessage: 'El campo experiencia es obligatorio'
    },
    validated: {
        exists: {
            errorMessage: 'EL campo validado es obligatorio',
        },           
        isInt: {
           // options: { lt: 1, gt: 0 },
            errorMessage: 'El campo identificador de la rama tiene que ser un número: 1 (Validado) - 0 (Pendiente)'
        }
    },
   /* 
    TODO: PDTE DE VER SI SE QUITA O NO LA TABLA LOCATION
    location_id: {
        exists: {
            errorMessage: 'EL campo localidad es obligatorio',
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'El campo identificador de la localidad tiene que ser un número entero mayor que cero'
        }
    },*/   
    avatar: {     
        exists: {
            errorMessage: 'El campo avatar es obligatorio'
        }, 
        trim: true,        
        isURL: {
            errorMessage: 'Introduzca una URL válida para el avatar'
        }
    },
    user_id: {
        exists: {
            errorMessage: 'EL campo usuario es obligatorio',
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'El campo identificador del usuario tiene que ser un número entero mayor que cero'
        }
    },
    subjects: {
        exists: true,
        trim: true,
        errorMessage: 'El campo asignaturas es obligatorio'
    },   
    latitude: {
        optional: true,
        trim: true,
        isDecimal: {
            errorMessage: "The latitude field should be a decimal number"
        }
    },
    longitude: {
        optional: true,
        trim: true,
        isDecimal: {
            errorMessage: "The longitude field should be a decimal number"
        }
    },
    city_id: {
        exists: {
            errorMessage: 'EL campo ciudad es obligatorio',
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'El campo identificador de la ciudad tiene que ser un número entero mayor que cero'
        }
    },
    address: {
        optional: true,
        trim: true
    } 
}


const checkTeacher = async (req, res, next) => {

    const { teacherId } = req.params;

    try {

        if (teacherId === undefined) {
            return res.status(400).json({ error: 'Ocurrió un error al validar el identificador del profesor. El valor '+ teacherId + ' no existe'});
        }

        const teacher = await getTeacherById(teacherId);

        if (!teacher) {            
            return res.status(400).json({ error: 'No existe el profesor con Id = ' + teacherId + '. Debe darlo de alta en la base de datos.' });
        }

        next();       
    } 
    catch (error) {        
        return res.status(400).json({ error: 'No se pudo verificar el profesor con Id = ' + teacherId + '. Error ' + error.errno + ": " + error.message});        
    }    
}

const checkBranch = async (req, res, next) => {

    let branchId;
    
    try {

        //Recupero el id branch en función del origen   
        branchId = ((Object.keys(req.params).length !== 0 && req.params.branchId !== undefined)? req.params.branchId : req.body. branch_id);

        if (branchId === undefined) {
            return res.status(400).json({ error: 'Ocurrió un error al validar el identificador de la rama (branch). El valor '+ branchId + ' no existe'});
        }

        const branch = await getBranchById(branchId);

        if (!branch) {            
            return res.status(400).json({ error: 'No existe la rama con Id = ' + branchId + '. Debe darla de alta en la base de datos.' });
        }

        next();       
    } 
    catch (error) {        
        return res.status(400).json({ error: 'No se pudo verificar la rama con Id = ' + branchId + '. Error ' + error.errno + ": " + error.message});        
    }    
}

module.exports = {
    teacherData, checkTeacher, checkBranch
}