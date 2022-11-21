const { getUserById } = require("../models/user.model");

const UserData = {
    name: {
        exists: true,
        trim: true,
        errorMessage: "The name field is required"
    },
    surname: {
        exists: true,
        trim: true,
        errorMessage: "The surname field is required"
    },
    email: {
        exists: {
            errorMessage: "The email field is required",
        },
        trim: true,
        isEmail: {
            errorMessage: "The email must be valid",
        }
    },
    password: {
        exists: {
            errorMessage: "The password field is required",
        },
        trim: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars long'
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
            errorMessage: "The role_id field is required",
        },
        isInt: true,
        errorMessage: "The role field must be a number"
    }

}

const checkUser = async (req, res, next) => {
    const { userId } = req.params;
   
    if (userId === undefined) {
        return res.status(400).json({ error: 'Ocurrió un error al validar el identificador del autor. El valor '+ autorId + ' no existe'});
    }

    const user = await getUserById(userId);

    if (!user) {            
        return res.status(400).json({ error: 'No existe el usuario con Id = ' + userId + '. Debe darlo de alta en la base de datos.' });
    }

    next();   

};

module.exports = {
    checkUser, UserData
}