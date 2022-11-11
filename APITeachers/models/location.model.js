const { executeQuery } = require('../helpers/utils');

const create = ({ latitude, longitude, city_id, address }) => {
    return executeQuery('INSERT INTO locations (latitude, longitude, city_id, address) VALUES (?, ?, ?, ?)', [latitude, longitude, city_id, address]);
};

module.exports = {
    create
}