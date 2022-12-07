//Schema Validation
const newBookingData = {

    start_hour: {
        exists: {
            errorMessage: 'El campo hora de inicio de las clases es obligatorio',
        },           
        isInt: {           
            errorMessage: 'El campo hora de inicio tiene que ser un número entero'
        }
    },    
    start_date: {
        exists: {
            errorMessage: 'El campo fecha de inicio de la clase es obligatorio'
        },
        trim: true,       
        isDate: {            
            errorMessage: 'El formato de fecha no es correcto. Debe cumplir este formato YYYY-MM-DD.'
        } 
    }
    /**TODO: rellenar unas observaciones - campo title, optional:true*/
}

module.exports = { newBookingData }