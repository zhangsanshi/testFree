/**
 * Created by zhanglei on 2015/5/24.
 */
$(function () {
    var srcUrl = $('#srcUrl');
    var ruleSrc = $('#ruleSrc');
    var ruleTarget = $('#ruleTarget');
    var targetUrl = $('#targetUrl');
    var targetUrlA = $('#targetUrlA');

    function validSrcUrl (url) {
        return !!$.trim(url);
    }
    function getRule (src, target) {
        return $.param({
            src: src.split('\n'),
            target: target.split('\n')
        });
    }
    $('#getTargetUrl').on('click', function () {
        var src = srcUrl.val();
        if (!validSrcUrl(src)) {
            return alert("请输入访问链接");
        } else {
            //拼接url,get请求，用于传播
            var target = window.location.href + src + '?' + getRule(ruleSrc.val(), ruleTarget.val());
            targetUrl.val(decodeURI(target));
            targetUrlA.attr('href', target);
        }
    });
});