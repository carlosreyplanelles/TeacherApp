const { executeQuery } = require('../helpers/utils');

const create = ({ latitude, longitude, city_id, address }) => {
    return executeQuery('INSERT INTO locations (latitude, longitude, city_id, address) VALUES (?, ?, ?, ?)', [latitude, longitude, city_id, address]);
};

const update = (locationId, { latitude, longitude, city_id, address }) => {
    return executeQuery('UPDATE locations SET latitude = ?, longitude = ?, city_id = ?, address = ? WHERE id = ?', [latitude, longitude, city_id, address, locationId]);
};

const getAllProvinces = () =>{
    return executeQuery('SELECT * FROM provinces')
}

const getAllCities = () => {
    return executeQuery('SELECT * FROM cities')
}

module.exports = {
    create, update, getAllProvinces, getAllCities
}