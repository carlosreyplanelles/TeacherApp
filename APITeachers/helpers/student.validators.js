const Student = require('../models/student.model');

const newStudent = {
    name: {
        exists: {
            errorMessage: 'El campo nombre es obligatorio'
        },
        trim: true,
        isLength: {
            options: { min: 3 },
            errorMessage: 'El nombre debe tener como mínimo 3 caracteres'
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
            errorMessage: "El campo email es obligatorio",
        },
        trim: true,
        isEmail: {
            errorMessage: "Introduzca un email válido",
        }
    },
    password: {
        exists: {
            errorMessage: "El campo contraseña es obligatorio",
        },
        trim: true,
        isLength: {
            options: { min: 8 },
            errorMessage: "La contraseña requiere 8 caracteres como mínimo"
        }
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
            errorMessage: "El campo rol es obligatorio"
        },
        isInt: {
            errorMessage: "El rol debe ser un valor numérico"
        }
    },
    phone: {
        exists: {
            errorMessage: "El campo número de teléfono es obligatorio"
        },
        trim: true,
        isLength: {
            options: { max: 12 },
            errorMessage: 'El número de teléfono no puede superar los 12 dígitos'
        }
    },
    avatar: {
        exists: {
            errorMessage: "El campo avatar es obligatorio"
        }, 
        trim: true,
        isURL: {
            errorMessage: 'Introduzca una URL válida para el avatar'
        }
    },
    latitude: {
        optional: true,
        trim: true,
        // isDecimal: {
        //     errorMessage: "El campo latitud debe ser un número decimal"
        // }
    },
    longitude: {
        optional: true,
        trim: true,
        // isDecimal: {
        //     errorMessage: "El campo longitud debe ser un número decimal"
        // }
    },
    city_id: {
        exists: {
            errorMessage: 'El campo ciudad es obligatorio',
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
    active: {
        optional: true
    }
}

const checkStudent = async (req, res, next) => {
    const { studentId } = req.params;

    try {

        if (studentId === undefined) {
            return res.status(400).json({ error: 'Ocurrió un error al validar el identificador del estudiante. El valor '+ studentId + ' no existe'});
        }

        const student = await Student.getById(studentId);

        if (!student) {            
            return res.status(404).json({ error: 'No existe el estudiante con Id = ' + studentId + '. Debe darlo de alta en la base de datos.' });
        }

        next();       
    } 
    catch (error) {        
        return res.status(400).json({ error: 'No se pudo verificar el estudiante con Id = ' + studentId + '. Error ' + error.errno + ": " + error.message});        
    }
}

const checkEmptyLocation = (req, res, next) => {
    req.body.latitude = (req.body.latitude === "" || req.body.latitude === undefined ? null : req.body.latitude);
    req.body.longitude = (req.body.longitude === "" || req.body.longitude === undefined ? null : req.body.longitude);
    req.body.address = (req.body.address === "" || req.body.address === undefined ? null : req.body.address);

    next();
}

module.exports = {
    newStudent, checkStudent, checkEmptyLocation
}