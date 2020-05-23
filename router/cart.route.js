var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
var controller = require('../controller/cart.controller')
router.use(cookieParser());
//router.get('/',controller.index)
router.get('/add/:productId', controller.add)
router.post('/update', controller.update)
module.exports= router;