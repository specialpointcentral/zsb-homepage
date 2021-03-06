function objURL(url) {
    var params = new Array();
    this.set = function (key, val) {
        params[key] = encodeURIComponent(val);
    };
    this.remove = function (key) {
        if (key in params) params[key] = undefined;
    };
    this.get = function (key) {
        return decodeURIComponent(params[key]);
    };
    this.url = function (baseurl) {
        var strurl = baseurl;
        var objps = [];
        for (var k in params) {
            if (params[k]) {
                objps.push(k + "=" + params[k]);
            }
        }
        if (objps.length > 0) {
            strurl += "?" + objps.join("&");
        }
        return strurl;
    };
    this.debug = function () {
        // 以下调试代码自由设置
        var objps = [];
        for (var k in params) {
            objps.push(k + "=" + params[k]);
        }
        alert(objps);//输出params的所有值
    };
    this.hello = function () {
        var table = {
            url_js: {
                author: 'HITzsb',
                tip: 'Use HITzsb\'s module'
            },
            nprogress_js: {
                author: 'rstacruz',
                tip: 'Opensourse lib'
            },
            enroll_js: {
                author: 'SPC',
                tip: 'For enroll web'
            },
            postInfo_js:{
                author: 'SPC',
                tip: 'For enroll info part'
            },
            select_plan_js:{
                author: 'SPC',
                tip: 'For plan info web'
            },
            select_score_js:{
                author: 'SPC',
                tip: 'For score info web'
            },
        };
        console.log("js infomation table:");
        console.table(table);
        console.info("%c\
        Hi，你好\n \
        恭喜你发现了一个彩蛋哦~\n \
        如果你是一个HITers，联系我吧，交个朋友可好？\n \
        如果你不是HITers，没关系，也联系我吧，也交个朋友，嘻嘻。\n \
        你可以通过这个联系我哦：spcreply#126.com (change # to @)\n \
        最后，还是那一句话：\n \
        哈工大见！\n\n \
        选择哈工大，不负好年华。","color:blue");
    }
}
