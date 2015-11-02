/**
 * Created by sanshi on 2015/5/26.
 */

var http = require('http');
var BufferHelper = require('bufferhelper');
var httpProxy = require('http-proxy');
var URL = require('url');
var replaceHtml = require('./replaceHtml');

function clearProxyUrl(proxyUrlParts) {
    var query = JSON.parse(JSON.stringify(proxyUrlParts.query));
    delete query['src'];
    delete query['target'];
    return URL.format({
            protocol: proxyUrlParts.protocol,
            hostname: proxyUrlParts.hostname,
            port: proxyUrlParts.port,
            pathname: proxyUrlParts.pathname,
            query: query
    });
}

var proxy = (function () {
    var proxy = {
        http: function (proxyUrlParts, req, res, next) {
            var bufferHelper = new BufferHelper();
            http.get(clearProxyUrl(proxyUrlParts), function (proxyRes) {
                proxyRes.on('data', function (chunk) {
                    bufferHelper.concat(chunk);
                });
                proxyRes.on('error',function(e){
                    console.log("Got error: " + e.message);
                });
                proxyRes.on('end',function(e){
                    var html = bufferHelper.toBuffer().toString();
                    res.render('proxy', { html: replaceHtml(html, proxyUrlParts)});
                });
            });
        },
        https: function (proxyUrlParts, req, res, next) {

        }
    };
    return proxy;
})();

function parseProxyURL (url) {
    return URL.parse(url, true);
}
function getProxyProtocol (pathName) {
    var httpReg = /^http/,
        httpsReg = /^https/,
        action = '';
    if (httpsReg.test(pathName)) {
        action = 'https';
    } else if (httpReg.test(pathName)) {
        action = 'http';
    }
    return action;
}
var Proxy = function (req, res, next) {
    var pathName = req.url.substring(1),
        proxyUrlParts = parseProxyURL(pathName, true),
        action = getProxyProtocol(pathName);
    if (action) {
        proxy[action](proxyUrlParts, req, res, next);
    } else {
        res.end("请确认网址前缀为http或者https");
    }
};

module.exports = Proxy;