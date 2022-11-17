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

module.exports = {
    createLocation, updateLocation, getCityById, getLocationById
}
