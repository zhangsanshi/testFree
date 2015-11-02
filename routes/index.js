var express = require('express');
var router = express.Router();
var proxy = require('../util/proxy');

router.get('/', function(req, res, next) {
    res.render('index');
});
//代理服务器请求
router.get('/**', function(req, res, next) {
    proxy(req, res, next);
});

module.exports = router;

