const express = require('express');
const router = express.Router();
const {getErrorMessagesByType} = require('../models/error.model')

router.get('/:type', async(req,res) =>{
    const {type} = req.params
    try {
        const errors = await getErrorMessagesByType(type);
        res.json(errors)
    } catch (error) {
        res.json({ fatal: error.message });
      }
})

module.exports = router