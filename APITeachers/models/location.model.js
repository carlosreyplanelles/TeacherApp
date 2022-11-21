const { executeQuery, executeQueryOne } = require('../helpers/utils');

const createLocation = ({ latitude, longitude, city_id, address }) => {
    return executeQuery('INSERT INTO locations (latitude, longitude, city_id, address) VALUES (?, ?, ?, ?)', [latitude, longitude, city_id, address]);
};

const updateLocation = (locationId, { latitude, longitude, city_id, address }) => {
    return executeQuery('UPDATE locations SET latitude = ?, longitude = ?, city_id = ?, address = ? WHERE id = ?', [latitude, longitude, city_id, address, locationId]);
};

const getCityById = (cityId) => {
    return executeQueryOne('select * from cities where id = ?', [cityId]);
}; 

const getLocationById = (locationId) => {
    return executeQueryOne('select * from locations where id = ?', [locationId]);
}; 

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

const getCitiesByProvince = (provinceId) =>{
    return executeQuery('SELECT * FROM cities WHERE province_id = ?', [provinceId])
}

module.exports = {
    create, update, getAllProvinces, getAllCities,getCitiesByProvince, createLocation, updateLocation, getCityById, getLocationById
}
