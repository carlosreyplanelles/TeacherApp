var express = require('express');
var router = express.Router();
let { getUserbyEmail } = require('../models/user.model')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:email',async  (req, res) =>{
  try{
      const user = await getUserbyEmail(req.params.email);
      res.json(user);
  } catch (error) {
      res.json({ fatal: error.message });
  }
})

module.exports = router;
