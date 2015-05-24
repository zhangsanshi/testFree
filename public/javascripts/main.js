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
            return alert("�������������");
        } else {
            //ƴ��url,get�������ڴ���
            var target = src + '?' + getRule(ruleSrc.val(), ruleTarget.val());
            targetUrl.val(decodeURI(target));
            targetUrlA.attr('href', target);
        }
    });
});