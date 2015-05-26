/**
 * 日志配置目录
 * Created by zhanglei on 2015/5/16.
 */
var FileStreamRotator = require('file-stream-rotator');
var logger = require('morgan');
var fs = require('fs');
var path = require('path');

var logDirectory = path.join(__dirname , '../log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = FileStreamRotator.getStream({
    filename: path.join(logDirectory ,  '/access-%DATE%.log'),
    frequency: 'daily',
    verbose: false,
    date_format: "YYYY-MM-DD"
});

module.exports = function () {
    return logger('combined', {stream: accessLogStream});
};