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
        for (var i = 0, len = srcs.length; i < len; i++) {
            var target = targets[i] || '',
                src = srcs[i];
            if (!src) {
                continue;
            }
            html = html.replace(new RegExp(src + '\?.*?(?=")', 'g'), function (value) {
                var t = new Date().getTime(),
                    replace = value.replace(src, target);
                if (replace.indexOf('?') != -1) {
                    replace = replace + '&t=' + t;
                } else {
                    replace = replace + '?t=' + t;
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