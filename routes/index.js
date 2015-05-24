var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});
//代理服务器请求
router.get('/**', function(req, res, next) {
    //临时判断资源请求路径
    if (req.url.indexOf('/h') == 0) {
        res.render('proxy', { html: req.url });
    }


});

module.exports = router;
