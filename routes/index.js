var express = require('express');
var router = express.Router();

var proxy = require('../util/proxy');

router.get('/', function(req, res, next) {
    res.render('index');
});
//代理服务器请求
router.get('/**', function(req, res, next) {
    //临时判断资源请求路径
    var url = req.url;
    if (url.indexOf('/http') == 0) {
        proxy(req, res, next, url.indexOf('/https') == -1);

    } else {
        res.end("done");
    }


});

module.exports = router;

