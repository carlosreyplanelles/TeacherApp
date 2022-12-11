const express = require('express');
const router = express.Router();
const { getAll } = require('../models/branch.model')

router.get('/', async(req,res) =>{

    try{
        const branches = await getAll();
        res.status(200).json(branches);
    }  
    catch (error) {
        res.status(400).json({ fatal: error.message });
    }
})

module.exports = router