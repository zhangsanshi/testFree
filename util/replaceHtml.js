/**
 * Created by sanshi on 2015/5/26.
 */

//TODO 需要做二次处理
function replaceHtml(html, proxyUrlParts) {
    var resourceUrl = proxyUrlParts.protocol + proxyUrlParts.hostname;
    (function (query) {
        var srcs = query["src"] || [],
            targets = query["target"] || [];
        if (typeof  srcs === 'string') {
            srcs = [srcs];
        }
        if (typeof  targets === 'string') {
            targets = [targets];
        }
        console.log(targets, srcs);
        for (var i = 0, len = srcs.length; i < len; i++) {
            var target = targets[i] || '';
            var src = srcs[i] || '';
            html = html.replace(new RegExp(src + '\?.*?(?=")', 'g'), function (value) {
                var t = 't=' + new Date().getTime();
                var replace = value.replace(src, target);
                if (replace.indexOf('?') != -1) {
                    replace = replace + '&' + t;
                } else {
                    replace = replace + '?' + t;
                }
                return  replace;
            });
        }

    })(proxyUrlParts.query);

    (function () {

    })();

    return html;
}

module.exports = replaceHtml;