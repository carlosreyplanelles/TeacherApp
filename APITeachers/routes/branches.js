const express = require('express');
const router = express.Router();
const { getAll } = require('../models/branch.model')

router.get('/', async(req,res) =>{

    try{
        const branches = await getAll();
        res.json(branches);
    }  catch (error) {
        res.json({ fatal: error.message });
      }
})

module.exports = router