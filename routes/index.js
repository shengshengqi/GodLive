var express = require('express');
const { GoldLog } = require('../models');
var router = express.Router();

/* GET home page. */
router.get('/pv', async function(req, res, next) {
  await GoldLog.pv()
  res.end()
});

module.exports = router;
