$(function () {
    var url = new objURL();
    //Nprogress 处理
    NProgress.configure({
        minimum: 0.15,
        speed: 100,
        trickleSpeed: 100
    });

    $(document).ready(function () {
        NProgress.start();
        $.ajax({
            async: true,   //是否为异步请求
            cache: false,  //是否缓存结果
            type: "GET", //请求方式
            dataType: "text",   //服务器返回的数据是什么类型
            url: "./ajax/enroll.php?mode=getInfo",

            success: function (data) {
                $("#enroll-info").html("<h2>查询说明</h2><p>" + data + "</p>");
                NProgress.done();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // 状态码
                console.log("status:" + XMLHttpRequest.status + "\n");
                // 状态
                console.log("readyState:" + XMLHttpRequest.readyState + "\n");
                // 错误信息   
                console.log("textStatus:" + textStatus + "\n");
                NProgress.done();
                if (XMLHttpRequest.status == 200) {
                    $("#enroll-info").html("<h2>查询说明</h2><p>未获取到信息</p>");
                } else {
                    $("#enroll-info").html("<h2>查询说明</h2><p>出错请重试</p>");
                }
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
});

function doAjax(urlObj) {
    var url = urlObj;
    $.ajax({
        async: true,   //是否为异步请求
        cache: false,  //是否缓存结果
        type: "GET", //请求方式
        dataType: "json",   //服务器返回的数据是什么类型
        url: url.url("./ajax/enroll.php"),

        success: function (data) {
            var jsonobj = data;
            var str = "";
            console.log(jsonobj.length);
            if (jsonobj.length != 0) {
                //获取到数据
                NProgress.set(0.9);
                var stu_name = jsonobj[0].stu_name;
                var stu_examId = jsonobj[0].examId;
                var enroll = jsonobj[0].proName;
                var score = jsonobj[0].score;
                var trackingNumber = jsonobj[0].trackingNumber;
                if (score == "") score = "暂无";
                if (trackingNumber == "") {
                    trackingNumber = "暂无";
                    ableCheck(false);                   // 不允许查询
                }else {
                    ableCheck(true,trackingNumber);     // 允许进行查询并写入通知书运单号
                }
                //显示界面
                $(".enroll_stuName").html(stu_name + " 同学：");
                $(".enroll_school").html(enroll + " 专业录取");
                var str = "";
                str += "<tr><td>" + stu_name + "</td>";
                str += "<td>" + stu_examId + "</td>";
                str += "<td>" + enroll + "</td>";
                str += "<td>" + trackingNumber + "</td></tr>";
                $("#enroll_form tbody").html(str);
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
