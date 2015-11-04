/**
 * Created by zhanglei on 2015/5/24.
 */
$(function () {
    var srcUrl = $('#srcUrl'),
        ruleSrc = $('#ruleSrc'),
        ruleTarget = $('#ruleTarget'),
        targetUrl = $('#targetUrl'),
        targetUrlA = $('#targetUrlA');

    function validSrcUrl (url) {
        return !!$.trim(url);
    }
    function getRule (src, target) {
        return $.param({
            src: src.split('\n'),
            target: target.split('\n')
        }, true);
    }
    function parseUrl (url) {
        return $('<a></a>').attr('href', url)[0];
    }
    $('#getTargetUrl').on('click', function () {
        var src = srcUrl.val(),
            srcParts = parseUrl(src);
        if (!/^http/.test(src)) {
            return alert("请输入正确的访问链接以http或者https开头");
        } else {
            //拼接url,get请求，用于传播
            if (srcParts.search) {
                srcParts.search = srcParts.search + '&' + getRule(ruleSrc.val(), ruleTarget.val());
            } else {
                srcParts.search = srcParts.search + '?' + getRule(ruleSrc.val(), ruleTarget.val());
            }
            var target = window.location.origin + '/' + srcParts.href;
            targetUrl.val(decodeURI(target));
            targetUrlA.attr('href', target);
        }
    });
});