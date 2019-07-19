var url = new objURL();
url.hello();
//Nprogress 处理
NProgress.configure({
    minimum: 0.15,
    speed: 100,
    trickleSpeed: 100
});

$(document).ready(function () {
    NProgress.start();
    resizeMask();
    $(".mask").show();
    $.ajax({
        async: true,
        cache: false,
        type: "GET",
        dataType: "json",
        url: "./ajax/enroll.php?mode=getInfo",

        success: function (data) {
            if (data.code !== 200) return;
            // data.open
            if (data.open) $(".mask").hide();
            else $(".mask").show();
            // data.msg
            $("#enroll-info").html("<h2>查询说明</h2><p>" + data.msg + "</p>");
            resizeMask();
            NProgress.done();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 状态码
            console.log("status:" + XMLHttpRequest.status + "\n");
            // 状态
            console.log("readyState:" + XMLHttpRequest.readyState + "\n");
            // 错误信息   
            console.log("textStatus:" + textStatus + "\n");
            console.log("errorInfo:" + errorThrown + "\n");
            if (XMLHttpRequest.status === 200) {
                $("#enroll-info").html("<h2>查询说明</h2><p>未获取到信息</p>");
            } else {
                $("#enroll-info").html("<h2>查询说明</h2><p>出错请重试</p>");
            }
            resizeMask();
            NProgress.done();
        }
    });
});

$("#submit").click(function () {
    var pid = $("#perId").val();
    var examId = $("#examId").val();
    if (pid.length == 0 || examId.length == 0) {
        swal.fire("身份证号和准考证号必须都输入", "", "warning");
        return false;
    }
    url.set("mode", "getEnrollInfo");
    url.set("id", examId);
    url.set("pid", pid);
    NProgress.start();
    doAjax(url);
});

function doAjax(urlObj) {
    var url = urlObj;
    $.ajax({
        async: true,
        cache: false,
        type: "GET",
        dataType: "json",
        url: url.url("./ajax/enroll.php"),

        success: function (data) {
            var jsonobj = data;
            var str = "";
            if (jsonobj.length != 0) {
                //获取到数据
                NProgress.set(0.9);
                var stu_name = $.trim(jsonobj[0].stu_name);
                var stu_examId = Number(jsonobj[0].examId);
                var enroll = $.trim(jsonobj[0].proName);
                var score = Number(jsonobj[0].score);
                var trackingNumber = Number(jsonobj[0].trackingNumber);
                if (score == 0) score = "暂无";
                if (trackingNumber == 0) {
                    trackingNumber = "暂无";
                    ableCheck(false);                   // 不允许查询
                } else {
                    ableCheck(true, trackingNumber);     // 允许进行查询并写入通知书运单号
                }
                //显示界面
                $(".enroll_stuName").html(stu_name + "同学");
                $(".enroll_info").html("你已经被" + enroll + "专业录取");
                $("#stu_name").text(stu_name);
                $("#stu_examId").text(stu_examId);
                $("#enroll").text(enroll);
                $("#trackingNumber").text(trackingNumber);
                //隐藏查询，显示结果
                $("#enroll_input").toggle();
                $("#enroll_getShow").toggle();
                NProgress.done();
            } else {
                NProgress.done();
                swal.fire(
                    '未获取到录取信息',
                    '数据库中没有有关记录，请检查证件号码是否正确',
                    'info'
                );
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 状态码
            console.log("status:" + XMLHttpRequest.status + "\n");
            // 状态
            console.log("readyState:" + XMLHttpRequest.readyState + "\n");
            // 错误信息   
            console.log("textStatus:" + textStatus + "\n");
            console.log("errorInfo:" + errorThrown + "\n");
            NProgress.done();
            if (XMLHttpRequest.status == 200) {
                swal.fire(
                    '未获取到录取信息',
                    '数据库中没有有关记录，请检查证件号码是否正确',
                    'info'
                );
            } else {
                swal.fire(
                    '数据出错',
                    '数据出错，请重试',
                    'warning'
                );
            }

        }
    });
}

function resizeMask() {
    let h = $("#enroll_input").outerHeight();
    let w = $("#enroll_input").outerWidth();
    $(".mask").height(h);
    $(".mask").width(w);
}
$(window).resize(resizeMask);
