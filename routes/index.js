var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});
//�������������
router.get('/**', function(req, res, next) {
    //��ʱ�ж���Դ����·��
    if (req.url.indexOf('/h') == 0) {
        res.render('proxy', { html: req.url });
    }


});

module.exports = router;
