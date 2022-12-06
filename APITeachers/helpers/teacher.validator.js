
const { getTeacherById, getBranchById } = require("../models/teacher.model");

//Schema Validation
const newTeacherData = {

    name: {
        exists: {
            errorMessage: 'El campo nombre es obligatorio'
        },
        trim: true,       
        isLength: {
            options: { min: 3 },
            errorMessage: 'El nombre debe tener como mínimo 3 caracteres.'
        } 
    },
    surname: {
        exists: {
            errorMessage: 'El campo apellidos es obligatorio'
        },
        trim: true,
        isLength: {
            options: {min: 3, max: 80},
            errorMessage: 'La longitud del campo apellidos no es válida'
        }  
    },
    email: {
        exists: {
            errorMessage: 'El campo email es obligatorio'
        },
        trim: true,
        isEmail: {
            errorMessage: 'Introduzca un email válido'
        }  
    },
    password: {
        exists: {
            errorMessage: "El campo contraseña es obligatorio",
        },
        trim: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'La contraseña requiere 8 caracteres como mínimo'
        }
        // TODO: y que pongan caracteres especiales
        // isStrongPassword: {
        //     minLength: 8,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1,
        // },
        // errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    },
    role_id: {
        exists: {
            errorMessage: "El campo rol es obligatorio",
        },
        isInt: {
            errorMessage: "El rol debe ser un valor numérico"
        }        
    },
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
            errorMessage: 'EL campo precio por hora es obligatorio',
        },
        isDecimal: {
            errorMessage: 'El precio por hora debe ser un número decimal utilizando el . como separador'
        }
    },
    experience: {
        optional: true,       
        isInt: {
            errorMessage: "El campo años de experiencia debe ser un valor numérico"
        } 
    },
    validated: {
        exists: {
            errorMessage: 'EL campo validado es obligatorio',
        },           
        isInt: {
           // options: { lt: 1, gt: 0 },
            errorMessage: 'El campo validado tiene que ser un número: 1 (Validado) - 0 (Pendiente)'
        }
    }, 
    avatar: {     
        optional: {
            options: { 
                checkFalsy: true,
                checkNull: true
            }
        },
        trim: true,        
        isURL: {
            errorMessage: 'Introduzca una URL válida para el avatar'
        }
    },
    subjects: {
        optional: true, 
        trim: true        
    },    
    latitude: {
        optional: {
            options: { 
                checkFalsy: true,
                checkNull: true
            }
        },
        isDecimal: {
            errorMessage: "La latitud debe ser un número decimal utilizando el . como separador"
        }
    },
    longitude: {
        optional: {
            options: { 
                checkFalsy: true,
                checkNull: true
            }
        },
        isDecimal: {
            errorMessage: "La longitud debe ser un número decimal utilizando el . como separador"
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
    }, 
    start_class_hour: {
        exists: {
            errorMessage: 'EL campo hora de inicio de las clases es obligatorio',
        },           
        isInt: {           
            errorMessage: 'El campo hora de inicio tiene que ser un número entero'
        }
    }, 
    end_class_hour: {
        exists: {
            errorMessage: 'EL campo hora de fin de las clases es obligatorio',
        },           
        isInt: {           
            errorMessage: 'El campo hora de fin tiene que ser un número entero'
        }
    }
}

const updateTeacherData = {

    name: {
        exists: {
            errorMessage: 'El campo nombre es obligatorio'
        },
        trim: true,       
        isLength: {
            options: { min: 3 },
            errorMessage: 'El nombre debe tener como mínimo 3 caracteres.'
        } 
    },
    surname: {
        exists: {
            errorMessage: 'El campo apellidos es obligatorio'
        },
        trim: true,
        isLength: {
            options: {min: 3, max: 80},
            errorMessage: 'La longitud del campo apellidos no es válida'
        }  
    },
    email: {
        exists: {
            errorMessage: 'El campo email es obligatorio'
        },
        trim: true,
        isEmail: {
            errorMessage: 'Introduzca un email válido'
        }  
    },
    password: {
        exists: {
            errorMessage: "El campo contraseña es obligatorio",
        },
        trim: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'La contraseña requiere 8 caracteres como mínimo'
        }
        // TODO: y que pongan caracteres especiales
        // isStrongPassword: {
        //     minLength: 8,
        //     minLowercase: 1,
        //     minUppercase: 1,
        //     minNumbers: 1,
        // },
        // errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    },
    role_id: {
        exists: {
            errorMessage: "El campo rol es obligatorio",
        },
        isInt: {
            errorMessage: "El rol debe ser un valor numérico"
        }        
    },    
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
            errorMessage: 'El precio por hora debe ser un número decimal utilizando el .'
        }
    },
    experience: {
        optional: true,       
        isInt: {
            errorMessage: "El campo años de experiencia debe ser un valor numérico"
        } 
    },
    validated: {
        exists: {
            errorMessage: 'EL campo validado es obligatorio',
        },           
        isInt: {
           // options: { lt: 1, gt: 0 },
            errorMessage: 'El campo validado tiene que ser un número: 1 (Validado) - 0 (Pendiente)'
        }
    },
    avatar: {     
        optional: {
            options: { 
                checkFalsy: true,
                checkNull: true
            }
        },
        trim: true,        
        isURL: {
            errorMessage: 'Introduzca una URL válida para el avatar'
        }
    },
    subjects: {
        optional: true, 
        trim: true        
    },  
    latitude: {
        optional: {
            options: { 
                checkFalsy: true,
                checkNull: true
            }
        },
        isDecimal: {
            errorMessage: "La latitud debe ser un número decimal utilizando el . como separador"
        }
    },
    longitude: {
        optional: {
            options: { 
                checkFalsy: true,
                checkNull: true
            }
        },
        isDecimal: {
            errorMessage: "La longitud debe ser un número decimal utilizando el . como separador"
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
    location_id: {
        exists: {
            errorMessage: 'EL campo localidad es obligatorio',
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'El campo identificador de la localidad tiene que ser un número entero mayor que cero'
        }
    },
    start_class_hour: {
        exists: {
            errorMessage: 'EL campo hora de inicio de las clases es obligatorio',
        },           
        isInt: {           
            errorMessage: 'El campo hora de inicio tiene que ser un número entero'
        }
    }, 
    end_class_hour: {
        exists: {
            errorMessage: 'EL campo hora de fin de las clases es obligatorio',
        },           
        isInt: {           
            errorMessage: 'El campo hora de fin tiene que ser un número entero'
        }
    }
}

const checkTeacher = async (req, res, next) => {

    let teacherId;

    try {

        //Recupero el id teacher en función del origen   
        teacherId = ((Object.keys(req.params).length !== 0 && req.params.teacherId !== undefined)? req.params.teacherId : req.body.teacherId);

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
        branchId = ((Object.keys(req.params).length !== 0 && req.params.branchId !== undefined)? req.params.branchId : req.body.branch_id);

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

const checkEmptyFields = async (req, res, next) => {

    req.body.latitude = (req.body.latitude === "" || req.body.latitude === undefined ? null : req.body.latitude);
    req.body.longitude = (req.body.longitude === "" || req.body.longitude === undefined ? null : req.body.longitude);
    req.body.address = (req.body.address === "" || req.body.address === undefined ? null : req.body.address);
    req.body.avatar = (req.body.avatar === "" || req.body.avatar === undefined ? null : req.body.avatar);
    req.body.subjects = (req.body.subjects === "" || req.body.subjects === undefined ? null : req.body.subjects);

     next();       
}

module.exports = {
    newTeacherData, updateTeacherData, checkTeacher, checkBranch, checkEmptyFields
}