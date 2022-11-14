const express = require('express');
const router = express.Router();
const {getCitiesByProvince,getAllProvince, getAllCities} = require('../models/location.model');

router.get('/provinces/cities/:province_id',(req, res) =>{
    
    const {province_id} = req.query;
    try{
        const cities = getCitiesByProvince(province_id);
        res.json(cities);
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

router.get('/provinces',async  (req, res) =>{
    try{
        const provinces = await getAllProvince();
        res.json(provinces);
    } catch (error) {
        res.json({ fatal: error.message });
    }
})

router.get('/cities',async  (req, res) =>{
    try{
        const cities = await getAllCities();
        res.json(cities);
    } catch (error) {
        res.json({ fatal: error.message });
    }
})


module.exports = router