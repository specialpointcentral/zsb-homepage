$(function () {
    var url = new objURL();
    //Nprogress 处理
    NProgress.configure({ 
        minimum: 0.15,
        speed: 100,
        trickleSpeed: 100
    });

    //网页预处理
    $(document).ready(function () {
        url.set("province", "山东");
        url.set("year", "2018");
        $(".province-select").each(function () {
            $(this).removeClass("active");
        });
        $(".province-select[data-province=" + url.get("province") + "]").addClass("active");
        $(".year-select").each(function () {
            $(this).removeClass("active");
        });
        $(".year-select[data-year=" + url.get("year") + "]").addClass("active");
        $("#form-title").text("正在获取...");
        $("#score-form tbody").html("");
        doAjax(url);
    });

    $(".province-select").click(function () {
        var province = $(this).data('province');
        url.set("province", province);
        $("#form-title").text("正在获取...");
        $("#score-form tbody").html("");
        doAjax(url);
        $(".province-select").each(function () {
            $(this).removeClass("active");
        });
        $(".province-select[data-province=" + province + "]").addClass("active");
    });

    $(".year-select").click(function () {
        var year = $(this).data('year');
        url.set("year", year);
        $("#form-title").text("正在获取...");
        $("#score-form tbody").html("");
        doAjax(url);
        $(".year-select").each(function () {
            $(this).removeClass("active");
        });
        $(".year-select[data-year=" + year + "]").addClass("active");
    });
});

function doAjax(urlObj) {
    var url = urlObj;
    NProgress.start();
    $.ajax({
        async: true,   //是否为异步请求
        cache: false,  //是否缓存结果
        type: "GET", //请求方式
        dataType: "json",   //服务器返回的数据是什么类型
        url: url.url("/planAjax.php"),

        success: function (data) {
            NProgress.set(0.9);
            var jsonobj = data;
            var str = "";
            for (var i = 0; i < jsonobj.length; i++) {
                str += "<tr><td>" + jsonobj[i]._year + "</td>";
                str += "<td>" + jsonobj[i]._provincename + "</td>";
                str += "<td>" + jsonobj[i]._proname + "</td>";
                str += "<td>" + jsonobj[i]._pernum + "</td>";
                if(jsonobj[i]._tuition==""&&jsonobj[i]._remarks==""){
                    str += "<td> / </td></tr>";
                }else{
                    str += "<td>" +jsonobj[i]._tuition+" / " + jsonobj[i]._remarks + "</td></tr>";
                }
                
            }
            $("#score-form tbody").html(str);

            //更改标题
            var title = "";
            title = url.get("year") + "年 " + url.get("province");
            $("#form-title").text(title);
            NProgress.done();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            // 状态码
            console.log("status:"+XMLHttpRequest.status+"\n");
            // 状态
            console.log("readyState:"+XMLHttpRequest.readyState+"\n");
            // 错误信息   
            console.log("textStatus:"+textStatus+"\n");
            //更改标题
            var title = url.get("year") + "年 " + url.get("province");
            NProgress.done();
            $("#form-title").text(title);
            if (XMLHttpRequest.status == 200) {
                $("#score-form tbody").html("<tr><td colspan=\"5\">未获取到信息</td></tr>");
            } else {
                $("#score-form tbody").html("<tr><td colspan=\"5\">出错请重试</td></tr>");
            }
        }
    });
}
