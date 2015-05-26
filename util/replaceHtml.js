/**
 * Created by sanshi on 2015/5/26.
 */


function replaceHtml(html, urlObj) {
    var resourceUrl = urlObj.protocol + urlObj.hostname;
    (function (query) {
        var srcArr = query["src[]"],
            targetArr = query["target[]"];
        if (typeof  srcArr === 'string') {
            srcArr = [srcArr];
        }
        if (typeof  targetArr === 'string') {
            targetArr = [targetArr];
        }
        console.log(targetArr, srcArr);
        for (var i = 0, len = srcArr.length; i < len; i++) {
            if (targetArr[i]) {
                var target = targetArr[i];
                var src = srcArr[i];
                html = html.replace(new RegExp(src + '\?.*?"', 'g'), function (value) {
                    var t = 't=' + new Date().getTime();
                    var replace = value.replace(src, target);
                    if (replace.indexOf('?') != -1) {
                        replace = replace.replace('"', '&' + t + '"');
                    } else {
                        replace = replace.replace('"', '?' + t + '"');
                    }
                    return  replace;
                });
            }
        }

    })(urlObj.query);

    (function () {

    })();

    return html;
}

module.exports = replaceHtml;