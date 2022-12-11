const express = require('express');
const router = express.Router();
const {getCitiesByProvince, getAllProvinces, getAllCities} = require('../models/location.model');

router.get('/provinces/cities/:province_id',(req, res) =>{
    
    const {province_id} = req.params;
    try{
        const cities = getCitiesByProvince(province_id);
        res.status(200).json(cities);
    } 
    catch (error) {
        if (error.code === 'ECONNREFUSED') {
            res.status(503);
        }
        else {
            res.status(400);
        }
        res.json({ fatal: error.message });
    }
})

router.get('/provinces',async  (req, res) =>{
    try{
        const provinces = await getAllProvinces();
        res.status(200).json(provinces);
    } 
    catch (error) {
        if (error.code === 'ECONNREFUSED') {
            res.status(503);
        }
        else {
            res.status(400);
        }
        res.json({ fatal: error.message });
    }
})

router.get('/cities',async  (req, res) =>{
    try{
        const cities = await getAllCities();
        res.status(200).json(cities);
    } 
    catch (error) {
        if (error.code === 'ECONNREFUSED') {
            res.status(503);
        }
        else {
            res.status(400);
        }
        res.json({ fatal: error.message });
    }
})

module.exports = router