/**
 * Created by zhanglei on 2015/5/16.
 */
var index = require('../routes/index');
module.exports = function (app) {
    app.use('/', index);
};