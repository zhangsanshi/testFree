/**
 * Created by sanshi on 2015/5/26.
 */

var http = require('http');
var BufferHelper = require('bufferhelper');
var replaceHtml = require('./replaceHtml');
var url = require('url');

function proxy(req, res, next, isHttp) {
    var bufferHelper = new BufferHelper();
    if (isHttp) {
        var urlObj = url.parse(req.url.substring(1), true);
        var resourceUrl = urlObj.protocol + "//"+urlObj.hostname + urlObj.pathname;
        console.log(resourceUrl);
        http.get(resourceUrl,function(proxyRes){
            proxyRes.on('data', function (chunk) {
                bufferHelper.concat(chunk);
            });
            proxyRes.on('error',function(e){
                console.log("Got error: " + e.message);
            });
            proxyRes.on('end',function(e){
                var html = bufferHelper.toBuffer().toString();
                res.render('proxy', { html: replaceHtml(html, urlObj)});
            });
        });
    } else {

    }

}

module.exports = proxy;