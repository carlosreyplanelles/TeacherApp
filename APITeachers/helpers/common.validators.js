const { validationResult } = require('express-validator');

const { getUserById } = require('../models/user.model');

const { getCityById } = require('../models/location.model');

//Middleware que comprueba si hubo errores en la validación de los datos de la petición. 
//checkValidationErrors
const checkError = (req, res, next) => {

    const errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {              
        return res.status(400).json(errorsValidation.mapped());;
    }
    next();
}

const checkUser = async (req, res, next) => {

    let userId;
    
    try {

        //Recupero el id user en función del origen   
        userId = ((Object.keys(req.params).length !== 0 && req.params.userId !== undefined)? req.params.userId : req.body. user_id);

        if (userId === undefined) {
            return res.status(400).json({ error: 'Ocurrió un error al validar el identificador del usuario. El valor '+ userId + ' no existe'});
        }

        const user = await getUserById(userId);

        if (!user) {            
            return res.status(400).json({ error: 'No existe el usuario con Id = ' + userId + '. Debe darlo de alta en la base de datos.' });
        }

        next();       
    } 
    catch (error) {        
        return res.status(400).json({ error: 'No se pudo verificar el usuario con Id = ' + userId + '. Error ' + error.errno + ": " + error.message});        
    }    
}


const checkCity = async (req, res, next) => {

    let cityId;
    
    try {

        console.log("req", req.params);
        console.log("body", req.body);
        //Recupero el id city en función del origen   
        cityId = ((Object.keys(req.params).length !== 0 && req.params.cityId !== undefined)? req.params.cityId : req.body.city_id);

        if (cityId === undefined) {
            return res.status(400).json({ error: 'Ocurrió un error al validar el identificador de la ciudad. El valor '+ cityId + ' no existe'});
        }

        const city = await getCityById(cityId);

        if (!city) {            
            return res.status(400).json({ error: 'No existe la ciudad con Id = ' + cityId + '. Debe darla de alta en la base de datos.' });
        }

        next();       
    } 
    catch (error) {        
        return res.status(400).json({ error: 'No se pudo verificar la ciudad con Id = ' + cityId + '. Error ' + error.errno + ": " + error.message});        
    }    
}



module.exports = { 
    checkError, checkUser, checkCity
}

